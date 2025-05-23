import React, { useEffect } from "react";
import styles from "./CheckOutSummary.module";
import { Box, CardMedia, Divider, Grid2, Typography } from "@mui/material";

export default function CheckOutSummary({ items, subtotal, setTotal }) {
    const shippingFee = "79.00";

    const total = (parseFloat(subtotal) + parseFloat(shippingFee)).toFixed(2);

    useEffect(() => {
        setTotal(total);
    }, [total]);

    return (
        <Grid2 size={{ xs: 12, md: 5 }}>
            <Box className={styles.checkOutItems}>
                {items?.map((item, index) => (
                    <Box className={styles.cartListContainer} key={index}>
                        <Box className={styles.cartImageDetails}>
                            <CardMedia
                                component="img"
                                image={`/hydrogen/${item.productImage}`}
                                className={styles.cartListImage}
                            />
                            <Box className={styles.cartDetails}>
                                <Typography className={styles.cartDetailsName}>
                                    {item.productName}
                                </Typography>
                                <Typography className={styles.cartDetailsPrice}>
                                    ₱ {item.productPrice}
                                </Typography>
                            </Box>
                        </Box>
                        <Typography>{item.quantity} item/s</Typography>
                        <Typography className={styles.cartDetailsTotal}>
                            ₱ {(item.productPrice * item.quantity).toFixed(2)}
                        </Typography>
                    </Box>
                ))}
                <Divider orientation="horizontal" />
                <Box className={styles.totalContainer}>
                    <Box className={styles.total}>
                        <Typography>Subtotal</Typography>
                        <Typography className={styles.totalText}>
                            ₱ {subtotal}
                        </Typography>
                    </Box>
                    <Box className={styles.total}>
                        <Typography>Shipping Fee</Typography>
                        <Typography className={styles.totalText}>
                            ₱ {parseFloat(shippingFee).toFixed(2)}
                        </Typography>
                    </Box>
                    <Box className={styles.total}>
                        <Typography className={styles.totalTextBold}>
                            Total
                        </Typography>
                        <Typography className={styles.totalTextBold}>
                            ₱ {total}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Grid2>
    );
}
