import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import ProductDetail from './components/ProductDetail';
import CartComponent from './components/Cart';
import OrderConfirmation from './components/OrderDetail';
import OrderList from './components/Order';
import CreateOrder from './components/CreateOrder'
import PrivateRoute from './components/PrivateRoute'; 
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <ConditionalNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path='/create-order' element={<PrivateRoute element={CreateOrder} />} />
          <Route path='/order/:id' element={<PrivateRoute element={OrderConfirmation} />} />
          <Route path='/order' element={<PrivateRoute element={OrderList} />} />
          <Route path="/cart" element={<PrivateRoute element={CartComponent} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

function ConditionalNavbar() {
  const location = useLocation();
  const shouldShowNavbar = location.pathname !== '/login' && location.pathname !== '/register';
  return shouldShowNavbar ? <Navbar /> : null;
}

export default App;
