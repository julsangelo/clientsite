import React from "react";
import styles from "./CartPanel.module";
import { Add, DeleteOutline, Remove } from "@mui/icons-material";
import {
    Box,
    Button,
    CardMedia,
    Divider,
    Grid2,
    IconButton,
    Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function CartPanel({
    cartItem,
    total,
    isMobile,
    handleAdd,
    handleMinus,
    setIsRemoveOpen,
    setRemoveItemCode,
    setRemoveItemType,
}) {
    return (
        <Grid2 container spacing={3}>
            <Typography className={styles.tabTitle}>My cart</Typography>
            <Grid2 size={{ xs: 12 }} container spacing={3}>
                {cartItem && cartItem.length > 0 ? (
                    <>
                        <Grid2 size={{ xs: 12, md: 8 }}>
                            <Box className={styles.cartItemDetails}>
                                {cartItem?.map((item, index) => (
                                    <Box key={index}>
                                        <Box className={styles.cartList}>
                                            <Box
                                                className={
                                                    styles.cartItemContainer
                                                }
                                            >
                                                <CardMedia
                                                    component="img"
                                                    image={`/hydrogen/${item.productImage}`}
                                                    className={
                                                        styles.cartListImage
                                                    }
                                                />
                                                <Box
                                                    className={
                                                        styles.cartDetails
                                                    }
                                                >
                                                    <Typography
                                                        className={
                                                            styles.cartDetailsName
                                                        }
                                                    >
                                                        {item.productName}
                                                    </Typography>
                                                    <Typography
                                                        className={
                                                            styles.cartDetailsPrice
                                                        }
                                                    >
                                                        ₱ {item.productPrice}
                                                    </Typography>
                                                </Box>
                                            </Box>

                                            {isMobile ? null : (
                                                <>
                                                    <Box>
                                                        <Box
                                                            className={
                                                                styles.cartQuantity
                                                            }
                                                        >
                                                            {item.quantity ===
                                                            1 ? (
                                                                <IconButton
                                                                    onClick={() =>
                                                                        handleMinus(
                                                                            item.productCode,
                                                                        )
                                                                    }
                                                                >
                                                                    <DeleteOutline />
                                                                </IconButton>
                                                            ) : (
                                                                <IconButton
                                                                    onClick={() =>
                                                                        handleMinus(
                                                                            item.productCode,
                                                                        )
                                                                    }
                                                                >
                                                                    <Remove />
                                                                </IconButton>
                                                            )}
                                                            <Typography>
                                                                {item.quantity}
                                                            </Typography>
                                                            <IconButton
                                                                onClick={() =>
                                                                    handleAdd(
                                                                        item.productCode,
                                                                    )
                                                                }
                                                            >
                                                                <Add />
                                                            </IconButton>
                                                        </Box>
                                                        <div
                                                            className={
                                                                styles.cardRemoveButton
                                                            }
                                                            onClick={() => {
                                                                setIsRemoveOpen(
                                                                    true,
                                                                );
                                                                setRemoveItemType(
                                                                    "cart",
                                                                );
                                                                setRemoveItemCode(
                                                                    item.productCode,
                                                                );
                                                            }}
                                                        >
                                                            Remove
                                                        </div>
                                                    </Box>
                                                    <Box>
                                                        <Typography
                                                            className={
                                                                styles.cartItemPrice
                                                            }
                                                        >
                                                            ₱{" "}
                                                            {(
                                                                item.productPrice *
                                                                item.quantity
                                                            ).toFixed(2)}
                                                        </Typography>
                                                    </Box>
                                                </>
                                            )}
                                        </Box>
                                        {isMobile ? (
                                            <Box
                                                className={
                                                    styles.cartDetailsBottom
                                                }
                                            >
                                                <Box>
                                                    <Box
                                                        className={
                                                            styles.cartQuantity
                                                        }
                                                    >
                                                        {item.quantity === 1 ? (
                                                            <IconButton
                                                                onClick={() =>
                                                                    handleMinus(
                                                                        item.productCode,
                                                                    )
                                                                }
                                                            >
                                                                <DeleteOutline />
                                                            </IconButton>
                                                        ) : (
                                                            <IconButton
                                                                onClick={() =>
                                                                    handleMinus(
                                                                        item.productCode,
                                                                    )
                                                                }
                                                            >
                                                                <Remove />
                                                            </IconButton>
                                                        )}
                                                        <Typography>
                                                            {item.quantity}
                                                        </Typography>
                                                        <IconButton
                                                            onClick={() =>
                                                                handleAdd(
                                                                    item.productCode,
                                                                )
                                                            }
                                                        >
                                                            <Add />
                                                        </IconButton>
                                                    </Box>
                                                </Box>
                                                <Typography
                                                    className={
                                                        styles.cartItemPriceSmall
                                                    }
                                                >
                                                    ₱{" "}
                                                    {(
                                                        item.productPrice *
                                                        item.quantity
                                                    ).toFixed(2)}
                                                </Typography>
                                            </Box>
                                        ) : null}
                                    </Box>
                                ))}
                            </Box>
                        </Grid2>
                        <Grid2 size={{ xs: 12, lg: 4 }}>
                            <Box className={styles.totalContainer}>
                                <Box className={styles.cartTotal}>
                                    <Typography
                                        className={styles.cartTotalText}
                                    >
                                        Total
                                    </Typography>
                                    <Typography
                                        className={styles.cartTotalText}
                                    >
                                        ₱ {total}
                                    </Typography>
                                </Box>
                                <Divider orientation="horizontal" />
                                <Box className={styles.cartMessage}>
                                    <Typography
                                        className={styles.cartMessageText}
                                    >
                                        Tax included. Shipping calculated at
                                        checkout.
                                    </Typography>
                                </Box>
                                <Box className={styles.cartButtons}>
                                    <Button
                                        className={styles.cartCheckout}
                                        component={Link}
                                        to="/checkout"
                                    >
                                        Checkout
                                    </Button>
                                </Box>
                            </Box>
                        </Grid2>
                    </>
                ) : (
                    <Typography className={styles.cartNoItemsText}>
                        No items in cart.
                    </Typography>
                )}
            </Grid2>
        </Grid2>
    );
}
