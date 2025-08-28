import { NavLink } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
// import { useParams } from "react-router-dom";

export default function PorductDetails() {
  // const { productId } = useParams();

  return (
    <div id="product-card">
      <div>
        <div id="product-card-nav">
          <NavLink to="#" onClick={() => history.back()}>
            <ChevronLeft />
          </NavLink>
          <h1>Product Details</h1>
          <button></button>
        </div>
      </div>
    </div>
  );
}
