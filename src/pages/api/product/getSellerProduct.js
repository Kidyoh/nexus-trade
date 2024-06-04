import withSession from "../../../lib/session";
import prisma from "../../../lib/prisma";

async function handleGetProducts(req, res) {
      const user = req.session.get('user');

      if (!user || user.role !== 'SELLER' && user.role !== 'ADMIN') {
            return res.status(401).send('Unauthorized');
      }
      // Here we find products based on the session User Id and display it.
      const products = await prisma.product.findMany({
            where: {
                  sellerId: user.id,
            },
      });

      res.json(products);
}

export default withSession(handleGetProducts);