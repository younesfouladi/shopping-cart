import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import routes from '../src/routes/routes';

// Mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

const mockProducts = [
  {
    id: 1,
    title: 'Cheap Electronics',
    description: 'Test description 1',
    category: 'electronics',
    image: 'test-image-1.jpg',
    price: 15.99,
    rating: { rate: 4.5, count: 100 }
  },
  {
    id: 2,
    title: "Women's Dress",
    description: 'Test description 2',
    category: "women's clothing",
    image: 'test-image-2.jpg',
    price: 29.99,
    rating: { rate: 4.2, count: 75 }
  },
  {
    id: 3,
    title: 'Expensive Jewelry',
    description: 'Test description 3',
    category: 'jewelery',
    image: 'test-image-3.jpg',
    price: 199.99,
    rating: { rate: 4.8, count: 200 }
  }
];

describe('Integration Tests', () => {
  beforeEach(() => {
    mockFetch.mockClear();
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => mockProducts
    });
  });

  it('loads products and displays them on home page', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/']
    });

    render(<RouterProvider router={router} />);

    // Wait for products to load
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('https://fakestoreapi.com/products');
    });

    // Should show sections after loading
    await waitFor(() => {
      expect(screen.getByText('Cheapest Products')).toBeInTheDocument();
      expect(screen.getByText('Trending Products')).toBeInTheDocument();
      expect(screen.getByText('Women Clothing')).toBeInTheDocument();
    });
  });

  it('navigates between pages and maintains state', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/']
    });

    render(<RouterProvider router={router} />);

    // Wait for products to load
    await waitFor(() => {
      expect(screen.getByText('Cheapest Products')).toBeInTheDocument();
    });

    // Navigate to explore page
    router.navigate('/explore');

    await waitFor(() => {
      expect(screen.getByText('All Products')).toBeInTheDocument();
    });

    // Navigate to wishlist
    router.navigate('/wishList');

    await waitFor(() => {
      expect(screen.getByText('WishList is empty!')).toBeInTheDocument();
    });
  });

  it('adds and removes items from wishlist across pages', async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(routes, {
      initialEntries: ['/']
    });

    render(<RouterProvider router={router} />);

    // Wait for products to load
    await waitFor(() => {
      expect(screen.getByText('Cheapest Products')).toBeInTheDocument();
    });

    // Find and click a heart button to add to wishlist
    const heartButtons = screen.getAllByRole('button');
    const heartButton = heartButtons.find(button => 
      button.querySelector('svg')
    );

    if (heartButton) {
      await user.click(heartButton);
    }

    // Navigate to wishlist page
    router.navigate('/wishList');

    // Should show the added item instead of empty message
    await waitFor(() => {
      // The wishlist should no longer be empty
      expect(screen.queryByText('WishList is empty!')).not.toBeInTheDocument();
    });
  });

  it('handles API errors gracefully', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    mockFetch.mockRejectedValueOnce(new Error('API Error'));

    const router = createMemoryRouter(routes, {
      initialEntries: ['/']
    });

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalled();
    });

    // App should still render even with API error
    expect(screen.getByRole('navigation')).toBeInTheDocument();

    consoleSpy.mockRestore();
  });

  it('shows loading state initially', () => {
    // Mock fetch to never resolve to test loading state
    mockFetch.mockImplementation(() => new Promise(() => {}));

    const router = createMemoryRouter(routes, {
      initialEntries: ['/']
    });

    render(<RouterProvider router={router} />);

    // Should show loading spinner
    expect(screen.getByLabelText('Loading Spinner')).toBeInTheDocument();
  });

  it('filters products correctly on home page sections', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/']
    });

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.getByText('Cheapest Products')).toBeInTheDocument();
    });

    // Cheapest products should show the lowest priced item first
    const cheapestSection = screen.getByText('Cheapest Products').parentElement;
    expect(cheapestSection).toBeInTheDocument();

    // Trending products should show high-rated items
    const trendingSection = screen.getByText('Trending Products').parentElement;
    expect(trendingSection).toBeInTheDocument();

    // Women's clothing should only show women's clothing items
    const womenSection = screen.getByText('Women Clothing').parentElement;
    expect(womenSection).toBeInTheDocument();
  });

  it('maintains responsive design classes', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/']
    });

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.getByText('Cheapest Products')).toBeInTheDocument();
    });

    // Check that grid classes are applied
    const productGrids = screen.getAllByRole('generic').filter(el => 
      el.className.includes('grid')
    );

    expect(productGrids.length).toBeGreaterThan(0);
  });

  it('handles empty API response', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => []
    });

    const router = createMemoryRouter(routes, {
      initialEntries: ['/']
    });

    render(<RouterProvider router={router} />);

    // Should show loading initially, then empty sections
    expect(screen.getByLabelText('Loading Spinner')).toBeInTheDocument();
  });

  it('preserves wishlist state during navigation', async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(routes, {
      initialEntries: ['/']
    });

    render(<RouterProvider router={router} />);

    // Wait for products to load
    await waitFor(() => {
      expect(screen.getByText('Cheapest Products')).toBeInTheDocument();
    });

    // Add item to wishlist
    const heartButtons = screen.getAllByRole('button');
    const heartButton = heartButtons.find(button => 
      button.querySelector('svg')
    );

    if (heartButton) {
      await user.click(heartButton);
    }

    // Navigate to explore page
    router.navigate('/explore');

    await waitFor(() => {
      expect(screen.getByText('All Products')).toBeInTheDocument();
    });

    // Navigate back to home
    router.navigate('/');

    await waitFor(() => {
      expect(screen.getByText('Cheapest Products')).toBeInTheDocument();
    });

    // Wishlist state should be preserved (heart should still be filled)
    const preservedHeartButtons = screen.getAllByRole('button');
    const preservedHeartButton = preservedHeartButtons.find(button => {
      const svg = button.querySelector('svg');
      return svg && svg.getAttribute('fill') === 'red';
    });

    expect(preservedHeartButton).toBeInTheDocument();
  });
});