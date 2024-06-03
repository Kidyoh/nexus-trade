import prisma from '../../../lib/prisma';
import withSession from '../../../lib/session';

async function handle(req, res) {
      const user = req.session.get('user');

      if (!user || user.role !== 'BUYER') {
            return res.status(401).send('Unauthorized');
      }

      const { productId, quantity, totalPrice, paymentNumber, paymentExpires, paymentStatus } = req.body;

      const result = await prisma.transaction.create({
            data: {
                  buyerId: user.id,
                  productId,
                  quantity,
                  totalPrice,
                  paymentNumber,
                  paymentExpires,
                  paymentStatus,
                  userId: user.id,
            },
      });

      res.json(result);
}

export default withSession(handle);