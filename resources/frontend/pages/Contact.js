import React from "react";
import styles from "./Contact.module";
import Navbar from "../components/Navbar";
import { Box, Container, Grid2, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
    Email,
    LocalPhone,
    LocationOn,
    PhoneIphone,
} from "@mui/icons-material";
import GoogleMapReact from "google-map-react";

export default function Contact() {
    document.title = "MUX Moto Shop | Contact";

    const [value, setValue] = React.useState("1");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const defaultProps = {
        center: {
            lat: 14.58148,
            lng: 121.049294,
        },
        zoom: 19,
    };

    const Marker = () => <LocationOn fontSize="large" />;

    return (
        <>
            <Navbar />
            <div className={styles.contactInfoSection}>
                <Container maxWidth="xl">
                    <TabContext value={value}>
                        <Box>
                            <TabList onChange={handleChange}>
                                <Tab label="Main Branch" value="1" />
                            </TabList>
                            <TabPanel value="1">
                                <Box className={styles.contactInfoSectionBox}>
                                    <Grid2 container>
                                        <Grid2
                                            size={{ xs: 12, md: 6 }}
                                            className={
                                                styles.contactInfoSectionBoxContent
                                            }
                                        >
                                            MUX Automotive Parts Trading - Main
                                            <div
                                                className={
                                                    styles.contactInfoSectionBoxDetails
                                                }
                                            >
                                                <PhoneIphone />
                                                +639764347875
                                            </div>
                                            <div
                                                className={
                                                    styles.contactInfoSectionBoxDetails
                                                }
                                            >
                                                <LocalPhone />
                                                (02) 8657-3186
                                            </div>
                                            <div
                                                className={
                                                    styles.contactInfoSectionBoxDetails
                                                }
                                            >
                                                <Email />
                                                contact@motionrx.com.ph
                                            </div>
                                            <div
                                                className={
                                                    styles.contactInfoSectionBoxDetails
                                                }
                                            >
                                                <LocationOn />
                                                44 Mariveles st, Cor Calbayog
                                                St, Mandaluyong
                                            </div>
                                        </Grid2>
                                        <Grid2
                                            size={{ xs: 12, md: 6 }}
                                            className={
                                                styles.contactInfoSectionBoxMap
                                            }
                                        >
                                            <GoogleMapReact
                                                bootstrapURLKeys={{
                                                    key: "AIzaSyAeJQp8EupFS2eBrQLlRJ9_YkjDjub2PYM",
                                                }}
                                                defaultCenter={
                                                    defaultProps.center
                                                }
                                                defaultZoom={defaultProps.zoom}
                                                options={{
                                                    zoomControl: false,
                                                    fullscreenControl: false,
                                                    mapTypeControl: false,
                                                    streetViewControl: false,
                                                    scrollwheel: false,
                                                    draggable: false,
                                                    clickableIcons: false,
                                                    disableDefaultUI: true,
                                                }}
                                            >
                                                <Marker
                                                    lat={14.58152}
                                                    lng={121.04927}
                                                />
                                            </GoogleMapReact>
                                        </Grid2>
                                    </Grid2>
                                </Box>
                            </TabPanel>
                        </Box>
                    </TabContext>
                </Container>
            </div>
        </>
    );
}
