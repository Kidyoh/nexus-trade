import withSession from '../../../lib/session';
import prisma from '../../../lib/prisma';

async function handler(
      req,
      res
) {
      try {
            const products = await prisma.product.findMany();
            res.status(200).json(products);
      } catch (error) {
            res.status(500).json({ error: 'Unable to fetch products' });
      } finally {
            await prisma.$disconnect();
      }
}

export default withSession(handler);