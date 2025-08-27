import { Link, NavLink } from "react-router-dom";
import { ShoppingBag, UserRoundPen, Search } from "lucide-react";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";

export default function DesktopNavbar() {
  return (
    <div className="hidden lg:flex justify-between items-center">
      <div className="flex items-center">
        <h1 className="font-logo text-2xl">
          <span className="text-green-600">Y</span>O
          <span className="text-green-600">F</span>I
        </h1>
        <ul className="flex gap-8 rounded-full py-4 px-8 ">
          <li>
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive ? "text-green-600 border-b-2 pb-1 font-bold" : ""
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"explore"}
              className={({ isActive }) =>
                isActive ? "text-green-600 border-b-1 pb-1 font-bold" : ""
              }
            >
              Explore
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"wishlist"}
              className={({ isActive }) =>
                isActive ? "text-green-600 border-b-1 pb-1 font-bold" : ""
              }
            >
              Wishlist
            </NavLink>
          </li>
        </ul>
      </div>
      <FlyoutMenu title={"Category"} links={["Shoes", "Clothes", "Shirts"]} />

      <div className="flex gap-4 items-center">
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
        <NavLink
          to={"cart"}
          className={({ isActive }) =>
            isActive ? "text-green-600 border-b-1 pb-1 font-bold" : ""
          }
        >
          <ShoppingBag />
        </NavLink>
        <Link to={""} className="border-l-2 pl-4">
          <UserRoundPen />
        </Link>
      </div>
    </div>
  );
}

interface IFlyoutMent {
  title: string;
  links: string[];
}

const FlyoutMenu = ({ title, links }: IFlyoutMent) => {
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
      className="relative group w-fit m-auto flex flex-col"
      role="listitem"
      onMouseLeave={() => setOpen(false)}
    >
      <a
        className="group-hover:text-green-600 hover:w-full text-center py-4 px-4"
        onMouseEnter={() => setOpen(true)}
        href=""
      >
        {title}
      </a>
      <ul
        className="hidden absolute top-full left-1 flex-col gap-4 items-center p-4 origin-top bg-green-600 text-neutral-50 rounded-xl z-10"
        ref={catRef}
      >
        <span className="absolute w-4 h-4 bg-green-600 rotate-45 -top-2"></span>
        {links.map((item) => (
          <li key={item}>
            <NavLink to={" "}>{item}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
