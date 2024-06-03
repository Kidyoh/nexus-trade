import prisma from '../../../lib/prisma';
import withSession from '../../../lib/session';

async function handleAdmin(req, res) {
      const user = req.session.get('user');

      if (!user || user.role !== 'ADMIN') {
            return res.status(401).send('Unauthorized');
      }
      const { type, subTypes } = req.body;
      const subTypesArray = Array.isArray(subTypes) ? subTypes : [subTypes];

      // Find the existing ProductType
      const existingProductType = await prisma.productType.findUnique({
            where: { type },
      });

      if (existingProductType) {
            // If the ProductType exists, connect the new SubTypes to it
            const updatedProductType = await prisma.productType.update({
                  where: { id: existingProductType.id },
                  data: {
                        subTypes: {
                              create: subTypesArray.map(subType => ({ name: subType })),
                        },
                  },
            });
            res.json(updatedProductType);
      } else {

            const newProductType = await prisma.productType.create({
                  data: {
                        type,
                        subTypes: {
                              create: subTypesArray.map(subType => ({ name: subType })),
                        },
                  },
            });
            res.json(newProductType);
      }
}

export default withSession(handleAdmin);