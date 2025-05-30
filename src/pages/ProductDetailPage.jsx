import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllProducts, toggleFavorite, selectFavorites } from '../features/products/productsSlice';

export default function ProductDetailPage() {
  const { id } = useParams();
  const productId = Number(id);
  const products = useSelector(selectAllProducts);
  const favorites = useSelector(selectFavorites);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const product = products.find(p => p.id === productId);

  if (!product) return <p>Product not found</p>;

  const isFavorited = favorites.includes(productId);

  return (
    <div>
      <button className="mb-4 text-blue-600 underline" onClick={() => navigate(-1)}>Go Back</button>
      <div className="flex flex-col md:flex-row gap-8">
        <img src={product.image} alt={product.title} className="w-full md:w-1/3 object-contain" />
        <div className="flex flex-col space-y-4">
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="font-semibold text-xl">${product.price.toFixed(2)}</p>
          <p className="italic text-gray-600">{product.category}</p>
          <p>{product.description}</p>
          <button
            onClick={() => dispatch(toggleFavorite(productId))}
            className={`py-2 px-4 rounded ${
              isFavorited ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            aria-pressed={isFavorited}
            aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorited ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
        </div>
      </div>
    </div>
  );
}
