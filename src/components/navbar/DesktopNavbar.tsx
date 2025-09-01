import { Link, NavLink } from "react-router-dom";
import { ShoppingBag, Search, X } from "lucide-react";
import { gsap } from "gsap";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { useProductStore } from "../../hooks/useProductContext";
import type { INavbarSearch } from "./navbar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ThemeSwitch } from "../Utilities";

export default function DesktopNavbar({
  searchValue,
  searchResult,
  setSearchValue,
  setSearchResult,
}: INavbarSearch) {
  const cart = useProductStore((state) => state.cart);
  const products = useProductStore((state) => state.products);
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
    <div className="hidden lg:flex justify-between items-center">
      <div className="flex items-center">
        <Tooltip>
          <TooltipTrigger>
            <h1 className="font-logo text-2xl">
              <span className="text-green-600">Y</span>O
              <span className="text-green-600">F</span>I
            </h1>
          </TooltipTrigger>
          <TooltipContent>
            <a href="https://github.com/younesfouladi/" target="_blank">
              {" "}
              Created by Younes Fouladi
            </a>
          </TooltipContent>
        </Tooltip>

        <ul className="flex gap-8 rounded-full py-4 px-8 ">
          <li>
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive
                  ? "text-green-600 border-b-2 pb-1 font-bold border-green-800"
                  : ""
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"explore"}
              className={({ isActive }) =>
                isActive
                  ? "text-green-600 border-b-1 pb-1 font-bold border-green-800"
                  : ""
              }
            >
              Explore
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"wishlist"}
              className={({ isActive }) =>
                isActive
                  ? "text-green-600 border-b-1 pb-1 font-bold border-green-800"
                  : ""
              }
            >
              Wishlist
            </NavLink>
          </li>
        </ul>
      </div>
      <FlyoutMenu title={"Category"} categories={categories} />

      <div className="flex gap-4 items-center">
        <div
          className={"relative flex flex-col bg-neutral-50 dark:bg-gray-900"}
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
              className="pl-10 w-fit rounded-full p-2"
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
              searchResult.length > 0
                ? "2xl:grid absolute flex flex-col 2xl:grid-cols-2 gap-4 overflow-auto z-18 bg-neutral-50 border-1 border-neutral-300 p-4 rounded-2xl top-16 shadow-xl right-0 w-[30vw] max-h-[70vh] dark:bg-slate-800 dark:border-slate-600"
                : ""
            }
          >
            {searchResult.length > 0 &&
              searchResult.map((item) => (
                <Link key={item.id} to={`/product/${item.id}`}>
                  <div className="flex w-full items-center gap-4">
                    <div className="max-w-1/5 bg-neutral-200 rounded-2xl p-2 dark:bg-slate-700">
                      <img src={item.image} alt="product image" />
                    </div>
                    <p className="text-sm font-semibold">{item.title}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
        <NavLink
          to={"cart"}
          className={({ isActive }) =>
            isActive
              ? "text-green-600 border-b-1 pb-1 font-bold relative"
              : "relative"
          }
        >
          <ShoppingBag />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-700 text-neutral-50 text-sm rounded-full flex items-center justify-center w-5 h-5">
              {cart.length}
            </span>
          )}
        </NavLink>
        <ThemeSwitch />
      </div>
    </div>
  );
}

interface IFlyoutMent {
  title: string;
  categories: string[];
}

const FlyoutMenu = ({ title, categories }: IFlyoutMent) => {
  const catRef = useRef<HTMLUListElement | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      if (!catRef.current) return;
      gsap.killTweensOf(catRef.current);
      gsap.fromTo(
        catRef.current,
        { display: "flex", scaleY: 0 },
        { scaleY: 1, duration: 0.5 }
      );
    } else {
      if (!catRef.current) return;
      gsap.killTweensOf(catRef.current);
      gsap.fromTo(
        catRef.current,
        { scaleY: 1 },
        {
          scaleY: 0,
          duration: 0.5,
          onComplete: () => {
            if (catRef.current) catRef.current.style.display = "none";
          },
        }
      );
    }
  }, [open]);

  return (
    <div
      className="relative group flex w-full justify-center"
      role="listitem"
      onMouseLeave={() => setOpen(false)}
    >
      <a
        className="hover:text-green-600 py-4 px-4"
        onMouseEnter={() => setOpen(true)}
        href=""
      >
        {title}
      </a>
      <ul
        className="hidden absolute top-full left-[48%] flex-col gap-4 p-4 origin-top bg-green-600 text-neutral-50 rounded-xl z-10"
        ref={catRef}
      >
        <span className="absolute w-4 h-4 bg-green-600 rotate-45 -top-2"></span>
        {categories.map((item) => (
          <li key={item}>
            <Link to={" "}>{item}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
