import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Product from "../pages/Product";
import Cart from "../pages/Cart";

let router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/shop",
        element: <Shop />,
    },
    {
        path: "/about",
        element: <About />,
    },
    {
        path: "/contact",
        element: <Contact />,
    },
    {
        path: "/shop/:category",
        element: <Shop />,
    },
    {
        path: "/shop/product/:productCode",
        element: <Product />,
    },
    {
        path: "/cart",
        element: <Cart />,
    },
]);

export default router;
