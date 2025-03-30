import { Box, Container, Grid2, Typography } from "@mui/material";
import React from "react";
import Navbar from "../components/Navbar";
import styles from "./About.module";
import Footer from "../components/Footer";

export default function About() {
    document.title = "About | Cliff Motorshop";

    return (
        <>
            <Navbar />
            <div className={styles.aboutSection}>
                <Container maxWidth="xl">
                    <Grid2 container size={12} spacing={3}>
                        <Grid2 size={{ lg: 12, xl: 6 }}>
                            <Box className={styles.aboutSectionLBox}>
                                <Typography
                                    className={styles.aboutSectionLBoxHeading}
                                >
                                    About Us
                                </Typography>
                                <div
                                    className={
                                        styles.aboutSectionLBoxSubheadingContainer
                                    }
                                >
                                    <Typography
                                        className={
                                            styles.aboutSectionLBoxSubheading
                                        }
                                    >
                                        Welcome to MUX – where innovation meets
                                        simplicity. Founded in 2020, MUX began
                                        with a vision to provide an effortless
                                        and reliable shopping experience. Our
                                        team set out to bring quality products
                                        and top-notch customer service straight
                                        to your fingertips, with a focus on
                                        accessibility and technology.
                                    </Typography>
                                    <Typography
                                        className={
                                            styles.aboutSectionLBoxSubheading
                                        }
                                    >
                                        Today, MUX is more than just a store;
                                        we’re a community driven by trust and
                                        continuous improvement. Our commitment
                                        to secure transactions, fast delivery,
                                        and a wide selection keeps us growing.
                                        Thank you for being part of the MUX
                                        journey—let’s make shopping simple and
                                        satisfying.
                                    </Typography>
                                </div>
                            </Box>
                        </Grid2>
                        <Grid2
                            display={{ xs: "grid", sm: "flex", xl: "grid" }}
                            size={{ xs: 12, xl: 6 }}
                            gap={3}
                        >
                            <Grid2 size={12}>
                                <Box className={styles.aboutSectionRBox}>
                                    <Grid2 container size={12}>
                                        <Typography
                                            className={
                                                styles.aboutSectionRBoxHeading
                                            }
                                        >
                                            Mission
                                        </Typography>
                                        <div
                                            className={
                                                styles.aboutSectionRBoxLine
                                            }
                                        ></div>
                                    </Grid2>
                                    <Typography
                                        className={
                                            styles.aboutSectionRBoxSubheading
                                        }
                                    >
                                        To be the leading online destination
                                        that sets the standard for trust,
                                        convenience, and customer satisfaction
                                        in e-commerce. We envision a world where
                                        shopping is efficient, enjoyable, and
                                        accessible to all.
                                    </Typography>
                                </Box>
                            </Grid2>
                            <Grid2 size={12}>
                                <Box className={styles.aboutSectionRBox}>
                                    <Grid2 container size={12}>
                                        <Typography
                                            className={
                                                styles.aboutSectionRBoxHeading
                                            }
                                        >
                                            Vision
                                        </Typography>
                                        <div
                                            className={
                                                styles.aboutSectionRBoxLine
                                            }
                                        ></div>
                                    </Grid2>
                                    <Typography
                                        className={
                                            styles.aboutSectionRBoxSubheading
                                        }
                                    >
                                        To be the leading online destination
                                        that sets the standard for trust,
                                        convenience, and customer satisfaction
                                        in e-commerce. We envision a world where
                                        shopping is efficient, enjoyable, and
                                        accessible to all.
                                    </Typography>
                                </Box>
                            </Grid2>
                        </Grid2>
                    </Grid2>
                </Container>
            </div>
            <Footer />
        </>
    );
}
