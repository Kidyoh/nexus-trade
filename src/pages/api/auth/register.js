import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { fullName, username, email, password, phone, address, role } = req.body;

    //Checks if the user exists in the database since email should be unique
    const existingUserEmail = await prisma.user.findUnique({ where: { email: email } });
    if (existingUserEmail) {
      return res.status(400).json({ error: 'A user with this email exists' })
    }

    //checks if the user exists in the database using username as well, since it's a unique attribute
    const existingUserName = await prisma.user.findUnique({ where: { username: username } });
    if (existingUserName) {
      return res.status(400).json({ error: 'A user with this name exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        fullName,
        username,
        email,
        password: hashedPassword,
        address,
        phone,
        role
      },
    });
    res.status(201).json(user);

  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}