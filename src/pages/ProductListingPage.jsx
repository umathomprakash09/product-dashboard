import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilteredProducts, setSearch, setCategory, setSort, selectFilters } from '../features/products/productsSlice';
import ProductCard from '../components/ProductCard';
import SearchFilterSort from '../components/SearchFilterSort';

export default function ProductListingPage() {
  const products = useSelector(selectFilteredProducts);
  const filters = useSelector(selectFilters);
  const dispatch = useDispatch();

  // Debounced search state
  const [searchTerm, setSearchTerm] = useState(filters.search);

  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(setSearch(searchTerm));
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm, dispatch]);

  return (
    <div>
      <SearchFilterSort
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        category={filters.category}
        setCategory={(cat) => dispatch(setCategory(cat))}
        sort={filters.sort}
        setSort={(s) => dispatch(setSort(s))}
      />
      {products.length === 0 ? (
        <p className="mt-4 text-center">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
