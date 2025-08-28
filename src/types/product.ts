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

export interface ProductContextType {
  products: IProduct[];
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
  wishList: IProduct[];
  setWishList: React.Dispatch<React.SetStateAction<IProduct[]>>;
}
