import { describe, it, expect } from 'vitest';
import type { IProduct, IProductContext } from '../src/App';

describe('Type Definitions', () => {
  describe('IProduct Interface', () => {
    it('should have correct structure for a valid product', () => {
      const validProduct: IProduct = {
        id: 1,
        title: 'Test Product',
        description: 'Test description',
        category: 'electronics',
        image: 'test-image.jpg',
        price: 29.99,
        rating: {
          rate: 4.5,
          count: 100
        }
      };

      expect(validProduct.id).toBe(1);
      expect(validProduct.title).toBe('Test Product');
      expect(validProduct.description).toBe('Test description');
      expect(validProduct.category).toBe('electronics');
      expect(validProduct.image).toBe('test-image.jpg');
      expect(validProduct.price).toBe(29.99);
      expect(validProduct.rating.rate).toBe(4.5);
      expect(validProduct.rating.count).toBe(100);
    });

    it('should handle different product categories', () => {
      const categories = ['electronics', "women's clothing", "men's clothing", 'jewelery'];
      
      categories.forEach(category => {
        const product: IProduct = {
          id: 1,
          title: 'Test Product',
          description: 'Test description',
          category: category,
          image: 'test-image.jpg',
          price: 29.99,
          rating: { rate: 4.5, count: 100 }
        };

        expect(product.category).toBe(category);
      });
    });

    it('should handle various price ranges', () => {
      const prices = [0.99, 10.50, 100.00, 999.99];
      
      prices.forEach(price => {
        const product: IProduct = {
          id: 1,
          title: 'Test Product',
          description: 'Test description',
          category: 'electronics',
          image: 'test-image.jpg',
          price: price,
          rating: { rate: 4.5, count: 100 }
        };

        expect(product.price).toBe(price);
      });
    });

    it('should handle various rating values', () => {
      const ratings = [
        { rate: 1.0, count: 1 },
        { rate: 2.5, count: 50 },
        { rate: 4.8, count: 200 },
        { rate: 5.0, count: 1000 }
      ];
      
      ratings.forEach(rating => {
        const product: IProduct = {
          id: 1,
          title: 'Test Product',
          description: 'Test description',
          category: 'electronics',
          image: 'test-image.jpg',
          price: 29.99,
          rating: rating
        };

        expect(product.rating.rate).toBe(rating.rate);
        expect(product.rating.count).toBe(rating.count);
      });
    });
  });

  describe('IProductContext Type', () => {
    it('should represent the correct tuple structure', () => {
      const mockProducts: IProduct[] = [
        {
          id: 1,
          title: 'Test Product',
          description: 'Test description',
          category: 'electronics',
          image: 'test-image.jpg',
          price: 29.99,
          rating: { rate: 4.5, count: 100 }
        }
      ];

      const mockWishList: IProduct[] = [];
      const mockSetWishList = () => {};

      const context: IProductContext = [mockProducts, mockWishList, mockSetWishList];

      expect(Array.isArray(context[0])).toBe(true);
      expect(Array.isArray(context[1])).toBe(true);
      expect(typeof context[2]).toBe('function');
    });

    it('should handle empty arrays', () => {
      const context: IProductContext = [[], [], () => {}];

      expect(context[0]).toEqual([]);
      expect(context[1]).toEqual([]);
      expect(typeof context[2]).toBe('function');
    });

    it('should handle populated arrays', () => {
      const products: IProduct[] = [
        {
          id: 1,
          title: 'Product 1',
          description: 'Description 1',
          category: 'electronics',
          image: 'image1.jpg',
          price: 10.99,
          rating: { rate: 4.0, count: 50 }
        },
        {
          id: 2,
          title: 'Product 2',
          description: 'Description 2',
          category: "women's clothing",
          image: 'image2.jpg',
          price: 20.99,
          rating: { rate: 4.5, count: 75 }
        }
      ];

      const wishList: IProduct[] = [products[0]];
      const setWishList = () => {};

      const context: IProductContext = [products, wishList, setWishList];

      expect(context[0]).toHaveLength(2);
      expect(context[1]).toHaveLength(1);
      expect(context[1][0]).toEqual(products[0]);
    });
  });

  describe('Product Data Validation', () => {
    it('should validate required fields are present', () => {
      const product: IProduct = {
        id: 1,
        title: 'Test Product',
        description: 'Test description',
        category: 'electronics',
        image: 'test-image.jpg',
        price: 29.99,
        rating: { rate: 4.5, count: 100 }
      };

      // Check all required fields exist
      expect(product).toHaveProperty('id');
      expect(product).toHaveProperty('title');
      expect(product).toHaveProperty('description');
      expect(product).toHaveProperty('category');
      expect(product).toHaveProperty('image');
      expect(product).toHaveProperty('price');
      expect(product).toHaveProperty('rating');
      expect(product.rating).toHaveProperty('rate');
      expect(product.rating).toHaveProperty('count');
    });

    it('should validate field types', () => {
      const product: IProduct = {
        id: 1,
        title: 'Test Product',
        description: 'Test description',
        category: 'electronics',
        image: 'test-image.jpg',
        price: 29.99,
        rating: { rate: 4.5, count: 100 }
      };

      expect(typeof product.id).toBe('number');
      expect(typeof product.title).toBe('string');
      expect(typeof product.description).toBe('string');
      expect(typeof product.category).toBe('string');
      expect(typeof product.image).toBe('string');
      expect(typeof product.price).toBe('number');
      expect(typeof product.rating).toBe('object');
      expect(typeof product.rating.rate).toBe('number');
      expect(typeof product.rating.count).toBe('number');
    });

    it('should handle edge cases for numeric values', () => {
      const edgeCases = [
        { id: 0, price: 0, rating: { rate: 0, count: 0 } },
        { id: Number.MAX_SAFE_INTEGER, price: 999999.99, rating: { rate: 5, count: Number.MAX_SAFE_INTEGER } }
      ];

      edgeCases.forEach(({ id, price, rating }) => {
        const product: IProduct = {
          id,
          title: 'Test Product',
          description: 'Test description',
          category: 'electronics',
          image: 'test-image.jpg',
          price,
          rating
        };

        expect(product.id).toBe(id);
        expect(product.price).toBe(price);
        expect(product.rating.rate).toBe(rating.rate);
        expect(product.rating.count).toBe(rating.count);
      });
    });
  });
});