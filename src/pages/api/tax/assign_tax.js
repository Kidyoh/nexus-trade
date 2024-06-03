import { prisma } from '../../../lib/prisma';
import { withSession } from '../../../lib/session';

async function handleTax(req, res) {
      const user = req.session.get('user');

      if (!user || user.role !== 'ADMIN') {
            return res.status(401).json({ error: 'Unauthorized' });
      }

      if (req.method === 'POST') {
            const { subProductTypeId, type, maxRate, minRate, Exempt } = req.body;

            try {
                  const taxRate = await prisma.taxRate.create({
                        data: {
                              type,
                              maxRate,
                              minRate,
                              Exempt,
                              subType: { connect: { id: subProductTypeId } },
                        },
                  });
                  res.status(201).json(taxRate);
            } catch (error) {
                  res.status(500).json({ error: 'Failed to assign tax rate' });
            }
      } else {
            res.setHeader('Allow', ['POST']);
            res.status(405).end();
      }
}

export default withSession(handleTax);