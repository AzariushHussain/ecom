import React, { useState } from 'react';
import { ShoppingCart, Star, Truck, ArrowLeft } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import { createUpdateCart } from '../api/cart';
import { useUser } from '../context/UserContext';

const ProductDetail = () => {
    const location = useLocation();
    const navigate = useNavigate(); // Initialize useNavigate
    const { product } = location.state || {}; // Access the passed product data
    console.log("product: ", product);
    const  { token, user } = useUser();
    console.log("token: ", token);
    const [quantity, setQuantity] = useState(1);    // Check if product exists
    if (!product) {
        return <div>Product not found!</div>; // Handle case when product data is not available
    }  

    const handleQuantityChange = (e) => {
        setQuantity(Math.max(1, parseInt(e.target.value) || 1));
    };

    const handleAddToCart = async() => {
        console.log(`Added ${quantity} ${product.name}(s) to cart`);
        let resp;
        if (product._id === undefined) {
            resp = await createUpdateCart(token, [{productId: product.productId, quantity}]);
        }
        else{

            resp = await createUpdateCart(token, [{productId: product._id, quantity}]);
        }
        console.log("resp: ", resp);
        // Here you would typically handle the add to cart logic
    };

    // Navigate back to the previous page
    const handleBackClick = () => {
        navigate(-1); // Go back to the previous page
    };

    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <button onClick={handleBackClick} className="flex items-center text-blue-600 hover:text-blue-800 mb-4">
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    Back to products
                </button>
                <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
                    {/* Image gallery */}
                    <div className="flex flex-col-reverse">
                        <div className="w-full aspect-w-1 aspect-h-1">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-center object-cover sm:rounded-lg"
                            />
                        </div>
                    </div>

                    {/* Product info */}
                    <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.name}</h1>
                        <div className="mt-3">
                            <h2 className="sr-only">Product information</h2>
                            <p className="text-3xl text-gray-900">${product.price}</p>
                        </div>

                        {/* Reviews */}
                        <div className="mt-3">
                            <h3 className="sr-only">Reviews</h3>
                            <div className="flex items-center">
                                <div className="flex items-center">
                                    {[1, 2, 3, 4, 5].map((rating) => (
                                        <Star
                                            key={rating}
                                            className={`${
                                                product.overallrating >= rating ? 'text-yellow-400' : 'text-gray-300'
                                            } h-5 w-5 flex-shrink-0`}
                                            aria-hidden="true"
                                        />
                                    ))}
                                </div>
                                <p className="sr-only">{product.overallrating} out of 5 stars</p>
                                <a className="ml-3 text-sm font-medium text-blue-600 hover:text-blue-500">
                                    {product.qtysold} reviews
                                </a>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h3 className="sr-only">Description</h3>
                            <p className="text-base text-gray-900">{product.description}</p>
                        </div>

                        <div className="mt-10 flex sm:flex-col1">
                        <div className="flex items-center max-w-xs">
                            <label htmlFor="quantity" className="sr-only">
                                Quantity
                            </label>
                            <button
                                type="button"
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-l-md hover:bg-gray-300 focus:outline-none"
                            >
                                -
                            </button>
                            <span className="px-4 text-lg">{quantity}</span>
                            <button
                                type="button"
                                onClick={() => setQuantity(Math.min(product.stock, quantity + 1, 80))}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-r-md hover:bg-gray-300 focus:outline-none"
                            >
                                +
                            </button>
                        </div>

                            <button
                                type="button"
                                onClick={handleAddToCart}
                                className="ml-4 flex-1 bg-blue-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <ShoppingCart className="h-5 w-5 mr-2" />
                                Add to cart
                            </button>
                        </div>

                        {product.stock ? (
                            <p className="mt-4 text-sm text-green-600 flex items-center">
                                <Truck className="h-5 w-5 mr-2" />
                                {`${product.stock } in stock and ready to ship`}
                            </p>
                        ) : (
                            <p className="mt-4 text-sm text-red-600">Out of stock</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
