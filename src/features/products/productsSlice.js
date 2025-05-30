import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://fakestoreapi.com/products';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle', //'loading', 'succeeded', 'failed'
    error: null,
    filters: {
      search: '',
      category: 'all',
      sort: 'none', // 'price-asc', 'price-desc'
    },
    favorites: [],
  },
  reducers: {
    setSearch(state, action) {
      state.filters.search = action.payload;
    },
    setCategory(state, action) {
      state.filters.category = action.payload;
    },
    setSort(state, action) {
      state.filters.sort = action.payload;
    },
    toggleFavorite(state, action) {
      const id = action.payload;
      if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter(favId => favId !== id);
      } else {
        state.favorites.push(id);
      }
    },
    removeFavorite(state, action) {
      const id = action.payload;
      state.favorites = state.favorites.filter(favId => favId !== id);
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

// Selectors

export const selectAllProducts = (state) => state.products.items;
export const selectFilters = (state) => state.products.filters;
export const selectFavorites = (state) => state.products.favorites;

export const selectFilteredProducts = createSelector(
  [selectAllProducts, selectFilters],
  (products, filters) => {
    let filtered = products;

    // Filter category
    if (filters.category !== 'all') {
      filtered = filtered.filter(p => p.category === filters.category);
    }

    // Search by title (case insensitive)
    if (filters.search.trim() !== '') {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(p => p.title.toLowerCase().includes(searchLower));
    }

    // Sort by price
    if (filters.sort === 'price-asc') {
      filtered = filtered.slice().sort((a, b) => a.price - b.price);
    } else if (filters.sort === 'price-desc') {
      filtered = filtered.slice().sort((a, b) => b.price - a.price);
    }

    return filtered;
  }
);

export const { setSearch, setCategory, setSort, toggleFavorite, removeFavorite } = productsSlice.actions;
export default productsSlice.reducer;
