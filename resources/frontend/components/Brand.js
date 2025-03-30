import { Typography } from "@mui/material";
import styles from "./Brand.module";
import React from "react";

export default function Brand({ fontSize }) {
    return (
        <Typography
            className={styles.brandName}
            sx={{
                fontSize: { fontSize },
                lineHeight: "1",
            }}
        >
            CLIFF
        </Typography>
    );
}
