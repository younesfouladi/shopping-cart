interface IHomePage {
  products: IProduct[];
}

interface IProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  price: string;
}

export default function HomePage({ products }: IHomePage) {
  if (products.length === 0) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        {products.map((item) => (
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
    </>
  );
}
