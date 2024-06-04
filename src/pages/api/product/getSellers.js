import withSession from '../../../lib/session';
import prisma from '../../../lib/prisma';

async function handler(req, res) {
      const user = req.session.get('user');

      if (req.method === 'GET') {
            try {
                  const sellers = await prisma.user.findMany({
                        where: {
                              role: 'SELLER',
                        },
                  });
                  res.json(sellers);
            } catch (error) {
                  console.error(error);
                  res.status(500).send('Error retrieving sellers');
            }
      } else {
            res.status(405).send('Method not allowed');
      }
}

export default withSession(handler);