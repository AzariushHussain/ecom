import React from 'react';
import { Check, Printer, ChevronRight } from 'lucide-react';

const OrderConfirmation = () => {
  // In a real application, you would fetch this data from your backend
  const orderDetails = {
    orderNumber: '1234567890',
    orderDate: 'June 15, 2023',
    items: [
      { id: 1, name: 'Ergonomic Chair', price: 199.99, quantity: 1 },
      { id: 2, name: 'Wireless Keyboard', price: 59.99, quantity: 2 },
      { id: 3, name: '4K Monitor', price: 299.99, quantity: 1 },
    ],
    subtotal: 619.96,
    shipping: 10.00,
    tax: 49.60,
    total: 679.56,
    shippingAddress: {
      name: 'John Doe',
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '12345',
      country: 'USA',
    },
    paymentMethod: 'Visa ending in 1234',
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h1 className="text-2xl leading-6 font-medium text-gray-900">Order Confirmation</h1>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Thank you for your purchase!</p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg leading-6 font-medium text-gray-900">Order #{orderDetails.orderNumber}</h2>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Placed on {orderDetails.orderDate}</p>
              </div>
              <div className="flex items-center">
                <Check className="text-green-500 mr-2" />
                <span className="text-green-500 font-semibold">Order Confirmed</span>
              </div>
            </div>
            <div className="mt-6 border-t border-gray-200 pt-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-4">
                {orderDetails.items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 border-t border-gray-200 pt-6">
                <div className="flex justify-between">
                  <p className="text-sm text-gray-500">Subtotal</p>
                  <p className="text-sm font-medium text-gray-900">${orderDetails.subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between mt-2">
                  <p className="text-sm text-gray-500">Shipping</p>
                  <p className="text-sm font-medium text-gray-900">${orderDetails.shipping.toFixed(2)}</p>
                </div>
                <div className="flex justify-between mt-2">
                  <p className="text-sm text-gray-500">Tax</p>
                  <p className="text-sm font-medium text-gray-900">${orderDetails.tax.toFixed(2)}</p>
                </div>
                <div className="flex justify-between mt-4 pt-4 border-t border-gray-200">
                  <p className="text-base font-medium text-gray-900">Total</p>
                  <p className="text-base font-medium text-gray-900">${orderDetails.total.toFixed(2)}</p>
                </div>
              </div>
            </div>
            <div className="mt-8 border-t border-gray-200 pt-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Shipping Information</h3>
              <p className="text-sm text-gray-500">{orderDetails.shippingAddress.name}</p>
              <p className="text-sm text-gray-500">{orderDetails.shippingAddress.street}</p>
              <p className="text-sm text-gray-500">
                {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state} {orderDetails.shippingAddress.zip}
              </p>
              <p className="text-sm text-gray-500">{orderDetails.shippingAddress.country}</p>
            </div>
            <div className="mt-8 border-t border-gray-200 pt-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Payment Method</h3>
              <p className="text-sm text-gray-500">{orderDetails.paymentMethod}</p>
            </div>
          </div>
          <div className="px-4 py-5 sm:px-6 bg-gray-50 flex justify-between items-center">
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <Printer className="mr-2 h-5 w-5" />
              Print Order
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Continue Shopping
              <ChevronRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;