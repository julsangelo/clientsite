import React, { useEffect, useState } from "react";
import styles from "./Product.module";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { addToCart, getProductDetail } from "../ajax/backend";
import {
    Box,
    Button,
    CardMedia,
    Container,
    Divider,
    Grid2,
    IconButton,
    Typography,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useFlashMessage } from "../context/FlashMessage";

export default function Product() {
    const [productDetail, setProductDetail] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const { productCode } = useParams();
    const { setFlashMessage, setFlashStatus } = useFlashMessage();

    useEffect(() => {
        getProductDetail(productCode, (data) => {
            setProductDetail(data[0]);
        });
    }, []);

    const handleIncrement = () => {
        setQuantity((prev) => prev + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    };

    const handleAddToCart = () => {
        addToCart(productDetail?.productCode, quantity, (response) => {
            setFlashMessage(response.message);
            setFlashStatus(response.status);
        });
    };

    const handleCheckout = () => {
        const item = JSON.stringify({
            productCode: productDetail?.productCode,
            quantity: quantity,
        });

        localStorage.setItem("item", item);
    };

    return (
        <div className={styles.page}>
            <Navbar />
            <div className={styles.productContainer}>
                <Container maxWidth="xl">
                    <Grid2 container size={12} spacing={4}>
                        <Grid2 size={{ xs: 12, md: 6 }}>
                            <Box className={styles.productGridBox}>
                                <div className={styles.productImageSelector}>
                                    <div
                                        className={
                                            styles.imageSelectorContainer
                                        }
                                    >
                                        <CardMedia
                                            component="img"
                                            image={`/hydrogen/${productDetail?.productImage}`}
                                            className={
                                                styles.imageSelectorImage
                                            }
                                        />
                                    </div>
                                </div>
                                <Divider
                                    orientation="vertical"
                                    className={styles.verticalDivider}
                                />
                                <div className={styles.productImageContainer}>
                                    <CardMedia
                                        component="img"
                                        image={`/hydrogen/${productDetail?.productImage}`}
                                        className={styles.productImage}
                                    />
                                </div>
                            </Box>
                        </Grid2>
                        <Grid2 size={{ xs: 12, md: 6 }}>
                            <Box className={styles.productGridBox}>
                                <div className={styles.productDetails}>
                                    <div className={styles.productName}>
                                        {productDetail?.productName}
                                    </div>
                                    <Divider
                                        orientation="horizontal"
                                        className={styles.horizontalDivider}
                                    />
                                    <div className={styles.productInfo}>
                                        <div className={styles.productInfoRow}>
                                            <Typography
                                                className={
                                                    styles.productInfoText
                                                }
                                            >
                                                Price:
                                            </Typography>
                                            <Typography
                                                className={
                                                    styles.productInfoText
                                                }
                                            >
                                                ₱ {productDetail?.productPrice}
                                            </Typography>
                                        </div>
                                        <div className={styles.productInfoRow}>
                                            <Typography
                                                className={
                                                    styles.productInfoText
                                                }
                                            >
                                                Stock:
                                            </Typography>
                                            <Typography
                                                className={
                                                    styles.productInfoText
                                                }
                                            >
                                                {
                                                    productDetail?.productStockQuantity
                                                }
                                            </Typography>
                                        </div>
                                        <div className={styles.productInfoRow}>
                                            <Typography
                                                className={
                                                    styles.productInfoText
                                                }
                                            >
                                                Quantity:
                                            </Typography>
                                            <Box className={styles.quantity}>
                                                <IconButton
                                                    disabled={quantity === 1}
                                                    onClick={handleDecrement}
                                                >
                                                    <Remove />
                                                </IconButton>
                                                <Typography>
                                                    {quantity}
                                                </Typography>
                                                <IconButton
                                                    onClick={handleIncrement}
                                                >
                                                    <Add />
                                                </IconButton>
                                            </Box>
                                        </div>
                                    </div>
                                    <div className={styles.buttonContainer}>
                                        <Button
                                            className={styles.addToCartButton}
                                            onClick={handleAddToCart}
                                        >
                                            Add to cart
                                        </Button>
                                        <Button
                                            className={styles.checkoutButton}
                                            onClick={handleCheckout}
                                            component={Link}
                                            to="/checkout"
                                        >
                                            Checkout
                                        </Button>
                                    </div>
                                </div>
                            </Box>
                        </Grid2>
                    </Grid2>
                </Container>
            </div>
            <Footer />
        </div>
    );
}
