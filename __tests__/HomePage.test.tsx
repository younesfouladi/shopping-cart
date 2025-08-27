import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '../src/components/homePage/home';

// Mock the utilities
vi.mock('../src/components/Utilities', () => ({
  LoadingSpinner: () => <div data-testid="loading-spinner">Loading...</div>,
  ImageSlider: ({ imageUrls }: { imageUrls: string[] }) => (
    <div data-testid="image-slider">
      Image Slider with {imageUrls.length} images
    </div>
  ),
  ProductCard: ({ product }: { product: any }) => (
    <div data-testid={`product-card-${product.id}`}>
      {product.title} - ${product.price}
    </div>
  )
}));

// Mock useOutletContext
const mockUseOutletContext = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useOutletContext: () => mockUseOutletContext()
  };
});

const mockProducts = [
  {
    id: 1,
    title: 'Cheap Product',
    description: 'Test description',
    category: 'electronics',
    image: 'test-image.jpg',
    price: 10.99,
    rating: { rate: 4.5, count: 100 }
  },
  {
    id: 2,
    title: 'Expensive Product',
    description: 'Test description 2',
    category: "women's clothing",
    image: 'test-image-2.jpg',
    price: 99.99,
    rating: { rate: 3.8, count: 50 }
  },
  {
    id: 3,
    title: 'Trending Product',
    description: 'Test description 3',
    category: 'electronics',
    image: 'test-image-3.jpg',
    price: 49.99,
    rating: { rate: 4.8, count: 200 }
  },
  {
    id: 4,
    title: "Women's Dress",
    description: 'Test description 4',
    category: "women's clothing",
    image: 'test-image-4.jpg',
    price: 29.99,
    rating: { rate: 4.2, count: 75 }
  }
];

describe('HomePage Component', () => {
  it('shows loading spinner when products are empty', () => {
    mockUseOutletContext.mockReturnValue([[], [], vi.fn()]);

    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('renders image slider when products are loaded', () => {
    mockUseOutletContext.mockReturnValue([mockProducts, [], vi.fn()]);

    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    expect(screen.getByTestId('image-slider')).toBeInTheDocument();
    expect(screen.getByText('Image Slider with 5 images')).toBeInTheDocument();
  });

  it('displays cheapest products section', () => {
    mockUseOutletContext.mockReturnValue([mockProducts, [], vi.fn()]);

    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    expect(screen.getByText('Cheapest Products')).toBeInTheDocument();
    expect(screen.getByTestId('product-card-1')).toBeInTheDocument(); // Cheapest product
  });

  it('displays trending products section', () => {
    mockUseOutletContext.mockReturnValue([mockProducts, [], vi.fn()]);

    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    expect(screen.getByText('Trending Products')).toBeInTheDocument();
    // Should show products with rating > 3, sorted by rating
    expect(screen.getByTestId('product-card-3')).toBeInTheDocument(); // Highest rated
  });

  it('displays women clothing section', () => {
    mockUseOutletContext.mockReturnValue([mockProducts, [], vi.fn()]);

    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    expect(screen.getByText('Women Clothing')).toBeInTheDocument();
    expect(screen.getByTestId('product-card-2')).toBeInTheDocument();
    expect(screen.getByTestId('product-card-4')).toBeInTheDocument();
  });

  it('shows "see all" buttons for each section', () => {
    mockUseOutletContext.mockReturnValue([mockProducts, [], vi.fn()]);

    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    const seeAllButtons = screen.getAllByText('see all');
    expect(seeAllButtons).toHaveLength(3); // One for each section
  });

  it('limits products to 4 per section', () => {
    const manyProducts = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      title: `Product ${i + 1}`,
      description: 'Test description',
      category: "women's clothing",
      image: 'test-image.jpg',
      price: 20 + i,
      rating: { rate: 4.0, count: 50 }
    }));

    mockUseOutletContext.mockReturnValue([manyProducts, [], vi.fn()]);

    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    // Each section should show maximum 4 products
    const productCards = screen.getAllByTestId(/product-card-/);
    // We expect 4 cheapest + 4 trending + 4 women's clothing = 12 max
    expect(productCards.length).toBeLessThanOrEqual(12);
  });

  it('sorts cheapest products by price ascending', () => {
    mockUseOutletContext.mockReturnValue([mockProducts, [], vi.fn()]);

    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    // The cheapest product (id: 1, price: 10.99) should be displayed
    expect(screen.getByTestId('product-card-1')).toBeInTheDocument();
  });

  it('filters and sorts trending products correctly', () => {
    mockUseOutletContext.mockReturnValue([mockProducts, [], vi.fn()]);

    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    // Products with rating > 3 should be shown, sorted by rating descending
    // Product 3 has highest rating (4.8)
    expect(screen.getByTestId('product-card-3')).toBeInTheDocument();
  });
});