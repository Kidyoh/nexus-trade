import withSession from "../../../lib/session";
import prisma from "../../../lib/prisma";

async function handleGetProducts(req, res) {
      const user = req.session.get('user');
      const { sellerId } = req.query;

      if (!sellerId) {
            console.log(res)
            return res.status(400).send('Seller ID is required');
      }

      const products = await prisma.product.findMany({
            where: {
                  sellerId: Number(sellerId),
            },
      });

      res.json(products);
}

export default withSession(handleGetProducts);