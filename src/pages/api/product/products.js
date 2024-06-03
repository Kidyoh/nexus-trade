import prisma from '../../lib/prisma';
import withSession from '../../lib/session';

async function handle(req, res) {
      const user = req.session.get('user');

      if (!user || user.role !== 'SELLER') {
            return res.status(401).send('Unauthorized');
      }

      const { name, description, type, subType, price, quantity } = req.body;

      const taxRate = await prisma.taxRate.findFirst({
            where: {
                  subProductType: subType,
            },
      });

      if (!taxRate) {
            return res.status(400).send('Tax rate not found');
      }

      const tax = price * taxRate.maxRate;

      const result = await prisma.product.create({
            data: {
                  name,
                  description,
                  type,
                  subType,
                  price,
                  taxRate: tax,
                  quantity,
                  sellerId: user.id,
            },
      });

      res.json(result);
}

export default withSession(handle);