import productsReducer, { setSearch, setCategory, setSort, toggleFavorite, removeFavorite } from './productsSlice';

describe('productsSlice reducer', () => {
  const initialState = {
    items: [],
    status: 'idle',
    error: null,
    filters: {
      search: '',
      category: 'all',
      sort: 'none',
    },
    favorites: [],
  };

  it('should handle initial state', () => {
    expect(productsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should set search filter', () => {
    const actual = productsReducer(initialState, setSearch('shirt'));
    expect(actual.filters.search).toEqual('shirt');
  });

  it('should toggle favorite', () => {
    const stateWithFavorite = productsReducer(initialState, toggleFavorite(1));
    expect(stateWithFavorite.favorites).toContain(1);

    const stateWithoutFavorite = productsReducer(stateWithFavorite, toggleFavorite(1));
    expect(stateWithoutFavorite.favorites).not.toContain(1);
  });

  it('should remove favorite', () => {
    const stateWithFavorite = { ...initialState, favorites: [1, 2] };
    const newState = productsReducer(stateWithFavorite, removeFavorite(1));
    expect(newState.favorites).toEqual([2]);
  });
});
