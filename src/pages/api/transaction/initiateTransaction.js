import prisma from '../../../lib/prisma';
import withSession from '../../../lib/session';

async function initiateTransaction(req, res) {
    const user = req.session.get('user');

    if (!user || user.role !== 'BUYER') {
        return res.status(401).send('Unauthorized');
    }

    const { productId, subTypeId, quantity, totalPrice } = req.body;

    try {
        // Fetch product and subType details
        const product = await prisma.product.findUnique({ where: { id: productId } });
        const subType = await prisma.subType.findUnique({
            where: { id: subTypeId },
            include: { taxRates: true },
        });

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        if (!subType) {
            return res.status(400).json({ error: 'SubType not found' });
        }

        // Calculate the total tax amount
        let totalTaxAmount = 0;

        //Iterates into multiple tax types to calculate the total amount
        subType.taxRates.forEach(taxRate => {
            const taxAmount = totalPrice * taxRate.maxRate;
            totalTaxAmount += taxAmount;
        });

        const totalPriceWithTax = totalPrice + totalTaxAmount;

        // Create the transaction record
        const transaction = await prisma.transaction.create({
            data: {
                buyerId: user.id,
                productId: productId,
                subTypeId: subTypeId,
                quantity: quantity,
                totalPrice: totalPriceWithTax,
                paymentNumber: generateTransactionNumber(),
                paymentExpires: new Date(Date.now() + 3 * 60 * 60 * 1000), // 3 hours from now
                paymentStatus: 'PENDING',
                userId: user.id,
            },
        });

        // Decrement product quantity
        await prisma.product.update({
            where: { id: productId },
            data: {
                quantity: {
                    decrement: quantity,
                },
            },
        });

        res.json({ transaction });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to initiate transaction' });
    }
}

function generateTransactionNumber() {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
}

export default withSession(initiateTransaction);