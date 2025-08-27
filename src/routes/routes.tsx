import App from "../App";
import ExplorePage from "../components/explorePage/explore";
import HomePage from "../components/homePage/home";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "explore", element: <ExplorePage /> },
      { path: "/", element: <HomePage /> },
    ],
  },
];

export default routes;
