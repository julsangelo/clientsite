import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Product from "../pages/Product";
import Details from "../pages/Details";
import CheckOut from "../pages/CheckOut";

function hasAuthCookie() {
    return document.cookie.includes("is_auth=");
}

function ProtectedRoute({ element }) {
    return hasAuthCookie() ? element : <Navigate to="/" replace />;
}
let router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/shop", element: <Shop key="shop" /> },
    { path: "/about", element: <About /> },
    { path: "/contact", element: <Contact /> },
    { path: "/shop/:category", element: <Shop key="shop-category" /> },
    { path: "/shop/product/:productCode", element: <Product /> },
    { path: "/details", element: <ProtectedRoute element={<Details />} /> },
    { path: "/checkout", element: <ProtectedRoute element={<CheckOut />} /> },
]);

export default router;
