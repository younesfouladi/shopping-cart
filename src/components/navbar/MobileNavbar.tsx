import { Link, NavLink } from "react-router-dom";
import {
  ShoppingBag,
  Menu,
  HeartPlus,
  Store,
  PackageSearch,
  X,
  Search,
} from "lucide-react";
import React, { useState, useEffect, useRef, type ChangeEvent } from "react";
import { gsap } from "gsap";
import { useProductContext } from "../../hooks/useProductContext";
import { motion, AnimatePresence } from "motion/react";
import type { INavbarSearch } from "./navbar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ThemeSwitch } from "../Utilities";

export default function MobileNavbar({
  searchValue,
  searchResult,
  setSearchValue,
  setSearchResult,
}: INavbarSearch) {
  const { products } = useProductContext();
  const categories = [...new Set(products.map((item) => item.category))];

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim() === "") {
      setSearchResult([]);
      setSearchValue(e.target.value.trimStart());
      return;
    }
    setSearchValue(e.target.value);
    const result = products.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setSearchResult(result);
  };

  return (
    <div className="lg:hidden">
      <div className="flex justify-between">
        <div>
          <FlyoutMenu icon={<Menu />} categories={categories} />
        </div>
        <Tooltip>
          <TooltipTrigger>
            <h1 className="font-logo text-2xl">
              <span className="text-green-600">Y</span>O
              <span className="text-green-600">F</span>I
            </h1>
          </TooltipTrigger>
          <TooltipContent>
            <a href="https://github.com/younesfouladi/" target="_blank">
              Created by Younes Fouladi
            </a>
          </TooltipContent>
        </Tooltip>
        <AnimatedNav />

        <div>
          <ThemeSwitch />
        </div>
      </div>
      <div
        className={
          searchResult.length > 0
            ? "fixed inset-0 w-full h-full z-18 flex flex-col bg-neutral-50 p-6 dark:bg-gray-900"
            : ""
        }
      >
        <label
          htmlFor="search"
          className="relative bg-neutral-200 rounded-full flex gap-2 my-4 dark:bg-slate-800"
        >
          <Search className="absolute left-5 top-1/2 -translate-1/2" />
          <input
            type="text"
            name="search"
            id="search"
            value={searchValue}
            onChange={(e) => handleSearch(e)}
            placeholder="What are you looking for?"
            className="pl-10 w-full rounded-full p-2"
          />
          <button
            className={
              searchValue
                ? "absolute right-0 top-1/2 -translate-1/2 cursor-pointer"
                : "hidden"
            }
            onClick={() => {
              setSearchValue("");
              setSearchResult([]);
            }}
          >
            <X />
          </button>
        </label>
        <div
          id="search-result"
          className={
            searchResult.length > 0 ? "flex flex-col gap-4 overflow-auto" : ""
          }
        >
          {searchResult.length > 0 &&
            searchResult.map((item) => (
              <Link key={item.id} to={`/product/${item.id}`}>
                <div className="flex w-full items-center gap-4">
                  <div className="max-w-1/5 bg-neutral-200 rounded-2xl p-2 dark:bg-slate-950">
                    <img src={item.image} alt="product image" />
                  </div>
                  <p className="text-sm font-semibold">{item.title}</p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

interface IFlyoutMent {
  icon: React.ReactNode;
  categories: string[];
}

const FlyoutMenu = ({ icon, categories }: IFlyoutMent) => {
  const catRef = useRef<HTMLUListElement | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      window.addEventListener("click", (e) => {
        if (e.target !== catRef.current) {
          setOpen(false);
        }
      });
      if (!catRef.current) return;
      gsap.killTweensOf(catRef.current);
      gsap.fromTo(
        catRef.current,
        { display: "flex", scaleX: 0 },
        { scaleX: 1, duration: 0.5 }
      );
    } else {
      if (!catRef.current) return;
      gsap.killTweensOf(catRef.current);
      gsap.fromTo(
        catRef.current,
        { scaleX: 1 },
        {
          scaleX: 0,
          duration: 0.5,
          onComplete: () => {
            if (catRef.current) catRef.current.style.display = "none";
          },
        }
      );
    }
  }, [open]);

  return (
    <>
      <button
        className="group-hover:text-green-600 hover:w-full text-center"
        onClick={(e) => {
          setOpen(!open);
          e.stopPropagation();
        }}
      >
        {icon}
      </button>
      <ul
        className="hidden fixed left-0 top-0 h-full w-2/3 flex-col gap-4 items-center justify-center z-15 p-4 origin-left bg-green-600 text-neutral-50"
        ref={catRef}
      >
        <X className="absolute top-4 right-4" onClick={() => setOpen(!open)} />
        {categories.map((item) => (
          <li key={item}>
            <Link to={" "}>{item}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export function AnimatedNav() {
  const { cart } = useProductContext();

  const items = [
    { to: "/", label: "Home", Icon: Store },
    { to: "explore", label: "Explore", Icon: PackageSearch },
    { to: "wishlist", label: "Wishlist", Icon: HeartPlus },
    { to: "cart", label: "Cart", Icon: ShoppingBag, badge: true },
  ];

  return (
    <ul className="z-10 fixed flex gap-6 bottom-4 left-1/2 -translate-x-1/2 bg-neutral-900 rounded-full px-4 text-neutral-400 items-center p-2">
      {items.map((it) => (
        <li key={it.to} className="relative">
          <NavLink to={it.to}>
            {({ isActive }) => (
              <div className="relative flex items-center">
                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      layoutId="active-pill"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                      className="absolute inset-0 rounded-full bg-green-600"
                    />
                  )}
                </AnimatePresence>

                <motion.div
                  className="relative z-10 flex gap-2 items-center rounded-full p-2 group"
                  animate={{ scale: isActive ? 1.06 : 1 }}
                  whileHover={{ scale: 1.08 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <it.Icon
                    className={isActive ? "w-5 h-5 text-neutral-50" : "w-5 h-5"}
                  />

                  <motion.p
                    className={
                      isActive ? "text-neutral-50" : "group-last:hidden"
                    }
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.12 }}
                  >
                    {it.label}
                  </motion.p>
                </motion.div>
              </div>
            )}
          </NavLink>

          {it.to === "cart" && (
            <AnimatePresence>
              {cart.length > 0 && (
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 700, damping: 30 }}
                  className="absolute -top-1 -right-1 bg-red-700 text-neutral-50 text-sm rounded-full flex items-center justify-center w-5 h-5 z-20"
                >
                  {cart.length}
                </motion.span>
              )}
            </AnimatePresence>
          )}
        </li>
      ))}
    </ul>
  );
}
