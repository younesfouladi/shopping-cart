import { create } from "zustand";
import type { ProductStoreType } from "@/types/product";

export const useProductStore = create<ProductStoreType>((set) => ({
  products: [],
  wishList: [],
  cart: [],
  setProducts: (items) => {
    set(() => ({
      products: items,
    }));
  },
  setWishList: (product) => {
    set((state) => {
      const isFavorite = state.wishList.some((item) => item.id === product.id);
      if (isFavorite) {
        return {
          wishList: state.wishList.filter((item) => item.id !== product.id),
        };
      } else {
        return {
          wishList: [...state.wishList, product],
        };
      }
    });
  },

  setCart: (item) => {
    set(() => ({
      cart: item,
    }));
  },

  handleAddToCart: (product) => {
    set((state) => ({
      cart: [...state.cart, { quanity: 1, product }],
    }));
  },

  handleIncrement: (product) => {
    set((state) => ({
      cart: state.cart.map((item) =>
        item.product.id === product.id
          ? { ...item, quanity: item.quanity + 1 }
          : item
      ),
    }));
  },

  handleDecrement: (product) => {
    set((state) => {
      const pr = state.cart.find((item) => item.product.id === product.id);

      if (pr?.quanity === 1) {
        return {
          cart: state.cart.filter((item) => item.product.id !== pr.product.id),
        };
      } else {
        return {
          cart: state.cart.map((item) =>
            item.product.id === product.id
              ? { ...item, quanity: item.quanity - 1 }
              : item
          ),
        };
      }
    });
  },
}));
