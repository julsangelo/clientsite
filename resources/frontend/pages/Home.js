import React, { useContext, useEffect, useState } from "react";
import styles from "./Home.module";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Container,
    Grid2,
    MenuItem,
    Pagination,
    Select,
    Typography,
} from "@mui/material";
import {
    CheckBoxOutlined,
    MessageOutlined,
    ShoppingCartOutlined,
} from "@mui/icons-material";
import ProductCard from "../components/ProductCard";
import { ReferenceContext } from "../context/ReferenceProvider";
import { getProducts } from "../ajax/backend";

export default function Main() {
    document.title = "MUX Moto Shop";
    const { references } = useContext(ReferenceContext);
    const [products, setProducts] = useState();
    const [selectedProducts, setSelectedProducts] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6;

    useEffect(() => {
        getProducts((data) => {
            setProducts(data);
            setSelectedProducts(data.allProducts);
        });
    }, []);

    const selectChange = (option) => {
        setCurrentPage(1);
        if (option === 0) {
            setSelectedProducts(products?.allProducts);
        } else {
            setSelectedProducts(products?.categorized[option] || []);
        }
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const paginatedProducts = selectedProducts?.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage,
    );

    return (
        <>
            <Navbar />
            <div className={styles.heroSection}>
                <Container maxWidth="xl">
                    <Grid2
                        container
                        spacing={5}
                        className={styles.heroSectionContainer}
                    >
                        <Grid2 container size={{ lg: 12, xl: 5 }} spacing={4}>
                            <Typography className={styles.heroSectionTitle}>
                                MUX Automotive Part Trading
                            </Typography>
                            <Typography className={styles.heroSectionHeading}>
                                COIDO VACUUM CLEANER DC 12V
                            </Typography>
                            <Typography
                                className={styles.heroSectionSubheading}
                            >
                                Get more done with cyclonic power and a
                                high-performance motor that maximizes suction.
                                Our vacuum’s easy-to-empty, clear dust cup and
                                changeable air filter keep it running smoothly,
                                while LED lighting helps you spot every last bit
                                of dust.
                            </Typography>
                        </Grid2>
                        <Grid2
                            container
                            size={{ lg: 12, xl: 7 }}
                            className={styles.heroSectionImageContainer}
                        >
                            <CardMedia
                                component="img"
                                image="/fjmoto/images/61Ov4yDCYEL._AC_UF1000,1000_QL80_.jpg"
                                className={styles.heroSectionImage}
                            />
                        </Grid2>
                    </Grid2>
                </Container>
            </div>
            <div className={styles.categoriesSection}>
                <Container maxWidth="xl">
                    <Grid2 className={styles.categoriesSectionContainer}>
                        <Grid2 size={2}>
                            <Typography
                                className={styles.categoriesSectionHeading}
                            >
                                Categories
                            </Typography>
                            <Typography
                                className={styles.categoriesSectionSubheading}
                            >
                                Browse by your interests
                            </Typography>
                        </Grid2>
                        <Grid2
                            container
                            size={10}
                            spacing={5}
                            className={styles.categoriesSectionGridContainer}
                        >
                            {references?.productCategory?.map((item, index) => (
                                <Grid2
                                    key={index}
                                    size={2}
                                    className={styles.categoriesSectionGrid}
                                >
                                    <Card
                                        className={styles.categoriesSectionCard}
                                    >
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                image="/fjmoto/images/PAANO, JULIUS ANGELO A b-min.JPG"
                                                height="200"
                                                width="200"
                                            />
                                            <CardContent
                                                className={
                                                    styles.categoriesSectionCardContent
                                                }
                                            >
                                                {item.productCategoryName}
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid2>
                            ))}
                        </Grid2>
                    </Grid2>
                </Container>
            </div>
            <div className={styles.productSection}>
                <Container maxWidth="xl">
                    <div className={styles.productSectionHeader}>
                        <Typography className={styles.productSectionHeading}>
                            Featured Products
                        </Typography>
                        <Select
                            defaultValue={0}
                            className={styles.productSelect}
                        >
                            <MenuItem
                                value={0}
                                className={styles.productOption}
                                onClick={() => selectChange(0)}
                            >
                                All Products
                            </MenuItem>
                            {references?.productCategory?.map((item, index) => (
                                <MenuItem
                                    key={index}
                                    value={index + 1}
                                    className={styles.productOption}
                                    onClick={() => selectChange(index + 1)}
                                >
                                    {item.productCategoryName}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                    {paginatedProducts?.length > 0 ? (
                        <>
                            <Grid2 container size={12} spacing={2}>
                                {paginatedProducts.map((item, index) => (
                                    <Grid2
                                        size={{
                                            xs: 6,
                                            sm: 4,
                                            md: 3,
                                            lg: 2.4,
                                            xl: 2,
                                        }}
                                        key={index}
                                        className={styles.productGrid}
                                    >
                                        <ProductCard product={item} />
                                    </Grid2>
                                ))}
                            </Grid2>
                            <Pagination
                                count={Math.ceil(
                                    selectedProducts.length / productsPerPage,
                                )}
                                page={currentPage}
                                onChange={handlePageChange}
                                className={styles.productPagination}
                            />
                        </>
                    ) : (
                        <div className={styles.productNoProduct}>
                            <Typography>No products found.</Typography>
                        </div>
                    )}
                </Container>
            </div>
            <div className={styles.featureSection}>
                <Container maxWidth="xl">
                    <Grid2 container size={12} spacing={3}>
                        <Grid2 size={{ xs: 12, md: 6, xl: 3 }}>
                            <Card className={styles.featureSectionCard}>
                                <Box
                                    className={styles.featureSectionCardIconBox}
                                >
                                    <ShoppingCartOutlined fontSize="large" />
                                </Box>
                                <CardContent
                                    className={styles.featureSectionCardContent}
                                >
                                    <Typography
                                        className={
                                            styles.featureSectionCardHeading
                                        }
                                    >
                                        Cash on Delivery & Pre-Order
                                    </Typography>
                                    <Typography
                                        className={
                                            styles.featureSectionCardSubheading
                                        }
                                    >
                                        Secure your items in advance, with
                                        cash-on-delivery options.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid2>
                        <Grid2 size={{ xs: 12, md: 6, xl: 3 }}>
                            <Card className={styles.featureSectionCard}>
                                <Box
                                    className={styles.featureSectionCardIconBox}
                                >
                                    <ShoppingCartOutlined fontSize="large" />
                                </Box>
                                <CardContent
                                    className={styles.featureSectionCardContent}
                                >
                                    <Typography
                                        className={
                                            styles.featureSectionCardHeading
                                        }
                                    >
                                        Guaranteed Satisfaction
                                    </Typography>
                                    <Typography
                                        className={
                                            styles.featureSectionCardSubheading
                                        }
                                    >
                                        We stand by our product quality and
                                        warranty.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid2>
                        <Grid2 size={{ xs: 12, md: 6, xl: 3 }}>
                            <Card className={styles.featureSectionCard}>
                                <Box
                                    className={styles.featureSectionCardIconBox}
                                >
                                    <MessageOutlined fontSize="large" />
                                </Box>
                                <CardContent
                                    className={styles.featureSectionCardContent}
                                >
                                    <Typography
                                        className={
                                            styles.featureSectionCardHeading
                                        }
                                    >
                                        AI-Powered Assistance
                                    </Typography>
                                    <Typography
                                        className={
                                            styles.featureSectionCardSubheading
                                        }
                                    >
                                        Our chatbot offers seamless support
                                        anytime, anywhere.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid2>
                        <Grid2 size={{ xs: 12, md: 6, xl: 3 }}>
                            <Card className={styles.featureSectionCard}>
                                <Box
                                    className={styles.featureSectionCardIconBox}
                                >
                                    <CheckBoxOutlined fontSize="large" />
                                </Box>
                                <CardContent
                                    className={styles.featureSectionCardContent}
                                >
                                    <Typography
                                        className={
                                            styles.featureSectionCardHeading
                                        }
                                    >
                                        Billing Verification
                                    </Typography>
                                    <Typography
                                        className={
                                            styles.featureSectionCardSubheading
                                        }
                                    >
                                        Efficient proof of billing for secure
                                        transactions.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid2>
                    </Grid2>
                </Container>
            </div>
            <Footer />
        </>
    );
}
