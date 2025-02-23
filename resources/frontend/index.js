import React from "react";
import ReactDOM from "react-dom/client";
import Theme from "./index/ThemeProvider";
import { RouterProvider } from "react-router-dom";
import router from "./index/router";
import { ReferenceProvider } from "./context/ReferenceProvider";
import { FlashMessage } from "./context/FlashMessage";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Theme>
        <FlashMessage>
            <ReferenceProvider>
                <AuthProvider>
                    <RouterProvider router={router} />
                </AuthProvider>
            </ReferenceProvider>
        </FlashMessage>
    </Theme>,
);
