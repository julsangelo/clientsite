import React, { useEffect, useState } from "react";
import styles from "./Product.module";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import {
    addToCart,
    getProductDetail,
    getProductReview,
    getProducts,
    productReview,
} from "../ajax/backend";
import {
    Box,
    Button,
    CardMedia,
    Container,
    Divider,
    Grid2,
    IconButton,
    Rating,
    Typography,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useFlashMessage } from "../context/FlashMessage";
import ProductCard from "../components/ProductCard";
import Bot from "../components/Bot";

export default function Product() {
    const [productDetail, setProductDetail] = useState(null);
    const [productReview, setProductReview] = useState();
    const [quantity, setQuantity] = useState(1);
    const { productCode } = useParams();
    const [products, setProducts] = useState();
    const { setFlashMessage, setFlashStatus } = useFlashMessage();

    useEffect(() => {
        getProductDetail(productCode, (data) => {
            setProductDetail(data[0]);
        });
        getProducts((data) => {
            setProducts(data.allProducts);
        });
    }, []);

    useEffect(() => {
        getProductReview(productDetail?.productID, (data) => {
            setProductReview(data);
        });

        document.title = `${productDetail?.productName} | Cliff Motorshop`;
    }, [productDetail]);

    const handleIncrement = () => {
        setQuantity((prev) => prev + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    };

    const handleAddToCart = () => {
        addToCart(productDetail?.productID, quantity, (response) => {
            setFlashMessage(response.message);
            setFlashStatus(response.status);
        });
    };

    return (
        <div className={styles.page}>
            <Navbar />
            <div className={styles.productContainer}>
                <Container maxWidth="xl" className={styles.productContent}>
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
                        <Grid2
                            size={{ xs: 12, md: 6 }}
                            spacing={4}
                            container
                            direction="column"
                        >
                            <Grid2
                                size={{ xs: 12 }}
                                className={styles.productGridBox}
                            >
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
                                    {productDetail?.productStockQuantity !=
                                        0 && (
                                        <div className={styles.buttonContainer}>
                                            <Button
                                                className={
                                                    styles.addToCartButton
                                                }
                                                onClick={handleAddToCart}
                                            >
                                                Add to cart
                                            </Button>
                                            <Button
                                                className={
                                                    styles.checkoutButton
                                                }
                                                component={Link}
                                                to="/checkout"
                                                state={{
                                                    productCode: productCode,
                                                    quantity: quantity,
                                                }}
                                            >
                                                Checkout
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </Grid2>
                            {productReview?.length > 0 && (
                                <Grid2
                                    size={{ xs: 12 }}
                                    className={styles.reviewGridBox}
                                >
                                    <Typography className={styles.reviewTitle}>
                                        Reviews
                                    </Typography>
                                    <Divider orientation="horizontal" />
                                    {productReview?.map((item, index) => (
                                        <Box
                                            className={styles.reviewBox}
                                            key={index}
                                        >
                                            <Box className={styles.reviewItem}>
                                                <Typography
                                                    className={
                                                        styles.reviewName
                                                    }
                                                >
                                                    {item.customerUsername}
                                                </Typography>
                                                <Typography
                                                    className={
                                                        styles.reviewDate
                                                    }
                                                >
                                                    {
                                                        item.reviewDate.split(
                                                            " ",
                                                        )[0]
                                                    }
                                                </Typography>
                                            </Box>
                                            <Rating
                                                precision={0.5}
                                                value={item.reviewRating}
                                                readOnly
                                                size="small"
                                            />
                                            {item.reviewFeedback && (
                                                <Typography
                                                    className={
                                                        styles.reviewFeedback
                                                    }
                                                >
                                                    {item.reviewFeedback}
                                                </Typography>
                                            )}
                                        </Box>
                                    ))}
                                </Grid2>
                            )}
                        </Grid2>
                    </Grid2>
                    <Box>
                        <Typography className={styles.recommendedTitle}>
                            You may also like
                        </Typography>
                        <Grid2 container size={12} spacing={2}>
                            {products?.map((item, index) => (
                                <Grid2
                                    size={{
                                        xs: 6,
                                        sm: 4,
                                        md: 3,
                                        lg: 2.4,
                                        xl: 2,
                                    }}
                                    key={index}
                                    container
                                >
                                    <ProductCard product={item} />
                                </Grid2>
                            ))}
                        </Grid2>
                    </Box>
                </Container>
            </div>
            <Footer />
            <Bot />
        </div>
    );
}
