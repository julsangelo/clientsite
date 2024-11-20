import React from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const theme = createTheme({
    typography: {
        fontFamily: "'Manrope', sans-serif",
    },
    components: {
        MuiTab: {
            styleOverrides: {
                root: {
                    fontFamily: "'Manrope', sans-serif",
                },
            },
        },
    },
});

export default function Theme({ children }) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}
