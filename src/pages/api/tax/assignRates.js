import prisma from '../../../lib/prisma';
import withSession from '../../../lib/session';

async function handleTax(req, res) {
  const user = req.session.get('user');

  if (!user || user.role !== 'ADMIN') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    const { productTypeId, subProductTypeId, type, maxRate, minRate, Exempt } = req.body;

    try {
      // Get the productType and its subProductTypes
      const productType = await prisma.productType.findUnique({
        where: { id: productTypeId },
        include: { subTypes: true },
      });

      if (!productType) {
        return res.status(404).json({ error: 'ProductType not found' });
      }

      // Find the specific subProductType
      const subProductType = productType.subTypes.find(subType => subType.id === subProductTypeId);

      if (!subProductType) {
        return res.status(404).json({ error: 'SubProductType not found' });
      }

      //Todo: If there exists a taxRate on the subType, update that tax rate
      
      await prisma.taxRate.create({
        data: {
          type,
          maxRate,
          minRate,
          Exempt,
          subType: { connect: { id: subProductType.id } },
        },
      });

      // Fetch the SubType with all its TaxRates
      const subTypeWithTaxRates = await prisma.subType.findUnique({
        where: { id: subProductTypeId },
        include: { taxRates: true },
      });

      //response will be subType with rates

      res.status(201).json(subTypeWithTaxRates);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to assign tax rate' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end();
  }
}

export default withSession(handleTax);