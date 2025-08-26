import "./styles/App.css";
import Navbar from "./components/navbar/navbar";
import HomePage from "./components/homePage/home";
import { useEffect, useState } from "react";

interface IProduct {
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

export default function App() {
  const [products, setProducts] = useState<IProduct[]>([]);
  useEffect(() => {
    (async () => {
      const url = "https://fakestoreapi.com/products";
      try {
        const response = await fetch(url);
        const result = await response.json();
        setProducts(result);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div id="container" className="p-4 font-main">
      <Navbar />
      <HomePage products={products} />
    </div>
  );
}
