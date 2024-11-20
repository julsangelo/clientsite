const buttonStyles = {
    MuiButton: {
        styleOverrides: {
            root: {
                boxShadow: "none",
                borderRadius: "8px",
                textTransform: "none",
                outline: "none",
                "&:hover": {
                    boxShadow: "none",
                },
            },
        },
    },
};

export default buttonStyles;
