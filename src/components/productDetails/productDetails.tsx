import { Link } from "react-router-dom";
import { ChevronLeft, EllipsisVertical } from "lucide-react";
import { useParams } from "react-router-dom";
import { useProductContext } from "../../hooks/useProductContext";
import { useRef, useEffect, useState, useLayoutEffect } from "react";
import type { IProduct } from "../../types/product";
import gsap from "gsap";
import { ProductCard } from "../Utilities";

export default function PorductDetails() {
  const productRef = useRef(null);
  const { productId } = useParams();
  const { products, wishList, setWishList, cart, setCart } =
    useProductContext();
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useLayoutEffect(() => {
    if (!productRef.current || loading) return;
    gsap.fromTo(productRef.current, { scale: 0 }, { scale: 1, duration: 0.5 });
  }, [loading]);

  const handleBack = () => {
    gsap.fromTo(
      productRef.current,
      { scale: 1, opacity: 1 },
      { scale: 0, opacity: 0, duration: 0.5, onComplete: () => history.back() }
    );
  };

  useEffect(() => {
    const findProduct = () => {
      if (products.length > 0) {
        const product = products.find((item) => item.id === Number(productId));
        if (product) {
          setSelectedProduct(product);
          setLoading(false);
        } else {
          setError("Product not found");
          setLoading(false);
        }
      }
    };

    if (products.length > 0) {
      findProduct();
    } else {
      const fetchProduct = async () => {
        try {
          const response = await fetch(
            `https://fakestoreapi.com/products/${productId}`
          );
          if (!response.ok) {
            throw new Error("Product not found");
          }
          const product = await response.json();
          setSelectedProduct(product);
          setLoading(false);
        } catch (err) {
          setError(
            err instanceof Error ? err.message : "Failed to fetch product"
          );
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [products, productId]);

  const isFavorite =
    (selectedProduct &&
      wishList?.some((item) => item.id === selectedProduct.id)) ||
    false;

  const toggleFavorite = () => {
    if (!selectedProduct) return;

    setWishList((prev) => {
      if (isFavorite) {
        return prev.filter((item) => item.id !== selectedProduct.id);
      } else {
        return [...prev, selectedProduct];
      }
    });
  };

  function handleAddToCart(product: IProduct) {
    setCart((prev) => [...prev, { quanity: 1, product: product }]);
  }

  function handleInrement(product: IProduct) {
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === product.id
          ? { ...item, quanity: item.quanity + 1 }
          : item
      )
    );
  }

  function handleDecrement(product: IProduct) {
    const pr = cart.find((item) => item.product.id === product.id);
    if (pr?.quanity === 1) {
      setCart((prev) =>
        prev.filter((item) => item.product.id !== pr.product.id)
      );
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quanity: item.quanity - 1 }
            : item
        )
      );
    }
  }

  if (loading) {
    return (
      <div className="fixed w-full h-full z-20 inset-0 bg-neutral-50 p-2 flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        <p className="mt-4 text-lg">Loading product...</p>
      </div>
    );
  }

  if (error || !selectedProduct) {
    return (
      <div className="fixed w-full h-full z-20 inset-0 bg-neutral-50 p-2 flex flex-col items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-lg mb-4">{error || "Product not found"}</p>
          <Link
            to="/"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        id="product-card"
        className="fixed w-full h-full z-20 inset-0 bg-neutral-50 p-2 flex flex-col overflow-auto lg:grid lg:grid-cols-2 gap-x-4 lg:static"
        ref={productRef}
      >
        <div className="flex flex-col gap-8 px-4 py-8 bg-neutral-200 rounded-4xl items-center">
          <div
            id="product-card-nav"
            className="w-full flex justify-between lg:hidden"
          >
            <Link to="#" onClick={handleBack}>
              <ChevronLeft />
            </Link>
            <h1>Product Details</h1>
            <button>
              <EllipsisVertical />
            </button>
          </div>
          <div>
            <img
              src={selectedProduct.image}
              alt="product image"
              className="max-h-80"
            />
          </div>
        </div>
        <div>
          <div className="px-4 py-6 flex flex-col gap-4 border-b-1 border-neutral-300 lg:mb-6">
            <div className="grid grid-cols-[1fr_min-content] gap-2">
              <h3 title={selectedProduct.title} className="text-lg">
                {selectedProduct.title}
              </h3>
              <button
                onClick={toggleFavorite}
                className="cursor-pointer bg-neutral-200 rounded-full p-1 flex max-w-fit aspect-square ml-auto"
              >
                {isFavorite ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="red"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="none"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                )}
              </button>
            </div>
            <h3 className="font-bold text-2xl">${selectedProduct.price}</h3>

            <div className="flex items-center justify-center gap-1 border-1 border-neutral-200 bg-neutral-100 rounded-full max-w-fit py-1 px-2">
              <p className="font-semibold">⭐ {selectedProduct.rating.rate}</p>
              <p className="text-sm">
                ({selectedProduct.rating.count} Reviews)
              </p>
            </div>
          </div>
          <div className="p-4 space-y-2 border-b-1 border-neutral-300 lg:mb-6">
            <h3 className="font-bold text-lg">Select Size</h3>
            <ul className="flex gap-2 items-center lg:mb-4">
              <li className="bg-green-600 border-1 border-neutral-400 rounded-full px-4 pt-2 text-neutral-50">
                39
              </li>
              <li className="border-1 border-neutral-400 rounded-full px-4 pt-2 text-neutral-600">
                40
              </li>
              <li className="border-1 border-neutral-400 rounded-full px-4 pt-2 text-neutral-600">
                40
              </li>
              <li className="border-1 border-neutral-400 rounded-full px-4 pt-2 text-neutral-600">
                42
              </li>
              <li className="border-1 border-neutral-400 rounded-full px-4 pt-2 text-neutral-600">
                43
              </li>
            </ul>
          </div>
          <div className="w-full flex justify-center py-4">
            {cart.some((item) => item.product.id === Number(productId)) ? (
              <div className="flex items-center bg-neutral-200 rounded-full p-1 gap-2">
                <button
                  className="text-green-600 text-2xl bg-neutral-50 rounded-full w-6 h-6 flex items-center justify-center"
                  onClick={() => handleDecrement(selectedProduct)}
                >
                  -
                </button>
                <p className="font-bold">
                  {
                    cart.find((item) => item.product.id === Number(productId))
                      ?.quanity
                  }
                </p>
                <button
                  className="text-neutral-50 text-2xl bg-green-600 rounded-full w-6 h-6 flex items-center justify-center"
                  onClick={() => handleInrement(selectedProduct)}
                >
                  +
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleAddToCart(selectedProduct)}
                className="bg-green-600 text-neutral-50 px-6 py-2 rounded-full"
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
      <div id="similar-products" className="hidden lg:block">
        <section className="mt-4 space-y-2 mb-4">
          <h1 className="font-bold flex justify-between">Similar Products</h1>
          <div
            id="cheapest-product"
            className="grid gap-4 lg:grid-cols-4 xl:grid-cols-6"
          >
            {products
              .filter((item) => item.category === selectedProduct.category)
              .slice(0, 4)
              .map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
          </div>
        </section>
      </div>
    </>
  );
}
