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
    return (
        <Card variant="outlined" className={styles.productCard}>
            <CardActionArea
                component={Link}
                to={`/shop/product/${product.productCode}`}
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
                                <Rating
                                    defaultValue={2.5}
                                    precision={0.5}
                                    readOnly
                                />
                                <Typography
                                    className={styles.productCardRatingText}
                                >
                                    1 review
                                </Typography>
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
