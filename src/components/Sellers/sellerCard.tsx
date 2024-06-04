import Link from 'next/link';

interface SellerCardProps {
      seller: {
            id: string;
            fullName: string;
            email: string;
            phone: string;
            address: string;
      };
}

const SellerCard: React.FC<SellerCardProps> = ({ seller }) => (
      <Link href={`/sellerproducts/${seller.id}`} passHref legacyBehavior>
            <a className="block p-6 m-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 ease-in ">
                  <div className="grid gap-4">
                        <h2 className="text-xl font-bold">{seller.fullName}</h2>
                        <p className="text-gray-600">Email: {seller.email}</p>
                        <p className="text-gray-600">Phone: {seller.phone}</p>
                        <p className="text-gray-600">Address: {seller.address}</p>
                  </div>
            </a>
      </Link>
);

export default SellerCard;