import React, { useState } from 'react';
import { Plus, Minus, Trash2, ShoppingCart, CreditCard, Smartphone, Truck } from 'lucide-react';
import { createOrder } from '../api/order';
import { useUser } from '../context/UserContext';
import FloatingMessage from './Message';
import { useNavigate } from 'react-router-dom';

const CreateOrder = () => {
  const { token } = useUser();
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const [shippingDetails, setShippingDetails] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleCardDetailsChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleCloseMessage = () => {
    setMessage(null);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Here you would typically send the order data to your backend
    console.log('Order submitted:', { 
      shippingDetails, 
      paymentMethod, 
      paymentDetails: paymentMethod === 'card' ? cardDetails : 'COD',
    });
    const resp = await createOrder(token,{ 
      shippingDetails, 
      paymentMethod, 
      paymentDetails: paymentMethod === 'card' ? cardDetails : 'COD',
    });
    if (resp && resp.message){
    console.log('Order response:', resp);
    setMessage({ type: 'success', text: resp.message });
    setShippingDetails({ name: '', address: '', city: '', state: '', zipCode: '' });
    setCardDetails({ cardNumber: '', cardName: '', expiryDate: '', cvv: '' });
    setPaymentMethod('card');
    navigate('/');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Order</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      </div>
      <form onSubmit={handleSubmit} className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Shipping Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={shippingDetails.name}
              onChange={handleShippingChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={shippingDetails.address}
              onChange={handleShippingChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={shippingDetails.city}
              onChange={handleShippingChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
            <input
              type="text"
              id="state"
              name="state"
              value={shippingDetails.state}
              onChange={handleShippingChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">ZIP Code</label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={shippingDetails.zipCode}
              onChange={handleShippingChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <h2 className="text-2xl font-semibold mb-4 mt-8">Payment Method</h2>
        <div className="space-y-4">
          <div>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span className="ml-2">Credit/Debit Card</span>
            </label>
          </div>
          <div>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="paymentMethod"
                value="cod"
                checked={paymentMethod === 'cod'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span className="ml-2">Cash on Delivery</span>
            </label>
          </div>
        </div>

        {paymentMethod === 'card' && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={cardDetails.cardNumber}
                onChange={handleCardDetailsChange}
                required
                placeholder="1234 5678 9012 3456"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="cardName" className="block text-sm font-medium text-gray-700">Name on Card</label>
              <input
                type="text"
                id="cardName"
                name="cardName"
                value={cardDetails.cardName}
                onChange={handleCardDetailsChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Expiry Date</label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                value={cardDetails.expiryDate}
                onChange={handleCardDetailsChange}
                required
                placeholder="MM/YY"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={cardDetails.cvv}
                onChange={handleCardDetailsChange}
                required
                placeholder="123"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        )}

        {paymentMethod === 'cod' && (
          <div className="mt-4 p-4 bg-yellow-50 rounded-md">
            <p className="text-yellow-700">Cash on Delivery is available. You will pay when your order is delivered.</p>
          </div>
        )}

        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
        >
          {paymentMethod === 'card' && <CreditCard className="w-5 h-5 mr-2" />}
          {paymentMethod === 'cod' && <Truck className="w-5 h-5 mr-2" />}
          {paymentMethod === 'cod' ? 'Place Order (Pay on Delivery)' : 'Place Order and Pay'}
        </button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {message && console.log('message: ', message)}
        {message && <FloatingMessage message={message} type={message.type} onClose={handleCloseMessage} />}
      </div>
    </div>
  );
};

export default CreateOrder;