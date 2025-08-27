import App from "../App";
import ExplorePage from "../components/explorePage/explore";
import HomePage from "../components/homePage/home";
import WishList from "../components/wishList/wishList";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "explore", element: <ExplorePage /> },
      { index: true, element: <HomePage /> },
      { path: "wishList", element: <WishList /> },
    ],
  },
];

export default routes;
