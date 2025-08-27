import { useOutletContext } from "react-router-dom";
import { ProductCard } from "../Utilities";
import type { IProductContext } from "../../App";
import { LoadingSpinner } from "../Utilities";

export default function ExplorePage() {
  const [products, wishList, setWishList] = useOutletContext<IProductContext>();

  if (products.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <div id="explore-container" className="pb-14">
      <section className="space-y-2 mb-4">
        <h1 className="font-bold text-center">All Products</h1>
        <div
          id="all-products"
          className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5"
        >
          {products.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
              wishList={wishList}
              setWishList={setWishList}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
