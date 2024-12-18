import React from "react";
import ReactDOM from "react-dom/client";
import Theme from "./index/ThemeProvider";
import { RouterProvider } from "react-router-dom";
import router from "./index/router";
import { ReferenceProvider } from "./context/ReferenceProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Theme>
        <ReferenceProvider>
            <RouterProvider router={router} />
        </ReferenceProvider>
    </Theme>,
);
