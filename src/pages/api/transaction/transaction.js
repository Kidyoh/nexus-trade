import prisma from '../../../lib/prisma';
import withSession from '../../../lib/session';

async function handle(req, res) {
      const user = req.session.get('user');

      if (!user || user.role !== 'BUYER') {
            return res.status(401).send('Unauthorized');
      }

      const { productId, subTypeId, quantity, totalPrice, paymentNumber, paymentExpires, paymentStatus } = req.body;

      try {
            // Fetch the Product and the specified SubType and its TaxRates
            const product = await prisma.product.findUnique({ where: { id: productId } });
            const subType = await prisma.subType.findUnique({
                  where: { id: subTypeId },
                  include: { taxRates: true },
            });

            if (!product) {
                  return res.status(404).json({ error: 'Product not found' });
            }
            // Check if there is an existing subType for that product.
            if (!subType) {
                  return res.status(400).json({ error: 'SubType not found' });
            }

            // Calculate the tax based on the TaxRates of the SubType
            let tax = 0;
            for (const taxRate of subType.taxRates) {
                  tax += (taxRate.minRate + taxRate.maxRate) / 2;
            }
            tax /= subType.taxRates.length;

            // Calculate the total price including tax
            const totalPriceWithTax = totalPrice + (totalPrice * tax / 100);

            // Create the transaction
            const result = await prisma.transaction.create({
                  data: {
                        buyerId: user.id,
                        productId,
                        subTypeId,
                        quantity,
                        totalPrice: totalPriceWithTax,
                        paymentNumber,
                        paymentExpires,
                        paymentStatus,
                        userId: user.id,
                  },
            });

            res.json(result);
      } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to create transaction' });
      }
}

export default withSession(handle);