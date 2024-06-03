import prisma from '../../../lib/prisma';

async function handle(req, res) {
  const { productTypeName } = req.query;
  const productType = await prisma.productType.findFirst({
    where: {
      name: productTypeName,
    },
    include: {
      subProduct: true,
    },
  });

  if (!productType) {
    res.status(404).json({ error: 'Product type not found' });
    return;
  }

  res.json(productType.subProduct);
}

export default handle;