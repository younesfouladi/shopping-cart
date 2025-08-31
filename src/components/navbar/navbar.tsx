import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import type { IProduct } from "../../types/product";
import { useState } from "react";

export type INavbarSearch = {
  searchResult: IProduct[];
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  setSearchResult: React.Dispatch<React.SetStateAction<IProduct[]>>;
};

export default function Navbar() {
  const [searchResult, setSearchResult] = useState<IProduct[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <nav>
      <MobileNavbar
        searchResult={searchResult}
        setSearchResult={setSearchResult}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <DesktopNavbar
        searchResult={searchResult}
        setSearchResult={setSearchResult}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
    </nav>
  );
}
