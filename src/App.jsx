import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductListingPage from './pages/ProductListingPage';
import ProductDetailPage from './pages/ProductDetailPage';
import FavoritesPage from './pages/FavoritesPage';
import { useDispatch } from 'react-redux';
import { fetchProducts } from './features/products/productsSlice';

function Navbar() {
  return (
    <nav className="bg-blue-200 text-white p-4 flex justify-between">
      <div>
        <Link to="/" className="font-bold text-lg">Product Dashboard</Link>
      </div>
      <div className="space-x-4">
        <Link to="/">Products</Link>
        <Link to="/favorites">Favorites</Link>
      </div>
    </nav>
  );
}

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<ProductListingPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
