import withSession from "../../../lib/session";
import prisma from "../../../lib/prisma";

async function handleGetSellerProfile(req, res) {
      const user = req.session.get('user');

      // Checks if the user is Seller, can't get a profile unless the user is a seller
      if (!user || user.role !== 'SELLER') {
            return res.status(401).send('Unauthorized');
      }

      // Gets company profile, which is connected with user profile
      const sellerProfile = await prisma.sellerProfile.findUnique({
            where: {
                  userId: user.id,
            },
      });

      res.json(sellerProfile);
}

export default withSession(handleGetSellerProfile);