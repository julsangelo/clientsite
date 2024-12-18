import React from "react";
import styles from "./ProductCard.module";
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Rating,
    Typography,
} from "@mui/material";

export default function ProductCard({ product }) {
    return (
        <Card className={styles.productCard}>
            <CardActionArea className={styles.productCardButton}>
                <div className={styles.productCardButtonContent}>
                    <CardMedia
                        component="img"
                        image="/fjmoto/images/PAANO, JULIUS ANGELO A b-min.JPG"
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
