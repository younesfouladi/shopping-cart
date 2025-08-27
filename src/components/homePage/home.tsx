import { useOutletContext } from "react-router-dom";
import { ImageSlider, LoadingSpinner } from "../Utilities";
import { ProductCard } from "../Utilities";
import type { IProductContext } from "../../App";

export default function HomePage() {
  const [products] = useOutletContext<IProductContext>();

  if (products.length === 0) {
    return <LoadingSpinner />;
  }
  const cheapest = [...products].sort((a, b) => a.price - b.price);
  const trending = products
    .filter((item) => item.rating.rate > 3)
    .sort((a, b) => b.rating.rate - a.rating.rate);

  return (
    <div id="home-container" className="pb-14">
      <ImageSlider
        imageUrls={[
          "/images/banners/banner-1.webp",
          "/images/banners/banner-2.webp",
          "/images/banners/banner-3.webp",
          "/images/banners/banner-4.webp",
          "/images/banners/banner-5.webp",
        ]}
      />
      <section className="space-y-2 mb-4">
        <h1 className="font-bold flex justify-between">
          Cheapest Products<button className="text-green-700">see all</button>
        </h1>
        <div
          id="cheapest-product"
          className="grid grid-cols-2 gap-4 lg:grid-cols-3 2xl:grid-cols-4"
        >
          {cheapest.slice(0, 4).map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
      <section className="space-y-2 mb-4">
        <h1 className="font-bold flex justify-between">
          Trending Products<button className="text-green-700">see all</button>
        </h1>
        <div
          id="cheapest-product"
          className="grid grid-cols-2 gap-4 lg:grid-cols-3 2xl:grid-cols-4"
        >
          {trending.slice(0, 4).map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
      <section className="space-y-2 mb-4">
        <h1 className="font-bold flex justify-between">
          Women Clothing<button className="text-green-700">see all</button>
        </h1>
        <div
          id="cheapest-product"
          className="grid grid-cols-2 gap-4 lg:grid-cols-3 2xl:grid-cols-4"
        >
          {products
            .filter((item) => item.category.includes("women's clothing"))
            .slice(0, 4)
            .map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
        </div>
      </section>
    </div>
  );
}
