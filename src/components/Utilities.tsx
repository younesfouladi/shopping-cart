import { Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import type { IProduct } from "../types/product";
import { Link } from "react-router-dom";

export function LoadingSpinner() {
  return (
    <div className="fixed flex flex-col inset-0 bg-neutral-50 items-center justify-center">
      <Spinner aria-label="Loading Spinner" />
    </div>
  );
}

export function ProductCard({
  product,
  wishList,
  setWishList,
}: {
  product: IProduct;
  wishList: IProduct[];
  setWishList: React.Dispatch<React.SetStateAction<IProduct[]>>;
}) {
  const isFavorite = wishList?.some((item) => item.id === product.id) || false;
  const toggleFavorite = () => {
    setWishList((prev) => {
      if (isFavorite) {
        return prev.filter((item) => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  function handleOpenLinkNewTab(
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) {
    console.log(window.screen.width);
    if (window.screen.width >= 1024) {
      e.preventDefault();
      window.open(`/product/${product.id}`, "_blank");
    }
  }

  return (
    <div className="relative flex flex-col gap-2 bg-neutral-100 border-1 border-neutral-200 rounded-2xl p-4">
      <button
        onClick={toggleFavorite}
        className="absolute cursor-pointer top-3 right-3 bg-neutral-200 rounded-full p-1 flex"
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
      <Link
        to={`/product/${product.id}`}
        onClick={(e) => handleOpenLinkNewTab(e)}
      >
        <img
          src={product.image}
          alt="product's image"
          className="p-4 w-fit aspect-square object-contain"
        />
      </Link>
      <p
        title={product.title}
        className="whitespace-nowrap overflow-ellipsis overflow-hidden"
      >
        {product.title}
      </p>
      <div className="flex items-center justify-between">
        <p className="font-bold">${product.price}</p>
        <button className="gap-1 bg-green-700 text-neutral-50 px-4 py-1 rounded-lg">
          Add
        </button>
      </div>
    </div>
  );
}

export function ImageSlider({ imageUrls }: { imageUrls: string[] }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        return prev >= imageUrls.length - 1 ? 0 : prev + 1;
      });
    }, 3000);
    return () => {
      clearInterval(timer);
    };
  }, [imageUrls.length]);

  return (
    <div
      id="home-banner"
      className="mb-4 w-full overflow-hidden rounded-xl lg:w-2/3 mx-auto"
    >
      <div
        id="slider-container"
        className="w-full relative flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${count * 100}%)` }}
      >
        {imageUrls.map((image, index) => (
          <img
            src={image}
            alt="site banner"
            className="rounded-xl w-full shrink-0"
            key={index}
          />
        ))}
      </div>
    </div>
  );
}
