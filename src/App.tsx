import "./styles/App.css";
import Navbar from "./components/navbar/navbar";
import { Outlet } from "react-router-dom";
import { useProductStore } from "./hooks/useProductContext";
import { useEffect } from "react";

export default function App() {
  const setProducts = useProductStore((state) => state?.setProducts);

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
  }, [setProducts]);

  return (
    <main
      id="container"
      className="p-4 font-main min-h-full bg-[#fafafa] dark:bg-gray-900"
    >
      <Navbar />
      <Outlet />
    </main>
  );
}
