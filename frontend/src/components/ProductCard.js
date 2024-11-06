import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  function addToCart(productId) {
    // Implement your cart logic here
    console.log(`Added product with ID ${productId} to cart`);
  }

  return (
    <div className="flex items-center justify-center">
      <div key={product.id} className="bg-white rounded-lg w-72 mx-20 shadow-md overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <p className="text-gray-600 mt-2">${product.price}</p>
          {/* Link to the ProductDetail route and pass product ID */}
          <Link to={`/product/${product._id}`} state={{ product }}>
            <button 
              className="mt-4 w-full bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              View Product
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
