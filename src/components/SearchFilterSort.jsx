import React from 'react';

const categories = [
  { label: 'All', value: 'all' },
  { label: "men's clothing", value: "men's clothing" },
  { label: "women's clothing", value: "women's clothing" },
  { label: 'jewelery', value: 'jewelery' },
  { label: 'electronics', value: 'electronics' },
];

export default function SearchFilterSort({ searchTerm, setSearchTerm, category, setCategory, sort, setSort }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center">
      <input
        type="text"
        placeholder="Search products..."
        className="border rounded p-2 flex-grow"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        aria-label="Search products by title"
      />
      <select
        value={category}
        onChange={e => setCategory(e.target.value)}
        className="border rounded p-2"
        aria-label="Filter by category"
      >
        {categories.map(cat => (
          <option key={cat.value} value={cat.value}>{cat.label}</option>
        ))}
      </select>
      <select
        value={sort}
        onChange={e => setSort(e.target.value)}
        className="border rounded p-2"
        aria-label="Sort by price"
      >
        <option value="none">Sort by price</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>
    </div>
  );
}
