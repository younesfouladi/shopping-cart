import "./styles/App.css";
import Navbar from "./components/navbar/navbar";
import { Outlet } from "react-router-dom";
import { ProductContext } from "./context/ProductContext";
import { useEffect, useState } from "react";
import type { IProduct } from "./types/product";
import type { ICart } from "./types/product";

export default function App() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [wishList, setWishList] = useState<IProduct[]>([]);
  const [cart, setCart] = useState<ICart[]>([]);

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
    <main id="container" className="p-4 font-main">
      <ProductContext.Provider
        value={{ products, setProducts, wishList, setWishList, cart, setCart }}
      >
        <Navbar />
        <Outlet />
      </ProductContext.Provider>
    </main>
  );
}
