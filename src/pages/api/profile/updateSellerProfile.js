import withSession from "../../../lib/session";
import prisma from "../../../lib/prisma";

async function handleUpdateSellerProfile(req, res) {
  const user = req.session.get('user');

  // Checks if the user is Seller, can't update a profile unless the user is a seller
  if (!user || user.role !== 'SELLER') {
    return res.status(401).send('Unauthorized');
  }

  const { companyName, taxpayerID, businessSector, registeredTax, capitalAmount } = req.body;

  // Updates company profile, which is connected with user profile
  const sellerProfile = await prisma.sellerProfile.update({
    where: {
      userId: user.id,
    },
    data: {
      companyName,
      taxpayerID,
      businessSector,
      registeredTax,
      capitalAmount,
    },
  });

  res.json(sellerProfile);
}

export default withSession(handleUpdateSellerProfile);