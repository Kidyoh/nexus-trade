import prisma from '../../../lib/prisma';
import withSession from '../../../lib/session';

async function handle(req, res) {
      const user = req.session.get('user');

      //Finds products that are associated with the seller
      const products = await prisma.product.findMany({
            where: {
                  sellerId,
            },
      });

      res.json(products);
}

export default withSession(handle);