import prisma from '../../../lib/prisma';

async function handle(req, res) {
      // On this we get products with their specific sub types.
      const productTypes = await prisma.productType.findMany({
            include: {
                  subTypes: true,
            },
      });
      res.json(productTypes);
}

export default handle;