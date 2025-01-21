import React, { useContext, useEffect, useState } from "react";
import styles from "./Shop.module";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getCategorizedProducts, getAllProducts } from "../ajax/backend";
import { Container, Grid2, Pagination, Typography } from "@mui/material";
import { ChevronRight } from "@mui/icons-material";
import ProductCard from "../components/ProductCard";
import { ReferenceContext } from "../context/ReferenceProvider";

export default function Shop() {
    const { category } = useParams();
    const { references } = useContext(ReferenceContext);
    const [products, setProducts] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;

    const productCategoryID = references?.productCategory?.find(
        (item) =>
            item.productCategoryName.toLowerCase() === category?.toLowerCase(),
    )?.productCategoryID;

    useEffect(() => {
        if (category == undefined) {
            getAllProducts((data) => {
                setProducts(data);
            });
        } else {
            getCategorizedProducts(productCategoryID, (data) => {
                setProducts(data);
            });
        }
    }, [category]);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const paginatedProducts = products?.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage,
    );

    const startProduct = (currentPage - 1) * productsPerPage + 1;
    const endProduct = Math.min(
        currentPage * productsPerPage,
        products?.length,
    );

    return (
        <div className={styles.page}>
            <Navbar />
            <div className={styles.shop}>
                <Container maxWidth="xl" className={styles.shopContainer}>
                    <Typography className={styles.shopPageInfo}>
                        Shop{" "}
                        <ChevronRight className={styles.shopPageInfoArrow} />{" "}
                        {category === undefined
                            ? "All Products"
                            : category.charAt(0).toUpperCase() +
                              category.slice(1)}
                    </Typography>
                    <Typography className={styles.shopPageTitle}>
                        {category === undefined
                            ? "All Products"
                            : category.charAt(0).toUpperCase() +
                              category.slice(1)}
                    </Typography>
                    {paginatedProducts?.length > 0 ? (
                        <>
                            <Typography className={styles.shopPaginationInfo}>
                                Showing {startProduct}-{endProduct} of{" "}
                                {products?.length} results
                            </Typography>
                            <Grid2 container size={12} spacing={2}>
                                {paginatedProducts?.map((item, index) => (
                                    <Grid2
                                        size={{
                                            xs: 6,
                                            sm: 4,
                                            md: 3,
                                            lg: 2.4,
                                            xl: 2,
                                        }}
                                        key={index}
                                    >
                                        <ProductCard product={item} />
                                    </Grid2>
                                ))}
                            </Grid2>
                            <Pagination
                                count={Math.ceil(
                                    products.length / productsPerPage,
                                )}
                                page={currentPage}
                                onChange={handlePageChange}
                                className={styles.shopPagination}
                            />
                        </>
                    ) : (
                        <div className={styles.shopNoProduct}>
                            <Typography>No products found.</Typography>
                        </div>
                    )}
                </Container>
            </div>
            <Footer />
        </div>
    );
}
