import React, { useContext } from "react";
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
    ListItemButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useReference } from "../context/ReferenceProvider";
import ContactIcon from "./ContactIcon";

const FooterSection = ({ title, data, prefix }) => (
    <Box>
        <Typography className={styles.footerSectionTitle}>{title}</Typography>
        <FooterList data={data} prefix={prefix} />
    </Box>
);

const FooterList = ({ data, prefix }) => {
    return (
        <List>
            {data?.map((item, index) => (
                <ListItem className={styles.footerSectionListItem} key={index}>
                    {item[`${prefix}Type`] && (
                        <ListItemIcon
                            className={styles.footerSectionListItemIcon}
                        >
                            <ContactIcon iconType={item[`${prefix}Type`]} />
                        </ListItemIcon>
                    )}
                    <ListItemText>
                        {item[`${prefix}Value`] ? (
                            <Link
                                href={item[`${prefix}Value`]}
                                underline="none"
                                target="_self"
                                rel="noopener noreferrer"
                                className={styles.footerSectionListItemText}
                            >
                                {item[`${prefix}Text`] || item[`${prefix}Name`]}
                            </Link>
                        ) : prefix === "productCategory" ? (
                            <Link
                                href={`/shop/${item.productCategoryName.toLowerCase()}`}
                                state={{
                                    categoryID: item.productCategoryID,
                                    categoryName: item.productCategoryName,
                                }}
                                underline="none"
                                target="_self"
                                rel="noopener noreferrer"
                                className={styles.footerSectionListItemText}
                            >
                                {item[`${prefix}Name`]}
                            </Link>
                        ) : (
                            <Typography
                                className={styles.footerSectionListItemText}
                            >
                                {item[`${prefix}Text`] || item[`${prefix}Name`]}
                            </Typography>
                        )}
                    </ListItemText>
                </ListItem>
            ))}
        </List>
    );
};

export default function Footer() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const { references } = useReference();

    const link = [
        { linkText: "About Us", linkValue: "/about" },
        {
            linkText: "Contact Us",
            linkValue: "/contact",
        },
        { linkText: "Terms of Service", linkValue: "#" },
        { linkText: "Refund Policy", linkValue: "#" },
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
                                {references?.socialMedia?.map((item, index) => (
                                    <a
                                        key={index}
                                        href={item.branchSocialMediaValue}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={
                                            styles.footerSectionBrandIconLink
                                        }
                                    >
                                        <ContactIcon
                                            iconType={
                                                item.branchSocialMediaType
                                            }
                                        />
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
                                        Product Categories
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ p: 0 }}>
                                    <FooterList
                                        data={references.productCategory}
                                        prefix="productCategory"
                                    />
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
                                    <FooterList data={link} prefix="link" />
                                </AccordionDetails>
                            </Accordion>
                        </div>
                        <FooterSection
                            title="Contact"
                            data={references.contact}
                            prefix="branchContact"
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
                                    {references?.socialMedia?.map(
                                        (item, index) => (
                                            <a
                                                key={index}
                                                href={
                                                    item.branchSocialMediaValue
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={
                                                    styles.footerSectionBrandIconLink
                                                }
                                            >
                                                <ContactIcon
                                                    iconType={
                                                        item.branchSocialMediaType
                                                    }
                                                />
                                            </a>
                                        ),
                                    )}
                                </div>
                            </Box>
                        </Grid2>
                        <Grid2
                            container
                            size={{ md: 9, lg: 8, xl: 7 }}
                            className={styles.footerSectionDesktopInfo}
                        >
                            <FooterSection
                                title="Product Categories"
                                data={references.productCategory}
                                prefix="productCategory"
                            />
                            <FooterSection
                                title="Quick Links"
                                data={link}
                                prefix="link"
                            />
                            <FooterSection
                                title="Contact"
                                data={references.contact}
                                prefix="branchContact"
                            />
                        </Grid2>
                    </Grid2>
                )}
            </Container>
        </div>
    );
}
