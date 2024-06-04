import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Products from "@/components/Products/product_create";
import CreateSellerProfile from "@/components/SellerProducts/sellerProfile";

export const metadata: Metadata = {
      title: "This is a seller profile creation page",
      description:
            "In this page you create your company profile.",
};

const ProductAddPage = () => {
      return (
            <DefaultLayout>
                  <CreateSellerProfile />
            </DefaultLayout>
      );
};

export default ProductAddPage;
