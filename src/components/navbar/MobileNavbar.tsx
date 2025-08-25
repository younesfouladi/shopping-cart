import { Link, NavLink } from "react-router-dom";
import {
  ShoppingBag,
  Menu,
  HeartPlus,
  Store,
  UserRoundPen,
  PackageSearch,
} from "lucide-react";

export default function MobileNavbar() {
  return (
    <div className="flex justify-between lg:hidden">
      <div>
        <Menu />
        <ul className="hidden">
          <li>Shoes</li>
          <li>Clothes</li>
          <li>Shirts</li>
        </ul>
      </div>
      <h1 className="font-logo text-2xl">
        <span className="text-green-600">Y</span>O
        <span className="text-green-600">F</span>I
      </h1>
      <ul className="fixed flex gap-8 bottom-4 left-1/2 -translate-x-1/2 bg-neutral-900 rounded-full py-4 px-8 text-neutral-400">
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
        <li>
          <NavLink
            to={"cart"}
            className={({ isActive }) => (isActive ? "text-green-600" : "")}
          >
            <ShoppingBag />
          </NavLink>
        </li>
      </ul>

      <div>
        <Link to={""}>
          <UserRoundPen />
        </Link>
      </div>
    </div>
  );
}
