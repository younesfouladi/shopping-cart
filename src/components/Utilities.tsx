import { Spinner } from "flowbite-react";
import { useEffect, useState } from "react";

export function LoadingSpinner() {
  return (
    <div className="fixed flex flex-col inset-0 bg-neutral-50 items-center justify-center">
      <Spinner aria-label="Loading Spinner" />
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
