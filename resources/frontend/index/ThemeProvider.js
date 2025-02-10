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
                        color: "#1ea1d7",
                    },
                },
            },
        },
        MuiTabs: {
            styleOverrides: {
                indicator: {
                    backgroundColor: "#1ea1d7",
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
                        backgroundColor: "#1ea1d7 !important",
                    },
                    "&.Mui-selected:hover": {
                        backgroundColor: "#1ea1d7 !important",
                    },
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#1ea1d7",
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
