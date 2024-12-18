import React, { useContext, useState } from "react";
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
import Footer from "../components/Footer";
import { ReferenceContext } from "../context/ReferenceProvider";
import ContactIcon from "../components/ContactIcon";

export default function Contact() {
    document.title = "MUX Moto Shop | Contact";
    const { references } = useContext(ReferenceContext);

    const [value, setValue] = useState("0");

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
                                {references?.branch?.map((item, index) => (
                                    <Tab
                                        label={item.branchName}
                                        value={String(index)}
                                        key={index}
                                    />
                                ))}
                            </TabList>
                            {references?.branch?.map((item, index) => (
                                <TabPanel value={String(index)} key={index}>
                                    <Box
                                        className={styles.contactInfoSectionBox}
                                    >
                                        <Grid2 container>
                                            <Grid2
                                                size={{ xs: 12, md: 6 }}
                                                className={
                                                    styles.contactInfoSectionBoxContent
                                                }
                                            >
                                                MUX Automotive Parts Trading -{" "}
                                                {item.branchLocation}
                                                {item.contacts.map(
                                                    (item, index) => (
                                                        <div
                                                            className={
                                                                styles.contactInfoSectionBoxDetails
                                                            }
                                                            key={index}
                                                        >
                                                            <ContactIcon
                                                                iconType={
                                                                    item.branchContactType
                                                                }
                                                            />
                                                            {
                                                                item.branchContactText
                                                            }
                                                        </div>
                                                    ),
                                                )}
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
                                                    defaultZoom={
                                                        defaultProps.zoom
                                                    }
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
                            ))}
                        </Box>
                    </TabContext>
                </Container>
            </div>
            <Footer />
        </>
    );
}
