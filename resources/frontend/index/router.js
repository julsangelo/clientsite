import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Product from "../pages/Product";
import Details from "../pages/Details";
import CheckOut from "../pages/CheckOut";

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
        path: "/details",
        element: <Details />,
    },
    {
        path: "/checkout",
        element: <CheckOut />,
    },
]);

export default router;
