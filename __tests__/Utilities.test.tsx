import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoadingSpinner, ProductCard, ImageSlider } from '../src/components/Utilities';

// Mock flowbite-react Spinner
vi.mock('flowbite-react', () => ({
  Spinner: ({ 'aria-label': ariaLabel }: { 'aria-label': string }) => (
    <div data-testid="flowbite-spinner" aria-label={ariaLabel}>
      Loading...
    </div>
  )
}));

const mockProduct = {
  id: 1,
  title: 'Test Product',
  description: 'Test description',
  category: 'electronics',
  image: 'test-image.jpg',
  price: 29.99,
  rating: { rate: 4.5, count: 100 }
};

describe('LoadingSpinner Component', () => {
  it('renders spinner with correct attributes', () => {
    render(<LoadingSpinner />);

    const container = screen.getByTestId('flowbite-spinner').parentElement;
    expect(container).toHaveClass(
      'fixed',
      'flex',
      'flex-col',
      'inset-0',
      'bg-neutral-50',
      'items-center',
      'justify-center'
    );

    const spinner = screen.getByTestId('flowbite-spinner');
    expect(spinner).toHaveAttribute('aria-label', 'Loading Spinner');
  });
});

describe('ProductCard Component', () => {
  const mockSetWishList = vi.fn();

  beforeEach(() => {
    mockSetWishList.mockClear();
  });

  it('renders product information correctly', () => {
    render(
      <ProductCard
        product={mockProduct}
        wishList={[]}
        setWishList={mockSetWishList}
      />
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$29.99')).toBeInTheDocument();
    expect(screen.getByAltText("product's image")).toHaveAttribute('src', 'test-image.jpg');
    expect(screen.getByText('Add')).toBeInTheDocument();
  });

  it('shows unfilled heart when product is not in wishlist', () => {
    render(
      <ProductCard
        product={mockProduct}
        wishList={[]}
        setWishList={mockSetWishList}
      />
    );

    const heartButton = screen.getByRole('button', { name: /toggle favorite/i });
    const heartIcon = heartButton.querySelector('svg');
    expect(heartIcon).toHaveAttribute('fill', 'none');
  });

  it('shows filled heart when product is in wishlist', () => {
    render(
      <ProductCard
        product={mockProduct}
        wishList={[mockProduct]}
        setWishList={mockSetWishList}
      />
    );

    const heartButton = screen.getByRole('button', { name: /toggle favorite/i });
    const heartIcon = heartButton.querySelector('svg');
    expect(heartIcon).toHaveAttribute('fill', 'red');
  });

  it('adds product to wishlist when heart is clicked and product not in wishlist', async () => {
    const user = userEvent.setup();

    render(
      <ProductCard
        product={mockProduct}
        wishList={[]}
        setWishList={mockSetWishList}
      />
    );

    const heartButton = screen.getByRole('button', { name: /toggle favorite/i });
    await user.click(heartButton);

    expect(mockSetWishList).toHaveBeenCalledWith(expect.any(Function));
    
    // Test the function passed to setWishList
    const setWishListCall = mockSetWishList.mock.calls[0][0];
    const result = setWishListCall([]);
    expect(result).toEqual([mockProduct]);
  });

  it('removes product from wishlist when heart is clicked and product in wishlist', async () => {
    const user = userEvent.setup();

    render(
      <ProductCard
        product={mockProduct}
        wishList={[mockProduct]}
        setWishList={mockSetWishList}
      />
    );

    const heartButton = screen.getByRole('button', { name: /toggle favorite/i });
    await user.click(heartButton);

    expect(mockSetWishList).toHaveBeenCalledWith(expect.any(Function));
    
    // Test the function passed to setWishList
    const setWishListCall = mockSetWishList.mock.calls[0][0];
    const result = setWishListCall([mockProduct]);
    expect(result).toEqual([]);
  });

  it('applies correct CSS classes', () => {
    render(
      <ProductCard
        product={mockProduct}
        wishList={[]}
        setWishList={mockSetWishList}
      />
    );

    const container = screen.getByText('Test Product').closest('div');
    expect(container).toHaveClass(
      'relative',
      'flex',
      'flex-col',
      'gap-2',
      'bg-neutral-100',
      'border-1',
      'border-neutral-200',
      'rounded-2xl',
      'p-4'
    );
  });

  it('truncates long product titles', () => {
    const longTitleProduct = {
      ...mockProduct,
      title: 'This is a very long product title that should be truncated'
    };

    render(
      <ProductCard
        product={longTitleProduct}
        wishList={[]}
        setWishList={mockSetWishList}
      />
    );

    const titleElement = screen.getByText(longTitleProduct.title);
    expect(titleElement).toHaveClass(
      'whitespace-nowrap',
      'overflow-ellipsis',
      'overflow-hidden'
    );
    expect(titleElement).toHaveAttribute('title', longTitleProduct.title);
  });

  it('handles add button click', async () => {
    const user = userEvent.setup();

    render(
      <ProductCard
        product={mockProduct}
        wishList={[]}
        setWishList={mockSetWishList}
      />
    );

    const addButton = screen.getByText('Add');
    expect(addButton).toHaveClass(
      'gap-1',
      'bg-green-700',
      'text-neutral-50',
      'px-4',
      'py-1',
      'rounded-lg'
    );

    await user.click(addButton);
    // Add button functionality would be implemented based on requirements
  });
});

describe('ImageSlider Component', () => {
  const mockImageUrls = [
    '/images/banner-1.jpg',
    '/images/banner-2.jpg',
    '/images/banner-3.jpg'
  ];

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders all images', () => {
    render(<ImageSlider imageUrls={mockImageUrls} />);

    mockImageUrls.forEach((url, index) => {
      const image = screen.getByAltText('site banner');
      expect(image).toBeInTheDocument();
    });
  });

  it('starts with first image visible', () => {
    render(<ImageSlider imageUrls={mockImageUrls} />);

    const sliderContainer = screen.getByRole('img').parentElement;
    expect(sliderContainer).toHaveStyle('transform: translateX(-0%)');
  });

  it('automatically advances to next image after 3 seconds', async () => {
    render(<ImageSlider imageUrls={mockImageUrls} />);

    const sliderContainer = screen.getByRole('img').parentElement;
    
    // Initially at first image
    expect(sliderContainer).toHaveStyle('transform: translateX(-0%)');

    // Advance timer by 3 seconds
    vi.advanceTimersByTime(3000);

    await waitFor(() => {
      expect(sliderContainer).toHaveStyle('transform: translateX(-100%)');
    });
  });

  it('loops back to first image after reaching the end', async () => {
    render(<ImageSlider imageUrls={mockImageUrls} />);

    const sliderContainer = screen.getByRole('img').parentElement;

    // Advance through all images
    vi.advanceTimersByTime(3000); // Second image
    await waitFor(() => {
      expect(sliderContainer).toHaveStyle('transform: translateX(-100%)');
    });

    vi.advanceTimersByTime(3000); // Third image
    await waitFor(() => {
      expect(sliderContainer).toHaveStyle('transform: translateX(-200%)');
    });

    vi.advanceTimersByTime(3000); // Should loop back to first
    await waitFor(() => {
      expect(sliderContainer).toHaveStyle('transform: translateX(-0%)');
    });
  });

  it('applies correct CSS classes', () => {
    render(<ImageSlider imageUrls={mockImageUrls} />);

    const bannerContainer = screen.getByRole('img').closest('#home-banner');
    expect(bannerContainer).toHaveClass(
      'mb-4',
      'w-full',
      'overflow-hidden',
      'rounded-xl',
      'lg:w-2/3',
      'mx-auto'
    );

    const sliderContainer = screen.getByRole('img').parentElement;
    expect(sliderContainer).toHaveClass(
      'w-full',
      'relative',
      'flex',
      'transition-transform',
      'duration-500',
      'ease-in-out'
    );
  });

  it('handles single image', () => {
    const singleImage = ['/images/single-banner.jpg'];
    render(<ImageSlider imageUrls={singleImage} />);

    const image = screen.getByAltText('site banner');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', singleImage[0]);
  });

  it('handles empty image array', () => {
    render(<ImageSlider imageUrls={[]} />);

    const bannerContainer = screen.getByRole('generic');
    expect(bannerContainer).toBeInTheDocument();
  });

  it('cleans up timer on unmount', () => {
    const { unmount } = render(<ImageSlider imageUrls={mockImageUrls} />);
    
    const clearIntervalSpy = vi.spyOn(global, 'clearInterval');
    unmount();
    
    expect(clearIntervalSpy).toHaveBeenCalled();
  });
});