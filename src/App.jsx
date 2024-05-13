import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layout/appLayout";
import Home from "./pages/home";
import Categories from "./pages/categories";
import Search from "./pages/search";
import Favorites from "./pages/favorites";
import GifProvider from "./context/gifContext";

import "./App.css";
import GifPage from "./pages/gif";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/:category",
        element: <Categories />,
      },
      { path: "/search/:query", element: <Search /> },
      { path: "/:type/:slug", element: <GifPage /> },
      { path: "/favorites", element: <Favorites /> },
    ],
  },
]);

export default function App() {
  return (
    <GifProvider>
      <RouterProvider router={router} />
    </GifProvider>
  );
}
