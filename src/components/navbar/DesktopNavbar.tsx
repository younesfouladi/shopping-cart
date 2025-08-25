import { Link, NavLink } from "react-router-dom";
import { ShoppingBag, UserRoundPen } from "lucide-react";
import { gsap } from "gsap";
import { useRef } from "react";

export default function DesktopNavbar() {
  const catRef = useRef<HTMLUListElement | null>(null);

  const showCats = () => {
    if (!catRef.current) return;
    gsap.killTweensOf(catRef.current);
    gsap.fromTo(
      catRef.current,
      { display: "flex", scaleY: 0 },
      { scaleY: 1, duration: 0.5 }
    );
  };

  const hideCats = () => {
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
  };

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
        className="group w-fit m-auto flex flex-col items-center justify-center cursor-pointer hover:w-full"
        role="listitem"
        onMouseLeave={hideCats}
      >
        <h3
          className="group-hover:text-green-600 hover:w-full text-center pb-4"
          onMouseEnter={showCats}
        >
          Category
        </h3>
        <ul
          className="hidden flex-col w-full gap-4 items-center pt-4 origin-top"
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
