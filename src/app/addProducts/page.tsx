import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Products from "@/components/Products/product_create";

export const metadata: Metadata = {
      title: "This is a product page",
      description:
            "This page shows every products",
};

const ProductAddPage = () => {
      return (
            <DefaultLayout>
                  <Products />
            </DefaultLayout>
      );
};

export default ProductAddPage;
