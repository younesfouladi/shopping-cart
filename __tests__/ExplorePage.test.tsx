import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ExplorePage from '../src/components/explorePage/explore';

// Mock the utilities
vi.mock('../src/components/Utilities', () => ({
  LoadingSpinner: () => <div data-testid="loading-spinner">Loading...</div>,
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
    title: 'Product 1',
    description: 'Test description 1',
    category: 'electronics',
    image: 'test-image-1.jpg',
    price: 29.99,
    rating: { rate: 4.5, count: 100 }
  },
  {
    id: 2,
    title: 'Product 2',
    description: 'Test description 2',
    category: "women's clothing",
    image: 'test-image-2.jpg',
    price: 19.99,
    rating: { rate: 3.8, count: 50 }
  },
  {
    id: 3,
    title: 'Product 3',
    description: 'Test description 3',
    category: 'jewelery',
    image: 'test-image-3.jpg',
    price: 99.99,
    rating: { rate: 4.2, count: 75 }
  }
];

describe('ExplorePage Component', () => {
  it('shows loading spinner when products are empty', () => {
    mockUseOutletContext.mockReturnValue([[], [], vi.fn()]);

    render(
      <BrowserRouter>
        <ExplorePage />
      </BrowserRouter>
    );

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('renders page title when products are loaded', () => {
    mockUseOutletContext.mockReturnValue([mockProducts, [], vi.fn()]);

    render(
      <BrowserRouter>
        <ExplorePage />
      </BrowserRouter>
    );

    expect(screen.getByText('All Products')).toBeInTheDocument();
  });

  it('displays all products when loaded', () => {
    mockUseOutletContext.mockReturnValue([mockProducts, [], vi.fn()]);

    render(
      <BrowserRouter>
        <ExplorePage />
      </BrowserRouter>
    );

    expect(screen.getByTestId('product-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('product-card-2')).toBeInTheDocument();
    expect(screen.getByTestId('product-card-3')).toBeInTheDocument();
  });

  it('passes correct props to ProductCard components', () => {
    const mockSetWishList = vi.fn();
    const mockWishList = [mockProducts[0]]; // First product is in wishlist

    mockUseOutletContext.mockReturnValue([mockProducts, mockWishList, mockSetWishList]);

    render(
      <BrowserRouter>
        <ExplorePage />
      </BrowserRouter>
    );

    // All products should be rendered
    expect(screen.getByTestId('product-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('product-card-2')).toBeInTheDocument();
    expect(screen.getByTestId('product-card-3')).toBeInTheDocument();
  });

  it('applies correct CSS classes to container', () => {
    mockUseOutletContext.mockReturnValue([mockProducts, [], vi.fn()]);

    render(
      <BrowserRouter>
        <ExplorePage />
      </BrowserRouter>
    );

    const container = screen.getByRole('main');
    expect(container).toHaveClass('pb-14');
    expect(container).toHaveAttribute('id', 'explore-container');
  });

  it('applies correct grid classes to products container', () => {
    mockUseOutletContext.mockReturnValue([mockProducts, [], vi.fn()]);

    render(
      <BrowserRouter>
        <ExplorePage />
      </BrowserRouter>
    );

    const productsGrid = screen.getByRole('main').querySelector('#all-products');
    expect(productsGrid).toHaveClass(
      'grid',
      'grid-cols-2',
      'gap-4',
      'md:grid-cols-3',
      'lg:grid-cols-4',
      '2xl:grid-cols-5'
    );
  });

  it('renders with empty wishlist', () => {
    mockUseOutletContext.mockReturnValue([mockProducts, [], vi.fn()]);

    render(
      <BrowserRouter>
        <ExplorePage />
      </BrowserRouter>
    );

    expect(screen.getByText('All Products')).toBeInTheDocument();
    expect(screen.getAllByTestId(/product-card-/)).toHaveLength(3);
  });

  it('handles large number of products', () => {
    const manyProducts = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      title: `Product ${i + 1}`,
      description: `Test description ${i + 1}`,
      category: 'electronics',
      image: `test-image-${i + 1}.jpg`,
      price: 10 + i,
      rating: { rate: 4.0, count: 50 }
    }));

    mockUseOutletContext.mockReturnValue([manyProducts, [], vi.fn()]);

    render(
      <BrowserRouter>
        <ExplorePage />
      </BrowserRouter>
    );

    const productCards = screen.getAllByTestId(/product-card-/);
    expect(productCards).toHaveLength(20);
  });

  it('maintains product order from context', () => {
    mockUseOutletContext.mockReturnValue([mockProducts, [], vi.fn()]);

    render(
      <BrowserRouter>
        <ExplorePage />
      </BrowserRouter>
    );

    // Products should be rendered in the same order as provided
    const productCards = screen.getAllByTestId(/product-card-/);
    expect(productCards[0]).toHaveAttribute('data-testid', 'product-card-1');
    expect(productCards[1]).toHaveAttribute('data-testid', 'product-card-2');
    expect(productCards[2]).toHaveAttribute('data-testid', 'product-card-3');
  });
});