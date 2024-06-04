import withSession from "../../../lib/session";
import prisma from "../../../lib/prisma";

async function handleCreateSellerProfile(req, res) {
      const user = req.session.get('user');

      // Checks if the user is Seller, can't create a profile unless the user is a seller

      if (!user || user.role !== 'SELLER') {
            return res.status(401).send('Unauthorized');
      }

      const { companyName, taxpayerID, businessSector, registeredTax, capitalAmount } = req.body;

      // Creates company profile, which is connected with user profile
      const sellerProfile = await prisma.sellerProfile.create({
            data: {
                  companyName,
                  taxpayerID,
                  businessSector,
                  registeredTax,
                  capitalAmount,
                  userId: user.id,
            },
      });

      res.json(sellerProfile);
}

export default withSession(handleCreateSellerProfile);