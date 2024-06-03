import { redirect } from "next/navigation";

export default async function logout(req) {
      if (req.method === 'POST') {
            const session = await getSession();
            session.destroy();
            redirect("/")
      }
}