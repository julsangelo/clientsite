import React from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { margin, minHeight } from "@mui/system";

const theme = createTheme({
    typography: {
        fontFamily: "'Manrope', sans-serif",
    },
    components: {
        MuiTab: {
            styleOverrides: {
                root: {
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: "bolder",
                    "&.Mui-selected": {
                        color: "#d62828",
                    },
                },
            },
        },
        MuiTabs: {
            styleOverrides: {
                indicator: {
                    backgroundColor: "#d62828",
                },
            },
        },
        MuiAccordionSummary: {
            styleOverrides: {
                root: {
                    minHeight: "0",
                    "&.Mui-expanded": {
                        minHeight: "0",
                    },
                },
                content: {
                    margin: "0",
                    "&.Mui-expanded": {
                        minHeight: "0",
                        margin: "0",
                    },
                },
            },
        },
        MuiAccordion: {
            styleOverrides: {
                root: {
                    "&.Mui-expanded": {
                        margin: "0",
                    },
                },
            },
        },
        MuiList: {
            styleOverrides: {
                root: {
                    padding: "0",
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
