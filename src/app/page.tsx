import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SignIn from "./auth/signin/page";

export const metadata: Metadata = {
  title:
    "Nexus Trade ",
  description: "This is default main page for Nexus Trade",
};

export default function Home() {
  return (
    <>
      <SignIn />
    </>
  );
}
