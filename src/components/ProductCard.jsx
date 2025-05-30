import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite, selectFavorites } from '../features/products/productsSlice';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const isFavorited = favorites.includes(product.id);

  return (
    <div className="border rounded p-4 flex flex-col">
      <Link to={`/product/${product.id}`} className="flex-grow">
        <img src={product.image} alt={product.title} className="h-48 w-full object-contain mb-4" />
        <h3 className="font-semibold text-lg">{product.title}</h3>
        <p className="mt-2 font-bold">${product.price.toFixed(2)}</p>
      </Link>
      <button
        onClick={() => dispatch(toggleFavorite(product.id))}
        className={`mt-4 py-2 rounded ${
          isFavorited ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'
        }`}
        aria-pressed={isFavorited}
        aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
      >
        {isFavorited ? 'Remove Favorite' : 'Add to Favorites'}
      </button>
    </div>
  );
}
