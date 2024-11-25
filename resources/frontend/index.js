import React from "react";
import ReactDOM from "react-dom/client";
import Theme from "./index/ThemeProvider";
import { RouterProvider } from "react-router-dom";
import router from "./index/router";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Theme>
            <RouterProvider router={router} />
        </Theme>
    </React.StrictMode>,
);
