import prisma from '../../../lib/prisma';
import withSession from '../../../lib/session';

async function handleSeller(req, res) {
      const user = req.session.get('user');

      if (!user || user.role !== 'SELLER') {
            return res.status(401).send('Unauthorized');
      }

      const { name, description, price, quantity, typeId, subProductTypeId } = req.body;

      const product = await prisma.product.create({
            data: {
                  name,
                  description,
                  price,
                  quantity,
                  typeId,
                  subProductTypeId,
                  sellerId: user.id,
            },
      });

      res.json(product);
}

export default withSession(handleSeller);