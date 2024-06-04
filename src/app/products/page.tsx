import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SellerTable from "@/components/SellerProducts/sellerTable";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

export const metadata: Metadata = {
      title: "Seller Table, here we show your products",
      description:
            "This is where you can find all of your posted products",
};

const ProductAddPage = () => {
      return (
            <DefaultLayout>
                  <Breadcrumb pageName="Your Products" />
                  <SellerTable />
            </DefaultLayout>
      );
};

export default ProductAddPage;
