import React from "react";
import styles from "./OrderPanel.module";
import { ExpandMore } from "@mui/icons-material";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    CardMedia,
    Chip,
    Divider,
    Grid2,
    Typography,
} from "@mui/material";

export default function OrdersPanel({ orderItem }) {
    return (
        <Grid2 container spacing={3}>
            <Grid2 size={{ xs: 12 }}>
                <Typography className={styles.tabTitle}>My orders</Typography>
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
                {orderItem && orderItem.length > 0 ? (
                    <Box className={styles.ordersContainer}>
                        {orderItem?.map((item, index) => (
                            <Accordion key={index}>
                                <AccordionSummary expandIcon={<ExpandMore />}>
                                    <Box className={styles.orderSummary}>
                                        <Box>
                                            <Typography
                                                className={
                                                    styles.orderSummaryTitle
                                                }
                                            >
                                                Order No. {item.orderID}
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <Chip
                                                label={item.orderStatus}
                                                color={
                                                    item.orderStatus ===
                                                    "Completed"
                                                        ? "success"
                                                        : item.orderStatus ===
                                                            "Cancelled"
                                                          ? "error"
                                                          : "default"
                                                }
                                            />
                                        </Box>
                                    </Box>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box className={styles.orderDescription}>
                                        {item.orderItems?.map((item, index) => (
                                            <Box className={styles.productList}>
                                                <Box
                                                    key={index}
                                                    className={
                                                        styles.productItemContainer
                                                    }
                                                >
                                                    <CardMedia
                                                        component="img"
                                                        image={`/hydrogen/${item.product.productImage}`}
                                                        className={
                                                            styles.productListImage
                                                        }
                                                    />
                                                    <Box
                                                        className={
                                                            styles.productDetails
                                                        }
                                                    >
                                                        <Typography
                                                            className={
                                                                styles.productDetailsName
                                                            }
                                                        >
                                                            {
                                                                item.product
                                                                    .productName
                                                            }
                                                        </Typography>
                                                        <Typography
                                                            className={
                                                                styles.productDetailsPrice
                                                            }
                                                        >
                                                            ₱{" "}
                                                            {
                                                                item.product
                                                                    .productPrice
                                                            }
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                                <Box
                                                    className={
                                                        styles.productDetailsContainer
                                                    }
                                                >
                                                    <Typography
                                                        className={
                                                            styles.productDetailsName
                                                        }
                                                    >
                                                        {item.orderItemQuantity}{" "}
                                                        item/s
                                                    </Typography>
                                                </Box>
                                                <Box
                                                    className={
                                                        styles.productDetailsContainer
                                                    }
                                                >
                                                    <Typography
                                                        className={
                                                            styles.productItemPrice
                                                        }
                                                    >
                                                        ₱ {item.orderItemTotal}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        ))}
                                        <Divider orientation="horizontal" />
                                        <Box>
                                            <Grid2 container spacing={3}>
                                                <Grid2
                                                    size={{
                                                        xs: 12,
                                                        md: 6,
                                                    }}
                                                >
                                                    <Box
                                                        className={
                                                            styles.orderDetailsBox
                                                        }
                                                    >
                                                        <Typography>
                                                            Shipping Details
                                                        </Typography>
                                                        <Typography>
                                                            Shipping Details
                                                        </Typography>
                                                        <Typography>
                                                            Shipping Details
                                                        </Typography>
                                                        <Typography>
                                                            Shipping Details
                                                        </Typography>
                                                    </Box>
                                                </Grid2>
                                                <Grid2
                                                    size={{
                                                        xs: 12,
                                                        md: 6,
                                                    }}
                                                    className={
                                                        styles.orderDetailsRight
                                                    }
                                                >
                                                    <Box
                                                        className={
                                                            styles.orderDetailsBox
                                                        }
                                                    >
                                                        <Typography>
                                                            Placed on:{" "}
                                                            {item.orderDateTime}
                                                        </Typography>
                                                        <Typography>
                                                            Paid by:{" "}
                                                            {item.orderDateTime}
                                                        </Typography>
                                                    </Box>
                                                    <Box
                                                        className={
                                                            styles.orderDetailsBox
                                                        }
                                                    >
                                                        <Typography>
                                                            Subtotal: ₱{" "}
                                                            {item.orderTotal}
                                                        </Typography>
                                                        <Typography>
                                                            Shipping fee: ₱{" "}
                                                            {item.orderTotal}
                                                        </Typography>
                                                        <Divider
                                                            orientation="horizontal"
                                                            className={
                                                                styles.orderDetailsDivider
                                                            }
                                                        />
                                                        <Typography
                                                            className={
                                                                styles.orderDetailsTotal
                                                            }
                                                        >
                                                            Total: ₱{" "}
                                                            {item.orderTotal}
                                                        </Typography>
                                                    </Box>
                                                </Grid2>
                                            </Grid2>
                                        </Box>
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </Box>
                ) : (
                    <Typography className={styles.orderNoItemsText}>
                        No orders.
                    </Typography>
                )}
            </Grid2>
        </Grid2>
    );
}
