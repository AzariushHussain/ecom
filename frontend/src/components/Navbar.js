import { Link } from 'react-router-dom';
import { ShoppingCart, Search } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-white">TechShop</Link>
        <div className="flex items-center space-x-4">
          <form className="relative">
            <input
              type="search"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </form>
          <Link to="/cart">
            <button className="flex items-center justify-center p-2 rounded-md border border-transparent bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <ShoppingCart className="h-5 w-5 text-white" />
              <span className="sr-only">Shopping Cart</span>
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}
