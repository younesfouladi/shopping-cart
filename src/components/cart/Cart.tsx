import { useProductContext } from "../../hooks/useProductContext";
import { Link } from "react-router-dom";
import { ChevronLeft, EllipsisVertical } from "lucide-react";
import { useRef } from "react";
import gsap from "gsap";

export default function Cart() {
  const { cart, setCart } = useProductContext();
  const cartRef = useRef(null);

  const handleBack = () => {
    gsap.fromTo(
      cartRef.current,
      { scale: 1, opacity: 1 },
      { scale: 0, opacity: 0, duration: 0.5, onComplete: () => history.back() }
    );
  };

  return (
    <div
      className="fixed w-full h-full bg-neutral-50 p-2 inset-0 z-20"
      ref={cartRef}
    >
      <div
        id="product-card-nav"
        className="w-full flex justify-between px-4 py-8 items-center"
      >
        <Link
          to="#"
          onClick={handleBack}
          className="bg-neutral-200 rounded-full p-2"
        >
          <ChevronLeft />
        </Link>
        <h1>Product Details</h1>
        <button className="bg-neutral-200 rounded-full p-2">
          <EllipsisVertical />
        </button>
      </div>
    </div>
  );
}
