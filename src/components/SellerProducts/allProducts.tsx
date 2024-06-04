import React, { useState, useEffect } from 'react';

interface Product {
      id: number;
      name: string;
      description: string;
      price: number;
}

interface ProductsListProps {
      sellerId: number;
}

const ProductsList: React.FC<ProductsListProps> = ({ sellerId }) => {
      const [products, setProducts] = useState<Product[]>([]);

      useEffect(() => {
            // Fetch products data when the component mounts
            fetch('/api/product/getProducts', {
                  method: 'POST',
                  headers: {
                        'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                        sellerId,
                  }),
            })
                  .then(response => response.json())
                  .then(data => setProducts(data))
                  .catch(error => console.error(error));
      }, [sellerId]);

      if (!products.length) {
            return <div>No products found</div>;
      }

      return (
            <div>
                  {products.map(product => (
                        <div key={product.id}>
                              <h2>{product.name}</h2>
                              <p>{product.description}</p>
                              <p>{product.price}</p>
                        </div>
                  ))}
            </div>
      );
}

export default ProductsList;