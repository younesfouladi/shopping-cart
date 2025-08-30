import { ProductCard } from "../Utilities";
import { LoadingSpinner } from "../Utilities";
import { useProductContext } from "../../hooks/useProductContext";

export default function WishList() {
  const { products, wishList } = useProductContext();

  if (products.length === 0) {
    return <LoadingSpinner />;
  }

  if (wishList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-30">
        <p className="font-bold text-2xl font-logo">WishList is empty!</p>
        <img
          src="/images/sad-dog.svg"
          alt="sad dog cause of empty wish list"
          className="w-9/10 sm:max-w-2/3 md:max-w-1/2 2xl:max-w-2/6 h-auto"
        />
      </div>
    );
  }

  return (
    <div id="explore-container" className="pb-14">
      <section className="space-y-2 mb-4">
        <h1 className="font-bold text-center">All Products</h1>
        <div
          id="all-products"
          className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5"
        >
          {wishList.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
