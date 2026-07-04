import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Product from './pages/Product';

import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Search from './pages/Search';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import CartDrawer from './components/cart/CartDrawer';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const Layout = ({ children }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isCheckout = location.pathname === '/checkout';

  if (isCheckout) {
    return (
      <div className="min-h-screen flex flex-col font-sans text-ald-black">
        <main className="flex-grow">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans text-ald-black">
      <Navbar />
      <CartDrawer />
      <main className="flex-grow">
        {children}
      </main>
      {!isHome && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:category" element={<Shop />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/search" element={<Search />} />
          <Route path="/account/login" element={<Login />} />
          <Route path="/account/register" element={<Register />} />
          
          {/* Catch-all 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
