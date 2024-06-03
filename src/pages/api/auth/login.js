import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { withIronSession } from 'next-iron-session';
const prisma = new PrismaClient();

async function handler(req, res) {
      const { email, password, role } = req.body;
      // It finds the user with the specified unique email
      const user = await prisma.user.findUnique({ where: { email: email } });
      if (!user) {
            return res.status(400).json({ message: 'No such user found' });
      }
      //Checks if the password is correct
      const passwordValid = await bcrypt.compare(password, user.password);
      if (!passwordValid) {
            return res.status(400).json({ message: 'Invalid password' });
      }
      //Checks if the role is correct
      if (user.role !== role) {
            return res.status(403).json({ message: 'Access denied' });
      }
      req.session.set('user', { id: user.id, role: user.role });
      await req.session.save();
      res.json({ message: 'Logged in' });
      res.json(user.email)
}

//It will save the session as a cookie to implement a protected route
export default withIronSession(handler, {
      password: process.env.SECRET_COOKIE_PASSWORD,
      cookieName: 'next-iron-session/login',
      cookieOptions: {
            secure: process.env.NODE_ENV === 'production',
      },
});