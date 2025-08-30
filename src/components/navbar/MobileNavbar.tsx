import { Link, NavLink } from "react-router-dom";
import {
  ShoppingBag,
  Menu,
  HeartPlus,
  Store,
  UserRoundPen,
  PackageSearch,
  X,
  Search,
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useProductContext } from "../../hooks/useProductContext";

export default function MobileNavbar() {
  const { cart } = useProductContext();

  return (
    <div className="lg:hidden">
      <div className="flex justify-between">
        <div>
          <FlyoutMenu icon={<Menu />} links={["Shoes", "Clothes", "Shirts"]} />
        </div>
        <h1 className="font-logo text-2xl">
          <span className="text-green-600">Y</span>O
          <span className="text-green-600">F</span>I
        </h1>
        <ul className="z-10 fixed flex gap-8 bottom-4 left-1/2 -translate-x-1/2 bg-neutral-900 rounded-full py-4 px-8 text-neutral-400">
          <li>
            <NavLink
              to={"/"}
              className={({ isActive }) => (isActive ? "text-green-600" : "")}
            >
              <Store />
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"explore"}
              className={({ isActive }) => (isActive ? "text-green-600" : "")}
            >
              <PackageSearch />
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"wishlist"}
              className={({ isActive }) => (isActive ? "text-green-600" : "")}
            >
              <HeartPlus />
            </NavLink>
          </li>
          <li className="relative">
            <NavLink
              to={"cart"}
              className={({ isActive }) => (isActive ? "text-green-600" : "")}
            >
              <ShoppingBag />
            </NavLink>
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-700 text-neutral-50 text-sm rounded-full flex items-center justify-center w-5 h-5">
                {cart.length}
              </span>
            )}
          </li>
        </ul>

        <div>
          <Link to={""}>
            <UserRoundPen />
          </Link>
        </div>
      </div>
      <label
        htmlFor="search"
        className="relative bg-neutral-200 rounded-full flex gap-2 my-4"
      >
        <Search className="absolute left-5 top-1/2 -translate-1/2" />
        <input
          type="text"
          name="search"
          id="search"
          placeholder="What are you looking for?"
          className="pl-10 w-full rounded-full p-2"
        />
      </label>
    </div>
  );
}

interface IFlyoutMent {
  icon: React.ReactNode;
  links: string[];
}

const FlyoutMenu = ({ icon, links }: IFlyoutMent) => {
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
        className="hidden fixed left-0 top-0 h-full w-2/3 flex-col gap-4 items-center justify-center z-10 p-4 origin-left bg-green-600 text-neutral-50"
        ref={catRef}
      >
        <X className="absolute top-4 right-4" onClick={() => setOpen(!open)} />
        {links.map((item) => (
          <li key={item}>
            <NavLink to={" "}>{item}</NavLink>
          </li>
        ))}
      </ul>
    </>
  );
};
