// components/ProductCard.tsx

import React from 'react';

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

interface ProductCardProps {
      product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => (
      <div className="block p-6 m-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 ease-in">
            <div className="grid gap-4">
                  <h2 className="text-xl font-bold">{product.name}</h2>
                  <p className="text-gray-600">{product.description}</p>
                  <p className="text-gray-600">Type ID: {product.typeId}</p>
                  <p className="text-gray-600">Sub Type ID: {product.subTypeId}</p>
                  <p className="text-gray-600">Price: {product.price}</p>
                  <p className="text-gray-600">Quantity: {product.quantity}</p>
                  <p className="text-gray-600">Seller ID: {product.sellerId}</p>
            </div>
      </div>
);

export default ProductCard;