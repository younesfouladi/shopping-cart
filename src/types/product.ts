import type React from "react";

export interface IProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
}

export interface ICart {
  quanity: number;
  product: IProduct;
}

export interface ProductContextType {
  products: IProduct[];
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
  wishList: IProduct[];
  setWishList: React.Dispatch<React.SetStateAction<IProduct[]>>;
  cart: ICart[];
  setCart: React.Dispatch<React.SetStateAction<ICart[]>>;
}
