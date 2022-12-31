import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import CartPage from './pages/CartPage';
import CustomerPage from './pages/CustomerPage';
import HomePage from './pages/HomePage';
import InvoicePage from './pages/InvoicePage';
import ProductPage from './pages/ProductPage';
import StatisticPage from './pages/StatisticPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/invoice" element={<InvoicePage />} />
        <Route path="/customers" element={<CustomerPage />} />
        <Route path="/statistic" element={<StatisticPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
