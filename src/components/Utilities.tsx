import { Spinner } from "flowbite-react";
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

export function LoadingSpinner() {
  return (
    <div className="fixed flex flex-col inset-0 bg-neutral-50 items-center justify-center">
      <Spinner aria-label="Loading Spinner" />
    </div>
  );
}

export function ProductCard({ product }: { product: IProduct }) {
  return (
    <div className="flex flex-col gap-2 bg-neutral-100 border-1 border-neutral-200 rounded-2xl p-4">
      <img
        src={product.image}
        alt="product's image"
        className="p-4 w-fit aspect-square object-contain"
      />
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
  const translateX = `-translate-x-${count}/1`;
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
        className={translateX + " w-full relative flex transition-all"}
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
