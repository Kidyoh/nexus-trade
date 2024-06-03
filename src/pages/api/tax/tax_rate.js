import prisma from '../../lib/prisma';
import withSession from '../../lib/session';

async function handle(req, res) {
      const user = req.session.get('user');

      if (!user || user.role !== 'ADMIN') {
            return res.status(401).send('Unauthorized');
      }

      const { type, maxRate, minRate, Exempt, subProductId } = req.body;

      const result = await prisma.taxRate.create({
            data: {
                  type,
                  maxRate,
                  minRate,
                  Exempt,
                  subProductId,
            },
      });

      res.json(result);
}

export default withSession(handle);