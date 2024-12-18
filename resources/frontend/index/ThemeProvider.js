import React from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { margin, minHeight } from "@mui/system";

const theme = createTheme({
    typography: {
        fontFamily: "'Manrope', sans-serif",
    },
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    fontSize: "inherit",
                },
            },
        },
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
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    fontSize: "inherit",
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    "&.Mui-selected": {
                        backgroundColor: "rgba(220, 39, 46, 0.08) !important",
                    },
                    "&.Mui-selected:hover": {
                        backgroundColor: "rgba(220, 39, 46, 0.15) !important",
                    },
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(220, 39, 46, 1)",
                    },
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
