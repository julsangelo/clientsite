import { createTheme } from "@mui/material/styles";
import colors from "./colors";
import typography from "./typography";
import buttonStyles from "./buttons";

const theme = createTheme({
    palette: {
        primary: {
            main: colors.primary,
        },
        secondary: {
            main: colors.secondary,
        },
        error: {
            main: colors.error,
        },
        background: {
            default: colors.background,
        },
        text: {
            primary: colors.text.primary,
            secondary: colors.text.secondary,
        },
    },
    typography,
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    margin: 0,
                    padding: 0,
                    boxSizing: "border-box",
                },
            },
        },
        ...buttonStyles,
    },
});

export default theme;
