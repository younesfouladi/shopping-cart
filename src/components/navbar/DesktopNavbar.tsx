import { Link, NavLink } from "react-router-dom";
import { ShoppingBag, UserRoundPen } from "lucide-react";
// import { gsap } from "gsap";
// import { useGSAP } from "@gsap/react";
import { useRef } from "react";

export default function DesktopNavbar() {
  const catRef = useRef(null);

  return (
    <div className="hidden lg:flex flex-col">
      <div className="flex justify-between items-center">
        <h1 className="font-logo text-2xl">
          <span className="text-green-600">Y</span>O
          <span className="text-green-600">F</span>I
        </h1>
        <div className="flex items-center">
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

        <div className="flex gap-4 items-center">
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
      <div
        className="group flex flex-col items-center justify-center cursor-pointer"
        role="listitem"
      >
        <p className="hover:w-full text-center pb-4 peer">Category</p>
        <ul
          className="hidden border-t-1 hover:flex peer-hover:flex flex-col w-full gap-4 items-center pt-4"
          ref={catRef}
        >
          <li>Shoes</li>
          <li>Clothes</li>
          <li>Shirts</li>
        </ul>
      </div>
    </div>
  );
}
