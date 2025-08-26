import { Star } from "lucide-react";
import { LoadingSpinner } from "../Utilities";

interface IHomePage {
  products: IProduct[];
}

interface IProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
}

export default function HomePage({ products }: IHomePage) {
  if (products.length === 0) {
    return <LoadingSpinner />;
  }
  const cheapest = [...products].sort((a, b) => a.price - b.price);
  const trending = products
    .filter((item) => item.rating.rate > 3)
    .sort((a, b) => b.rating.rate - a.rating.rate);

  return (
    <div id="home-container" className="pb-14">
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

function ProductCard({ product }: { product: IProduct }) {
  return (
    <div className="flex flex-col gap-2">
      <img
        src={product.image}
        alt="product's image"
        className="p-4 bg-neutral-200 rounded-2xl w-fit aspect-square object-contain"
      />
      <p
        title={product.title}
        className="whitespace-nowrap overflow-ellipsis overflow-hidden"
      >
        {product.title}
      </p>
      <div className="flex justify-between">
        <p className="font-bold">${product.price}</p>
        <span className="flex gap-1">
          <Star size={18} className="text-amber-600" /> {product.rating.rate}
        </span>
      </div>
    </div>
  );
}
