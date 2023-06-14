import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import Products from "./Product";
import AddProduct from "./AddProduct";
import Category from "./Category";
import AddCategory from "./AddCategory";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Navigate to="/products" />,
      },
      {
        path: "/category",
        element: <Category />,
      },
      {
        path: "/addCategory",
        element: <AddCategory />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/addProducts",
        element: <AddProduct />,
      },
    ],
  },
]);

export default router;
