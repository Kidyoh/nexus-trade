import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import prisma from '@/lib/prisma';
import { useRouter } from 'next/router';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface Props {
  products: Product[];
}

interface Params extends ParsedUrlQuery {
  sellerId: string;
}

const SellerProductsPage: React.FC<Props> = ({ products }) => {
  const { query } = useRouter();
  const sellerId = query.sellerId as string | undefined;

  return (
    //Mapping products to theeir products id
    <DefaultLayout>
      <Breadcrumb pageName={`Products for Seller ${sellerId}`} />
      <div className="grid gap-4">
        {products.map((product) => (
          <div key={product.id} className="p-4 bg-white rounded shadow">
            <h2 className="text-lg font-bold">{product.name}</h2>
            <p className="text-gray-600">${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </DefaultLayout>
  );
};

export const getServerSideProps: GetServerSideProps<Props, Params> = async (context) => {
  const { sellerId } = context.params as Params;
//check for existing of seller
  if (!sellerId) {
    return {
      notFound: true,
    };
  }

  // get seller ifnformation based on sellerid is equal to SellerId from the products
  const products = await prisma.product.findMany({
    where: {
      sellerId: Number(sellerId),
    },
  });

  return {
    props: { products },
  };
};

export default SellerProductsPage;
