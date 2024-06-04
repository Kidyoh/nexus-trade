import prisma from '../../../lib/prisma';
import withSession from '../../../lib/session';

async function confirmPayment(req, res) {
      const user = req.session.get('user');

      if (!user || user.role !== 'BUYER') {
            return res.status(401).send('Unauthorized');
      }

      const { paymentNumber } = req.body;

      try {
            // Find the transaction with the provided transaction number
            const transaction = await prisma.transaction.findFirst({
                  where: {
                        paymentNumber,
                        buyerId: user.id,
                        paymentStatus: 'PENDING', // Ensure the transaction is still pending
                        paymentExpires: {
                              gte: new Date(), // Ensure the transaction hasn't expired
                        },
                  },
                  include: {
                        product: true,
                  },
            });

            if (!transaction) {
                  return res.status(404).json({ error: 'Transaction not found or expired' });
            }

            // Update the transaction status to 'COMPLETED'
            await prisma.transaction.update({
                  where: { id: transaction.id },
                  data: {
                        paymentStatus: 'COMPLETED',
                  },
            });

            // Create an invoice for the transaction
            const invoice = await prisma.invoice.create({
                  data: {
                        transactionNumber: transaction.paymentNumber,
                        amountPaid: transaction.totalPrice,
                        productName: transaction.product.name,
                        transaction: {
                              connect: { id: transaction.id } // Link the invoice to the transaction
                        }
                  },
            });

            res.json({ invoice });
      } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to confirm payment and generate invoice' });
      }
}

export default withSession(confirmPayment);
