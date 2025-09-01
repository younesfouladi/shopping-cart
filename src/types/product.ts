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

export interface ProductStoreType {
  products: IProduct[];
  setProducts: (items: IProduct[]) => void;
  wishList: IProduct[];
  setWishList: (product: IProduct) => void;
  cart: ICart[];
  setCart: (item: []) => void;
  handleAddToCart: (product: IProduct) => void;
  handleIncrement: (product: IProduct) => void;
  handleDecrement: (product: IProduct) => void;
}
