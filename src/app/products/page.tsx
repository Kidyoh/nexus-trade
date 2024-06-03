import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Products from "@/components/Products/product_create";

export const metadata: Metadata = {
      title: "Next.js Calender | TailAdmin - Next.js Dashboard Template",
      description:
            "This is Next.js Calender page for TailAdmin  Tailwind CSS Admin Dashboard Template",
};

const ProductAddPage = () => {
      return (
            <DefaultLayout>
                  <Products />
            </DefaultLayout>
      );
};

export default ProductAddPage;
