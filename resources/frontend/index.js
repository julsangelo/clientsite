import React from "react";
import ReactDOM from "react-dom/client";

import Home from "./pages/Home";
import Theme from "./index/ThemeProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Theme>
        <Home />
    </Theme>,
);
