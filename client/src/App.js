import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import CartPage from './pages/CartPage';
import CustomerPage from './pages/CustomerPage';
import HomePage from './pages/HomePage';
import InvoicePage from './pages/InvoicePage';
import ProductPage from './pages/ProductPage';
import StatisticPage from './pages/StatisticPage';

function App() {
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart])
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RouteControl><HomePage /></RouteControl>} />
        <Route path="/cart" element={<RouteControl><CartPage /></RouteControl>} />
        <Route path="/invoice" element={<RouteControl><InvoicePage /></RouteControl>} />
        <Route path="/customers" element={<RouteControl><CustomerPage /></RouteControl>} />
        <Route path="/statistic" element={<RouteControl><StatisticPage /></RouteControl>} />
        <Route path="/products" element={<RouteControl><ProductPage /></RouteControl>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

export const RouteControl = ({children}) => {
  if(localStorage.getItem("user")){
    return children
  }else{
    return <Navigate to="/login" />
  }
}