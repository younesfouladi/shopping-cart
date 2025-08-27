import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import WishList from '../src/components/wishList/wishList';

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
  }
];

describe('WishList Component', () => {
  it('shows loading spinner when products are empty', () => {
    mockUseOutletContext.mockReturnValue([[], [], vi.fn()]);

    render(
      <BrowserRouter>
        <WishList />
      </BrowserRouter>
    );

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('shows empty wishlist message when wishlist is empty', () => {
    mockUseOutletContext.mockReturnValue([mockProducts, [], vi.fn()]);

    render(
      <BrowserRouter>
        <WishList />
      </BrowserRouter>
    );

    expect(screen.getByText('WishList is empty!')).toBeInTheDocument();
    expect(screen.getByAltText('sad dog cause of empty wish list')).toBeInTheDocument();
  });

  it('displays wishlist products when wishlist has items', () => {
    const wishListItems = [mockProducts[0], mockProducts[1]];
    mockUseOutletContext.mockReturnValue([mockProducts, wishListItems, vi.fn()]);

    render(
      <BrowserRouter>
        <WishList />
      </BrowserRouter>
    );

    expect(screen.getByText('All Products')).toBeInTheDocument();
    expect(screen.getByTestId('product-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('product-card-2')).toBeInTheDocument();
  });

  it('passes correct props to ProductCard components', () => {
    const mockSetWishList = vi.fn();
    const wishListItems = [mockProducts[0]];

    mockUseOutletContext.mockReturnValue([mockProducts, wishListItems, mockSetWishList]);

    render(
      <BrowserRouter>
        <WishList />
      </BrowserRouter>
    );

    expect(screen.getByTestId('product-card-1')).toBeInTheDocument();
  });

  it('applies correct CSS classes to empty state', () => {
    mockUseOutletContext.mockReturnValue([mockProducts, [], vi.fn()]);

    render(
      <BrowserRouter>
        <WishList />
      </BrowserRouter>
    );

    const emptyContainer = screen.getByText('WishList is empty!').parentElement;
    expect(emptyContainer).toHaveClass('flex', 'flex-col', 'items-center', 'justify-center', 'mt-30');
  });

  it('applies correct CSS classes to wishlist container', () => {
    const wishListItems = [mockProducts[0]];
    mockUseOutletContext.mockReturnValue([mockProducts, wishListItems, vi.fn()]);

    render(
      <BrowserRouter>
        <WishList />
      </BrowserRouter>
    );

    const container = screen.getByRole('main');
    expect(container).toHaveClass('pb-14');
    expect(container).toHaveAttribute('id', 'explore-container');
  });

  it('applies correct grid classes to products container', () => {
    const wishListItems = [mockProducts[0]];
    mockUseOutletContext.mockReturnValue([mockProducts, wishListItems, vi.fn()]);

    render(
      <BrowserRouter>
        <WishList />
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

  it('displays empty state image with correct attributes', () => {
    mockUseOutletContext.mockReturnValue([mockProducts, [], vi.fn()]);

    render(
      <BrowserRouter>
        <WishList />
      </BrowserRouter>
    );

    const image = screen.getByAltText('sad dog cause of empty wish list');
    expect(image).toHaveAttribute('src', '/images/sad-dog.svg');
    expect(image).toHaveClass(
      'w-9/10',
      'sm:max-w-2/3',
      'md:max-w-1/2',
      '2xl:max-w-2/6',
      'h-auto'
    );
  });

  it('handles single item in wishlist', () => {
    const wishListItems = [mockProducts[0]];
    mockUseOutletContext.mockReturnValue([mockProducts, wishListItems, vi.fn()]);

    render(
      <BrowserRouter>
        <WishList />
      </BrowserRouter>
    );

    expect(screen.getByTestId('product-card-1')).toBeInTheDocument();
    expect(screen.queryByTestId('product-card-2')).not.toBeInTheDocument();
  });

  it('handles multiple items in wishlist', () => {
    const wishListItems = mockProducts;
    mockUseOutletContext.mockReturnValue([mockProducts, wishListItems, vi.fn()]);

    render(
      <BrowserRouter>
        <WishList />
      </BrowserRouter>
    );

    expect(screen.getByTestId('product-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('product-card-2')).toBeInTheDocument();
  });

  it('maintains wishlist item order', () => {
    const wishListItems = [mockProducts[1], mockProducts[0]]; // Reversed order
    mockUseOutletContext.mockReturnValue([mockProducts, wishListItems, vi.fn()]);

    render(
      <BrowserRouter>
        <WishList />
      </BrowserRouter>
    );

    const productCards = screen.getAllByTestId(/product-card-/);
    expect(productCards[0]).toHaveAttribute('data-testid', 'product-card-2');
    expect(productCards[1]).toHaveAttribute('data-testid', 'product-card-1');
  });
});