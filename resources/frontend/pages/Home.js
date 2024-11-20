import React from "react";
import styles from "./Home.module";
import Navbar from "../components/Navbar";
import { Container, Grid2, Typography } from "@mui/material";

export default function Main() {
    console.log("Rendering main...");

    return (
        <>
            <Navbar />
            <div className={styles.heroSection}>
                <Container maxWidth="xl">
                    <Grid2 container spacing={2}>
                        <Grid2 size={6}>
                            <Typography className={styles.heroSectionTitle}>
                                MUX Automotive Part Trading
                            </Typography>
                        </Grid2>
                        <Grid2 size={4}></Grid2>
                    </Grid2>
                </Container>
            </div>
        </>
    );
}
