import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { getCart } from '../api/cart';
import { useUser } from '../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';

const CartItem = ({ item, updateQuantity, removeItem }) => (
  <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
    <div className="flex w-2/5">
      <Link to={`/product/${item.product.productId}`} state={{ product: item.product }} className="flex">
        <div className="w-20">
          <img className="h-24" src={item.product.image} alt={item.product.name} />
        </div>
        <div className="flex flex-col justify-between ml-4 flex-grow">
          <span className="font-bold text-sm">{item.product.name}</span>
          <span className="text-red-500 text-xs">{item.product.category}</span>
        </div>
      </Link>
      <button 
        className="font-semibold hover:text-red-500 text-gray-500 text-xs flex items-center ml-4"
        onClick={() => removeItem(item.productId)}
      >
        <Trash2 className="w-4 h-4 mr-1" />
        Remove
      </button>
    </div>
    <div className="flex justify-center w-1/5">
      <button onClick={() => updateQuantity(item.productId, item.quantity - 1)}>
        <Minus className="fill-current text-gray-600 w-3" />
      </button>
      <input 
        className="mx-2 border text-center w-8" 
        type="text" 
        value={item.quantity}
        readOnly
      />
      <button onClick={() => updateQuantity(item.productId, item.quantity + 1)}>
        <Plus className="fill-current text-gray-600 w-3" />
      </button>
    </div>
    <span className="text-center w-1/5 font-semibold text-sm">${item.product.price}</span>
    <span className="text-center w-1/5 font-semibold text-sm">${(item.total)}</span>
  </div>
);

const CartComponent = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token, user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await getCart(token);
        console.log("Cart data:", response.data);
        setCartItems(response.data);
      } catch (error) {
        console.error("Failed to fetch cart data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [token]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => 
      item.productId === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.productId !== id));
  };

  const handleCheckout = () => {
    navigate('/create-order');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto mt-10">
      <div className="flex shadow-md my-10">
        <div className="w-3/4 bg-white px-10 py-10">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
            <h2 className="font-semibold text-2xl">{cartItems.length} Items</h2>
          </div>
          <div className="flex mt-10 mb-5">
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Quantity</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Price</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Total</h3>
          </div>
          {cartItems.map(item => (
            <CartItem 
              key={item.productId} 
              item={item} 
              updateQuantity={updateQuantity} 
              removeItem={removeItem} 
            />
          ))}
          <button className="flex font-semibold text-blue-600 text-sm mt-10">
            <ArrowLeft className="fill-current mr-2 text-blue-600 w-4" />
            Continue Shopping
          </button>
        </div>

        <div id="summary" className="w-1/4 px-8 py-10 bg-gray-50">
          <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">Items {cartItems.length}</span>
            <span className="font-semibold text-sm">${cartItems.reduce((accumulator, item) => accumulator + (item.total || 0), 0)}</span>
          </div>
          <div>
            <label className="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
            <select className="block p-2 text-gray-600 w-full text-sm">
              <option>Standard shipping - $0.0</option>
            </select>
          </div>
          <div className="py-10">
            <label htmlFor="promo" className="font-semibold inline-block mb-3 text-sm uppercase">Promo Code</label>
            <input type="text" id="promo" placeholder="Enter your code" className="p-2 text-sm w-full" />
          </div>
          <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">Apply</button>
          <div className="border-t mt-8">
            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
              <span>Total cost</span>
              <span>${cartItems.reduce((accumulator, item) => accumulator + (item.total || 0), 0)}</span>
            </div>
            <button 
              className="bg-blue-500 font-semibold hover:bg-blue-600 py-3 text-sm text-white uppercase w-full flex items-center justify-center"
              onClick={handleCheckout}
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartComponent;
