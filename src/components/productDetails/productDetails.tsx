import { NavLink } from "react-router-dom";
import { ChevronLeft, EllipsisVertical } from "lucide-react";
import { useParams } from "react-router-dom";
import { useProductContext } from "../../hooks/useProductContext";

export default function PorductDetails() {
  const { productId } = useParams();
  const { products, wishList, setWishList } = useProductContext();
  const selectedProduct = products.filter(
    (item) => item.id === Number(productId)
  )[0];

  return (
    <div
      id="product-card"
      className="fixed w-full h-full z-20 inset-0 bg-neutral-50 p-2 flex flex-col"
    >
      <div className="flex flex-col gap-8 px-4 py-8 bg-neutral-200 rounded-4xl items-center">
        <div id="product-card-nav" className="w-full flex justify-between">
          <NavLink to="#" onClick={() => history.back()}>
            <ChevronLeft />
          </NavLink>
          <h1>Product Details</h1>
          <button>
            <EllipsisVertical />
          </button>
        </div>
        <div>
          <img
            src={selectedProduct.image}
            alt="product image"
            className="max-h-80"
          />
        </div>
      </div>
      <div className="px-4 py-6 flex flex-col gap-4 border-b-1 border-neutral-300">
        <h3 className="text-lg">{selectedProduct.title}</h3>
        <h3 className="font-bold text-2xl">${selectedProduct.price}</h3>
        <div className="flex items-center justify-center gap-1 border-1 border-neutral-200 bg-neutral-100 rounded-full max-w-fit py-1 px-2">
          <p className="font-semibold">⭐ {selectedProduct.rating.rate}</p>
          <p className="text-sm">({selectedProduct.rating.count} Reviews)</p>
        </div>
      </div>
    </div>
  );
}
