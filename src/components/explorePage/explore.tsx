import { useOutletContext } from "react-router-dom";
import { ProductCard } from "../Utilities";
import type { IProductContext } from "../../App";

export default function ExplorePage() {
  const [products] = useOutletContext<IProductContext>();
  console.log(products);
  return (
    <div id="explore-container" className="pb-14">
      <section className="space-y-2 mb-4">
        <h1 className="font-bold flex justify-between">
          All Products<button className="text-green-700">see all</button>
        </h1>
        <div
          id="all-products"
          className="grid grid-cols-2 gap-4 lg:grid-cols-3 2xl:grid-cols-4"
        >
          {products.slice(0, 4).map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
