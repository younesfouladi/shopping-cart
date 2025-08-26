import { Star } from "lucide-react";

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
    return <h1>Loading...</h1>;
  }
  const cheapest = [...products].sort((a, b) => a.price - b.price);
  const trending = products
    .filter((item) => item.rating.rate > 3)
    .sort((a, b) => b.rating.rate - a.rating.rate);

  return (
    <div id="home-container" className="pb-20">
      <section className="space-y-2">
        <h1 className="font-bold">Cheapest Products</h1>
        <div id="cheapest-product" className="grid grid-cols-2 gap-4">
          {cheapest.slice(0, 4).map((item) => (
            <div key={item.id} className="flex flex-col gap-2">
              <img
                src={item.image}
                alt="product's image"
                className="p-4 bg-neutral-200 rounded-2xl w-fit aspect-square object-contain"
              />
              <p
                title={item.title}
                className="whitespace-nowrap overflow-ellipsis overflow-hidden"
              >
                {item.title}
              </p>
              <p className="font-bold">${item.price}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="space-y-2">
        <h1 className="font-bold">Trending Products</h1>
        <div id="cheapest-product" className="grid grid-cols-2 gap-4">
          {trending.slice(0, 4).map((item) => (
            <div key={item.id} className="flex flex-col gap-2">
              <img
                src={item.image}
                alt="product's image"
                className="p-4 bg-neutral-200 rounded-2xl w-fit aspect-square object-contain"
              />
              <p
                title={item.title}
                className="whitespace-nowrap overflow-ellipsis overflow-hidden"
              >
                {item.title}
              </p>
              <div className="flex justify-between">
                <p className="font-bold">${item.price}</p>
                <span className="flex gap-1">
                  <Star size={18} className="text-amber-600" />{" "}
                  {item.rating.rate}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
