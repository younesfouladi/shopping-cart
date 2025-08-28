import App from "../App";
import ExplorePage from "../components/explorePage/explore";
import HomePage from "../components/homePage/home";
import PorductDetails from "../components/productDetails/productDetails";
import WishList from "../components/wishList/wishList";
import ErrorElement from "./ErrorElement";

const routes = [
  {
    path: "*",
    element: <ErrorElement />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      { path: "explore", element: <ExplorePage /> },
      { index: true, element: <HomePage /> },
      { path: "wishList", element: <WishList /> },
      {
        path: "product/:productId",
        element: <PorductDetails />,
      },
    ],
  },
];

export default routes;
