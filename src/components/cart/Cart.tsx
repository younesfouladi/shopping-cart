import { useProductContext } from "../../hooks/useProductContext";
import { Link } from "react-router-dom";
import { ChevronLeft, EllipsisVertical } from "lucide-react";
import { useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";
import type { ICart } from "../../types/product";
import { Spinner } from "flowbite-react";

export default function Cart() {
  const { cart, setCart } = useProductContext();
  const cartRef = useRef(null);
  const deliveryFee: number = 15;
  const [isProcessing, setIsProcessing] = useState([false, false]);
  const toastRef = useRef(null);

  useLayoutEffect(() => {
    if (!cartRef.current) return;
    gsap.fromTo(cartRef.current, { scale: 0 }, { scale: 1, duration: 0.5 });
  }, []);

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

  function handleCheckout() {
    setIsProcessing(() => [true, false]);
    setTimeout(() => {
      setIsProcessing(() => [false, true]);
      setTimeout(() => {
        setIsProcessing(() => [false, false]);
        setCart([]);
        gsap.fromTo(
          cartRef.current,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5 }
        );
      }, 2000);
    }, 2000);
  }

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-30 gap-10">
        <p className="font-bold text-2xl font-logo">Shopping Cart is empty!</p>
        <img
          src="/images/sad-dog2.svg"
          alt="sad dog cause of empty wish list"
          className="w-9/10 sm:max-w-2/3 md:max-w-1/2 2xl:max-w-2/6 h-auto"
        />
      </div>
    );
  }

  return (
    <div
      className="fixed w-full h-full bg-neutral-50 py-2 inset-0 z-20 flex flex-col lg:static lg:grid grid-cols-3 2xl:max-w-[80vw] 2xl:mx-auto"
      ref={cartRef}
    >
      <div
        id="product-card-nav"
        className="w-full flex justify-between py-6 items-center px-4 lg:hidden"
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
      <div className="flex flex-col gap-4 overflow-auto px-4 flex-1 lg:col-span-2 xl:max-w-3/4">
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
      <div className="flex flex-col py-4 px-4 gap-4 shadow-[0_-4px_10px_rgba(0,0,0,0.2)] rounded-2xl lg:h-fit lg:shadow-none lg:border-l-2 lg:rounded-none lg:border-neutral-400 lg:mt-20">
        <div className="border-b-1 border-neutral-400 border-dashed flex flex-col gap-1 pb-4">
          <div className="flex w-full justify-between">
            <h4 className="font-semibold">Sub Total</h4>
            <p className="font-semibold">
              $
              {cart
                .reduce((acc, item) => acc + item.product.price, 0)
                .toFixed(2)}
            </p>
          </div>
          <div className="flex w-full justify-between">
            <h4 className="font-semibold">Delivery Fee</h4>
            <p className="font-semibold">${deliveryFee}</p>
          </div>
          <div className="flex w-full justify-between">
            <h4>Discount</h4>
            <p className="font-semibold text-green-600">$0</p>
          </div>
        </div>
        <div className="flex w-full items-center justify-between">
          <h4 className="font-semibold">Total</h4>
          <h3 className="font-bold text-xl">
            $
            {(
              cart.reduce((acc, item) => acc + item.product.price, 0) +
              deliveryFee
            ).toFixed(2)}
          </h3>
        </div>
        {!isProcessing[0] ? (
          <button
            className="bg-green-600 text-neutral-50 rounded-full py-2"
            onClick={handleCheckout}
          >
            Checkout
          </button>
        ) : (
          <button className="bg-neutral-400 text-neutral-50 rounded-full py-2">
            <Spinner size="sm" className="mr-2" />
          </button>
        )}
      </div>
      {isProcessing[1] && (
        <div
          id="toast-success"
          className="flex fixed top-6 right-6 items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow-sm dark:text-gray-400 dark:bg-gray-800"
          role="alert"
          ref={toastRef}
        >
          <div className="inline-flex items-center justify-center shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span className="sr-only">Check icon</span>
          </div>
          <div className="ms-3 text-sm font-normal">
            Checkout Completed successfully.
          </div>
          <button
            type="button"
            className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            data-dismiss-target="#toast-success"
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
