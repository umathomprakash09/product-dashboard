import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllProducts, selectFavorites, removeFavorite } from '../features/products/productsSlice';
import { Link } from 'react-router-dom';

export default function FavoritesPage() {
  const products = useSelector(selectAllProducts);
  const favorites = useSelector(selectFavorites);
  const dispatch = useDispatch();

  const favoriteProducts = products.filter(p => favorites.includes(p.id));

  if (favoriteProducts.length === 0) {
    return <p>You have no favorite products yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {favoriteProducts.map(product => (
        <div key={product.id} className="border rounded p-4 flex flex-col">
          <Link to={`/product/${product.id}`} className="flex-grow">
            <img src={product.image} alt={product.title} className="h-48 w-full object-contain mb-4" />
            <h3 className="font-semibold text-lg">{product.title}</h3>
            <p className="mt-2 font-bold">${product.price.toFixed(2)}</p>
          </Link>
          <button
            onClick={() => dispatch(removeFavorite(product.id))}
            className="mt-4 py-2 rounded bg-red-500 text-white"
            aria-label="Remove from favorites"
          >
            Remove Favorite
          </button>
        </div>
      ))}
    </div>
  );
}
