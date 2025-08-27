import "./styles/App.css";
import Navbar from "./components/navbar/navbar";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

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

export type IProductContext = [
  IProduct[],
  IProduct[],
  React.Dispatch<React.SetStateAction<IProduct[]>>
];

export default function App() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [wishList, setWishList] = useState<IProduct[]>([]);
  useEffect(() => {
    (async () => {
      const url = "https://fakestoreapi.com/products";
      try {
        const response = await fetch(url);
        const result = await response.json();
        setProducts(result);
      } catch (error) {
        throw new Error(`Error : ${error}`);
      }
    })();
  }, []);
  return (
    <div id="container" className="p-4 font-main">
      <Navbar />
      <Outlet context={[products, wishList, setWishList]} />
    </div>
  );
}
