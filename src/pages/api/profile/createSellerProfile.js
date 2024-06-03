async function handleCreateSellerProfile(req, res) {
      const user = req.session.get('user');

      if (!user || user.role !== 'SELLER') {
            return res.status(401).send('Unauthorized');
      }

      const { companyName, taxpayerID, businessSector, registeredTax, capitalAmount } = req.body;

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