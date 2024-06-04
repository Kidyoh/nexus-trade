import withSession from "../../../lib/session";
import prisma from "../../../lib/prisma";

async function handleDeleteSellerProfile(req, res) {
      const user = req.session.get('user');

      // Checks if the user is Seller, can't delete a profile unless the user is a seller
      if (!user || user.role !== 'SELLER' && user.role !== "ADMIN") {
            return res.status(401).send('Unauthorized');
      }

      // Deletes company profile, which is connected with user profile
      const sellerProfile = await prisma.sellerProfile.delete({
            where: {
                  userId: user.id,
            },
      });

      res.json({ message: 'Seller profile deleted successfully' });
}

export default withSession(handleDeleteSellerProfile);