"use client";
import React from 'react';
import ProductCard from '../../components/SellerProducts/allProducts';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';

interface Product {
      id: string;
      name: string;
      description: string;
      typeId: number;
      subTypeId: number;
      price: number;
      quantity: number;
      sellerId: number;
}

const ProductsPage: React.FC = () => {
      const [products, setProducts] = React.useState<Product[]>([]);

      React.useEffect(() => {
            fetch('/api/product/getAllProducts')
                  .then((response) => response.json())
                  .then(setProducts);
      }, []);

      return (
            <DefaultLayout>
                  <Breadcrumb pageName='Shop' />
                  <div>
                        {products.map((product) => (
                              <ProductCard key={product.id} product={product} />
                        ))}
                  </div>
            </DefaultLayout>
      );
};

export default ProductsPage;