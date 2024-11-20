import React from "react";
import styles from "./Home.module";
import Navbar from "../components/Navbar";
import { Container } from "@mui/material";

export default function Main() {
    console.log("Rendering main...");

    return (
        <>
            <Navbar />
            <div style={{ backgroundColor: "#eeeeee" }}>
                <Container maxWidth="xl">
                    MUX Automotive Parts Trading
                </Container>
            </div>
        </>
    );
}
