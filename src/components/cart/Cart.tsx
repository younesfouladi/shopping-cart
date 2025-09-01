import { useProductStore } from "../../hooks/useProductContext";
import { Link } from "react-router-dom";
import { ChevronLeft, EllipsisVertical } from "lucide-react";
import { useRef, useState, useLayoutEffect, useMemo } from "react";
import gsap from "gsap";
import { Spinner } from "flowbite-react";
import { Toaster, toast } from "sonner";

export default function Cart() {
  const cart = useProductStore((state) => state.cart);
  const handleIncrement = useProductStore((state) => state.handleIncrement);
  const handleDecrement = useProductStore((state) => state.handleDecrement);
  const setCart = useProductStore((state) => state.setCart);
  const cartRef = useRef(null);
  const deliveryFee: number = 15;
  const [isProcessing, setIsProcessing] = useState(false);

  const totalPrice = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.product.price, 0);
  }, [cart]);

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

  function handleCheckout() {
    const myPromise = new Promise<{ name: string }>((resolve) => {
      setTimeout(() => {
        resolve({ name: "Checkout" });
      }, 3000);
    });

    toast.promise(myPromise, {
      loading: "Loading...",
      position: "top-right",
      success: (data: { name: string }) => {
        return {
          message: `${data.name} completed successfully`,
          description: "Check Your Orders History",
        };
      },
      error: "Error",
    });

    setIsProcessing(() => true);
    setTimeout(() => {
      setTimeout(() => {
        setIsProcessing(() => false);
        setCart([]);
        gsap.fromTo(
          cartRef.current,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5 }
        );
      }, 2000);
    }, 3000);
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
      className="fixed w-full h-full bg-neutral-50 py-2 inset-0 z-20 flex flex-col lg:static lg:grid grid-cols-3 2xl:max-w-[80vw] 2xl:mx-auto dark:bg-gray-900"
      ref={cartRef}
    >
      <div
        id="product-card-nav"
        className="w-full flex justify-between py-6 items-center px-4 lg:hidden"
      >
        <Link
          to="#"
          onClick={handleBack}
          className="bg-neutral-200 rounded-full p-2 dark:bg-slate-800"
        >
          <ChevronLeft />
        </Link>
        <h1>Shopping Cart</h1>
        <button className="bg-neutral-200 rounded-full p-2 dark:bg-slate-800">
          <EllipsisVertical />
        </button>
      </div>
      <div className="flex flex-col gap-4 overflow-auto px-4 flex-1 lg:col-span-2 xl:max-w-3/4">
        {cart.map((item) => (
          <div key={item.product.id} className="flex gap-4">
            <div className="max-w-32 max-h-32 bg-neutral-200 rounded-2xl p-4 flex items-center justify-center dark:bg-slate-800">
              <img src={item.product.image} alt="product image" />
            </div>
            <div className="py-4 space-y-4 w-full">
              <p className="text-neutral-600 text-sm">{item.product.title}</p>
              <div className="flex items-center justify-between">
                <p className="font-bold text-xl">${item.product.price}</p>
                <div className="flex items-center bg-neutral-200 rounded-full p-1 gap-4 dark:bg-slate-800">
                  <button
                    className="text-green-600 text-3xl bg-neutral-50 rounded-full w-7 h-7 flex items-center justify-center dark:bg-slate-600 dark:text-slate-50"
                    onClick={() => handleDecrement(item.product)}
                  >
                    -
                  </button>
                  <p className="font-bold text-lg">{item.quanity}</p>
                  <button
                    className="text-neutral-50 text-3xl bg-green-600 rounded-full w-7 h-7 flex items-center justify-center"
                    onClick={() => handleIncrement(item.product)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col py-4 px-4 gap-4 shadow-[0_-4px_10px_rgba(0,0,0,0.2)] rounded-2xl lg:h-fit lg:shadow-none lg:border-l-2 lg:rounded-none lg:border-neutral-400 lg:mt-20 dark:shadow-none dark:border-t-2 lg:dark:border-t-0">
        <div className="border-b-1 border-neutral-400 border-dashed flex flex-col gap-1 pb-4">
          <div className="flex w-full justify-between">
            <h4 className="font-semibold">Sub Total</h4>
            <p className="font-semibold">${totalPrice}</p>
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
          <h3 className="font-bold text-xl">${totalPrice + deliveryFee}</h3>
        </div>
        {!isProcessing ? (
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
      <Toaster richColors />
    </div>
  );
}
