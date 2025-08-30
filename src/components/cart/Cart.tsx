import { useProductContext } from "../../hooks/useProductContext";
import { Link } from "react-router-dom";
import { ChevronLeft, EllipsisVertical } from "lucide-react";
import { useRef } from "react";
import gsap from "gsap";
import type { ICart } from "../../types/product";

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

  function handleInrement(pr: ICart) {
    const product = pr.product;
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === product.id
          ? { ...item, quanity: item.quanity + 1 }
          : item
      )
    );
  }

  function handleDecrement(pr: ICart) {
    const product = pr.product;
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

  return (
    <div
      className="fixed w-full h-full bg-neutral-50 py-2 px-4 inset-0 z-20"
      ref={cartRef}
    >
      <div
        id="product-card-nav"
        className="w-full flex justify-between py-8 items-center"
      >
        <Link
          to="#"
          onClick={handleBack}
          className="bg-neutral-200 rounded-full p-2"
        >
          <ChevronLeft />
        </Link>
        <h1>Shopping Cart</h1>
        <button className="bg-neutral-200 rounded-full p-2">
          <EllipsisVertical />
        </button>
      </div>
      <div className="flex flex-col gap-4">
        {cart.map((item) => (
          <div key={item.product.id} className="flex gap-4">
            <div className="max-w-32 max-h-32 bg-neutral-200 rounded-2xl p-4 flex items-center justify-center">
              <img src={item.product.image} alt="product image" />
            </div>
            <div className="py-4 space-y-4 w-full">
              <p className="text-neutral-600 text-sm">{item.product.title}</p>
              <div className="flex items-center justify-between">
                <p className="font-bold text-xl">${item.product.price}</p>
                <div className="flex items-center bg-neutral-200 rounded-full p-1 gap-4">
                  <button
                    className="text-green-600 text-3xl bg-neutral-50 rounded-full w-7 h-7 flex items-center justify-center"
                    onClick={() => handleDecrement(item)}
                  >
                    -
                  </button>
                  <p className="font-bold text-lg">{item.quanity}</p>
                  <button
                    className="text-neutral-50 text-3xl bg-green-600 rounded-full w-7 h-7 flex items-center justify-center"
                    onClick={() => handleInrement(item)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
