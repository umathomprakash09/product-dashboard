import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from './ProductCard';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import { BrowserRouter } from 'react-router-dom';

const product = {
  id: 1,
  title: 'Test Product',
  price: 10,
  category: 'electronics',
  image: 'https://via.placeholder.com/150',
};

describe('ProductCard', () => {
  it('renders product info and toggles favorite', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProductCard product={product} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
    expect(screen.getByText(/\$10.00/)).toBeInTheDocument();

    const favButton = screen.getByRole('button', { name: /Add to Favorites/i });
    fireEvent.click(favButton);

    expect(screen.getByRole('button', { name: /Remove from favorites/i })).toBeInTheDocument();
  });
});
