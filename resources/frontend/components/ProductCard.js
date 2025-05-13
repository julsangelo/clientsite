import React from "react";
import styles from "./ProductCard.module";
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Rating,
    Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
    const handleProductClick = (productCode) => {
        window.location.href = `/shop/product/${productCode}`;
    };

    return (
        <Card variant="outlined" className={styles.productCard}>
            <CardActionArea
                component={Link}
                onClick={() => handleProductClick(product.productCode)}
                className={styles.productCardButton}
            >
                <div className={styles.productCardButtonContent}>
                    <CardMedia
                        component="img"
                        image={`/hydrogen/${product.productImage}`}
                        className={styles.productCardImage}
                    />
                    <CardContent className={styles.productCardContent}>
                        <Typography className={styles.productCardTitle}>
                            {product.productName}
                        </Typography>
                        <div>
                            <div className={styles.productCardRating}>
                                {product.reviews && (
                                    <Rating
                                        value={product.reviews.reviewRating}
                                        precision={0.1}
                                        readOnly
                                    />
                                )}
                                {product.reviews ? (
                                    <Typography
                                        className={styles.productCardRatingText}
                                    >
                                        {product.reviews.reviewCount} review/s
                                    </Typography>
                                ) : (
                                    <Typography
                                        className={styles.productCardRatingText}
                                    >
                                        No reviews
                                    </Typography>
                                )}
                            </div>
                            <div>
                                <Typography className={styles.productCardPrice}>
                                    ₱ {product.productPrice}
                                </Typography>
                            </div>
                        </div>
                    </CardContent>
                </div>
            </CardActionArea>
        </Card>
    );
}
