import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, CssBaseline } from "@mui/material/styles";
import theme from "./theme/index";
import Home from "./pages/Home";

ReactDOM.createRoot(document.getElementById("root")).render(
    // <ThemeProvider theme={theme}>
    // <CssBaseline />
    <Home />,
    {
        /* </ThemeProvider>, */
    },
);
