import React from "react";
import styles from "./Footer.module";
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
    Grid2,
    Container,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import XIcon from "@mui/icons-material/X";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

const Section = ({ title, content }) => (
    <Box>
        <Typography className={styles.footerSectionTitle}>{title}</Typography>
        {content}
    </Box>
);

const CustomList = ({ items }) => (
    <List>
        {items.map(({ icon, text, href }, index) => (
            <ListItem className={styles.footerSectionListItem} key={index}>
                {icon && (
                    <ListItemIcon className={styles.footerSectionListItemIcon}>
                        {icon}
                    </ListItemIcon>
                )}
                <ListItemText
                    primary={
                        href ? (
                            <Link
                                href={href}
                                underline="none"
                                target="_self"
                                rel="noopener noreferrer"
                                className={styles.footerSectionListItemText}
                            >
                                {text}
                            </Link>
                        ) : (
                            <Typography
                                className={styles.footerSectionListItemText}
                            >
                                {text}
                            </Typography>
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

    const contactItems = [
        {
            icon: (
                <EmailOutlinedIcon className={styles.footerSectionBrandIcon} />
            ),
            text: "mux@automotive.ph",
            href: "mailto:mux@automotive.ph",
            hoverColor: "#D62828",
        },
        {
            icon: (
                <FacebookOutlinedIcon
                    className={styles.footerSectionBrandIcon}
                />
            ),
            text: "MUX Automotive PH",
            href: "https://facebook.com/muxautomotiveph",
            hoverColor: "#D62828",
        },
        {
            icon: <XIcon className={styles.footerSectionBrandIcon} />,
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
        { text: "About Us", href: "/about", hoverColor: "#D62828" },
        { text: "Contact Us", href: "/contact", hoverColor: "#D62828" },
        { text: "Terms of Service", href: "#", hoverColor: "#D62828" },
        { text: "Refund Policy", href: "#", hoverColor: "#D62828" },
    ];

    const contactDetails = [
        {
            icon: <PhoneOutlinedIcon fontSize="small" />,
            text: "0929 387 4453 / 8-8618609",
            hoverColor: "#D62828",
        },
        {
            icon: <LocationOnOutlinedIcon fontSize="small" />,
            text: "23D BMA Street, Barangay Tatalon, Quezon City",
            hoverColor: "#D62828",
        },
    ];

    return (
        <div className={styles.footerSection}>
            <Container maxWidth="xl">
                {isMobile ? (
                    <>
                        <Box>
                            <Typography className={styles.footerSectionBrand}>
                                MUX
                            </Typography>
                            <div className={styles.footerSectionIconContainer}>
                                {contactItems.map((item, index) => (
                                    <a
                                        key={index}
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={
                                            styles.footerSectionBrandIconLink
                                        }
                                    >
                                        {item.icon}
                                    </a>
                                ))}
                            </div>
                        </Box>
                        <div className={styles.footerSectionAccordionContainer}>
                            <Accordion
                                className={styles.footerSectionAccordion}
                                sx={{
                                    backgroundColor: "inherit",
                                    color: "inherit",
                                    boxShadow: "none",
                                    "&:before": { display: "none" },
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={
                                        <ExpandMoreIcon
                                            className={
                                                styles.footerSectionAccordionIcon
                                            }
                                        />
                                    }
                                    sx={{ p: 0 }}
                                >
                                    <Typography
                                        className={styles.footerSectionTitle}
                                    >
                                        Collections
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ p: 0 }}>
                                    <CustomList items={collections} />
                                </AccordionDetails>
                            </Accordion>
                            <Accordion
                                className={styles.footerSectionAccordion}
                                sx={{
                                    backgroundColor: "inherit",
                                    color: "inherit",
                                    boxShadow: "none",
                                    "&:before": { display: "none" },
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={
                                        <ExpandMoreIcon
                                            className={
                                                styles.footerSectionAccordionIcon
                                            }
                                        />
                                    }
                                    sx={{ p: 0 }}
                                >
                                    <Typography
                                        className={styles.footerSectionTitle}
                                    >
                                        Quick Links
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ p: 0 }}>
                                    <CustomList items={quickLinks} />
                                </AccordionDetails>
                            </Accordion>
                        </div>

                        <Section
                            title="Contact"
                            content={<CustomList items={contactDetails} />}
                            sx={{ mb: 0 }}
                        />
                    </>
                ) : (
                    <Grid2 container spacing={4}>
                        <Grid2 size={{ md: 3, lg: 4, xl: 5 }}>
                            <Box>
                                <Typography
                                    className={styles.footerSectionBrand}
                                >
                                    MUX
                                </Typography>
                                <div
                                    className={
                                        styles.footerSectionIconContainer
                                    }
                                >
                                    {contactItems.map((item, index) => (
                                        <a
                                            key={index}
                                            href={item.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={
                                                styles.footerSectionBrandIconLink
                                            }
                                        >
                                            {item.icon}
                                        </a>
                                    ))}
                                </div>
                            </Box>
                        </Grid2>
                        <Grid2
                            container
                            size={{ md: 9, lg: 8, xl: 7 }}
                            className={styles.footerSectionDesktopInfo}
                        >
                            <Section
                                title="Collections"
                                content={<CustomList items={collections} />}
                            />
                            <Section
                                title="Quick Links"
                                content={<CustomList items={quickLinks} />}
                            />
                            <Section
                                title="Contact"
                                content={<CustomList items={contactDetails} />}
                            />
                        </Grid2>
                    </Grid2>
                )}
            </Container>
        </div>
    );
}
