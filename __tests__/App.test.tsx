import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../src/App';

// Mock the navbar component
vi.mock('../src/components/navbar/navbar', () => ({
  default: () => <div data-testid="navbar">Navbar</div>
}));

// Mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

const mockProducts = [
  {
    id: 1,
    title: 'Test Product 1',
    description: 'Test description',
    category: 'electronics',
    image: 'test-image.jpg',
    price: 29.99,
    rating: { rate: 4.5, count: 100 }
  },
  {
    id: 2,
    title: 'Test Product 2',
    description: 'Test description 2',
    category: "women's clothing",
    image: 'test-image-2.jpg',
    price: 19.99,
    rating: { rate: 3.8, count: 50 }
  }
];

describe('App Component', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it('renders navbar and outlet container', () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducts
    });

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('fetches products on mount', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducts
    });

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('https://fakestoreapi.com/products');
    });
  });

  it('handles fetch error gracefully', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalled();
    });

    consoleSpy.mockRestore();
  });

  it('initializes with empty products and wishlist arrays', () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => []
    });

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // The component should render without crashing with empty initial state
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
  });

  it('applies correct CSS classes to container', () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducts
    });

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const container = screen.getByRole('main');
    expect(container).toHaveClass('p-4', 'font-main');
  });
});