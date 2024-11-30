import React from "react";
import {
    Box,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    useMediaQuery,
    useTheme,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Link,
    Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import XIcon from "@mui/icons-material/X";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

const Section = ({ title, content }) => (
    <Box>
        <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ color: "#D62828" }}
        >
            {title}
        </Typography>
        {content}
    </Box>
);

const CustomList = ({ items }) => (
    <List>
        {items.map(({ icon, text, href, hoverColor }) => (
            <ListItem disableGutters sx={{ mb: 0 }}>
                {icon && (
                    <ListItemIcon sx={{ minWidth: "36px", color: hoverColor }}>
                        {icon}
                    </ListItemIcon>
                )}
                <ListItemText
                    primary={
                        href ? (
                            <Link
                                href={href}
                                underline="none"
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                    color: "#FFFFFF",
                                    "&:hover": { color: hoverColor },
                                }}
                            >
                                {text}
                            </Link>
                        ) : (
                            text
                        )
                    }
                />
            </ListItem>
        ))}
    </List>
);

export default function Footer() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    // Static data for sections
    const contactItems = [
        {
            icon: <EmailOutlinedIcon />,
            text: "mux@automotive.ph",
            href: "mailto:mux@automotive.ph",
            hoverColor: "#D62828",
        },
        {
            icon: <FacebookOutlinedIcon />,
            text: "MUX Automotive PH",
            href: "https://facebook.com/muxautomotiveph",
            hoverColor: "#D62828",
        },
        {
            icon: <XIcon />,
            text: "@muxautomotiveph",
            href: "https://twitter.com/muxautomotiveph",
            hoverColor: "#D62828",
        },
    ];

    const collections = [
        { text: "Interior Car Accessories", href: "#", hoverColor: "#D62828" },
        { text: "Car Care and Detailing", href: "#", hoverColor: "#D62828" },
        { text: "Automotive Parts", href: "#", hoverColor: "#D62828" },
        { text: "Car Electronics", href: "#", hoverColor: "#D62828" },
        { text: "Tools and Garage", href: "#", hoverColor: "#D62828" },
    ];

    const quickLinks = [
        { text: "About Us", href: "#", hoverColor: "#D62828" },
        { text: "Contact Us", href: "#", hoverColor: "#D62828" },
        { text: "Terms of Service", href: "#", hoverColor: "#D62828" },
        { text: "Refund Policy", href: "#", hoverColor: "#D62828" },
    ];

    const contactDetails = [
        {
            icon: <PhoneOutlinedIcon />,
            text: "0929 387 4453 / 8-8618609",
            hoverColor: "#D62828",
        },
        {
            icon: <LocationOnOutlinedIcon />,
            text: "23D BMA Street, Barangay Tatalon, Quezon City",
            hoverColor: "#D62828",
        },
    ];

    return (
        <Box
            component="footer"
            sx={{ backgroundColor: "#121212", color: "#FFFFFF", p: 4 }}
        >
            {isMobile ? (
                <>
                    <Section
                        title="MUX"
                        content={<CustomList items={contactItems} />}
                    />
                    <Accordion
                        sx={{
                            backgroundColor: "inherit",
                            color: "inherit",
                            boxShadow: "none",
                            "&:before": { display: "none" },
                        }}
                    >
                        <AccordionSummary
                            expandIcon={
                                <ExpandMoreIcon sx={{ color: "#FFFFFF" }} />
                            }
                            sx={{ p: 0 }}
                        >
                            <Typography
                                fontWeight="bold"
                                sx={{ color: "#D62828" }}
                                variant="h6"
                            >
                                Collections
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ p: 0 }}>
                            <CustomList items={collections} />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion
                        sx={{
                            backgroundColor: "inherit",
                            color: "inherit",
                            boxShadow: "none",
                            "&:before": { display: "none" },
                            mb: 2,
                        }}
                    >
                        <AccordionSummary
                            expandIcon={
                                <ExpandMoreIcon sx={{ color: "#FFFFFF" }} />
                            }
                            sx={{ p: 0 }}
                        >
                            <Typography
                                fontWeight="bold"
                                sx={{ color: "#D62828" }}
                                variant="h6"
                            >
                                Quick Links
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ p: 0 }}>
                            <CustomList items={quickLinks} />
                        </AccordionDetails>
                    </Accordion>
                    <Section
                        title="Contact"
                        content={<CustomList items={contactDetails} />}
                        sx={{ mb: 0 }}
                    />
                </>
            ) : (
                <Grid container spacing={4} justifyContent="space-between">
                    <Grid item xs={12} sm={6} md={3}>
                        <Section
                            title="MUX"
                            content={<CustomList items={contactItems} />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Section
                            title="Collections"
                            content={<CustomList items={collections} />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Section
                            title="Quick Links"
                            content={<CustomList items={quickLinks} />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Section
                            title="Contact"
                            content={<CustomList items={contactDetails} />}
                        />
                    </Grid>
                </Grid>
            )}
        </Box>
    );
}
