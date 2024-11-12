import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./reset.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";
const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter(
  [
    {
      path: "/react_shop",
      element: <App />,
      children: [
        {
          path: "/react_shop",
          element: <Home />,
        },
        {
          path: "/react_shop/favorites",
          element: <Favorites />,
        },
        {
          path: "/react_shop/orders",
          element: <Orders />,
        },
      ],
    },
  ],
  {
    basename: "/react_shop", // Устанавливаем базовый путь для GitHub Pages
  }
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
