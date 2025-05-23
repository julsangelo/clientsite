import React, { useEffect, useState } from "react";
import styles from "./OrderPanel.module";
import { Close, ExpandMore } from "@mui/icons-material";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    CardMedia,
    Chip,
    Divider,
    Grid2,
    IconButton,
    Modal,
    Pagination,
    Rating,
    TextField,
    Typography,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { getReview, productReview } from "../../ajax/backend";
import { useFlashMessage } from "../../context/FlashMessage";

export default function OrdersPanel({ orderItem, isMobile }) {
    document.title = "Order | Cliff Motorshop";
    const location = useLocation();
    const orderNo = location.state.orderNo;
    const [isReviewOpen, setIsReviewOpen] = useState(false);
    const [reviewItem, setReviewItem] = useState();
    const [reviewOrder, setReviewOrder] = useState();
    const [rating, setRating] = useState(null);
    const [ratingError, setRatingError] = useState();
    const [feedback, setFeedback] = useState("");
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const [expanded, setExpanded] = useState(orderNo);
    const { setFlashMessage, setFlashStatus } = useFlashMessage();
    const [review, setReview] = useState();
    const shippingFee = 79;

    const totalPages = Math.ceil((orderItem?.length || 0) / itemsPerPage);

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
            setExpanded(null);
        }
    };

    useEffect(() => {
        setExpanded(orderNo);
    }, [orderNo]);

    const handleAccordionChange = (orderID) => {
        setExpanded(expanded === orderID ? null : orderID);
    };

    const paginatedOrders = orderItem?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
    );

    useEffect(() => {
        if (rating !== null) {
            setRatingError(false);
        }
    }, [rating]);

    useEffect(() => {
        getReview((response) => {
            setReview(response.reviews);
        });
    }, []);

    const submitReview = () => {
        if (!rating) {
            setRatingError(true);
        } else if (rating) {
            const reviewData = {
                productID: reviewItem?.product.productID,
                orderID: reviewOrder?.orderID,
                rating: rating,
                feedback: feedback,
            };

            productReview(reviewData, (response) => {
                if (response.status === "success") {
                    setIsReviewOpen(false);
                    setReviewItem(null);
                    setRating(null);
                    setRatingError(false);
                    setFeedback(null);
                    getReview((response) => {
                        setReview(response.reviews);
                    });
                }

                setFlashMessage(response.message);
                setFlashStatus(response.status);
            });
        }
    };

    return (
        <>
            <Grid2 container spacing={3}>
                <Grid2 size={{ xs: 12 }}>
                    <Typography className={styles.tabTitle}>
                        My orders
                    </Typography>
                </Grid2>
                <Grid2 size={{ xs: 12 }}>
                    {orderItem && orderItem.length > 0 ? (
                        <Box className={styles.ordersContainer}>
                            {paginatedOrders?.map((order, index) => (
                                <Accordion
                                    key={index}
                                    expanded={expanded === order.orderID}
                                    onChange={() =>
                                        handleAccordionChange(order.orderID)
                                    }
                                    sx={{ margin: "10px 0" }}
                                >
                                    <AccordionSummary
                                        expandIcon={<ExpandMore />}
                                    >
                                        <Box className={styles.orderSummary}>
                                            <Box>
                                                <Typography
                                                    className={
                                                        styles.orderSummaryTitle
                                                    }
                                                >
                                                    Order No. {order.orderID}
                                                </Typography>
                                                {isMobile && (
                                                    <Box
                                                        className={
                                                            styles.orderChip
                                                        }
                                                    >
                                                        <Chip
                                                            label={
                                                                order.orderStatus
                                                            }
                                                            color={
                                                                order.orderStatus ===
                                                                "Completed"
                                                                    ? "success"
                                                                    : order.orderStatus ===
                                                                        "Cancelled"
                                                                      ? "error"
                                                                      : "default"
                                                            }
                                                        />
                                                        {order.orderStatus ===
                                                        "Active" ? (
                                                            <Chip
                                                                label={
                                                                    order.fulfillmentStatus
                                                                }
                                                            />
                                                        ) : null}
                                                    </Box>
                                                )}
                                            </Box>
                                            {!isMobile && (
                                                <Box
                                                    className={styles.orderChip}
                                                >
                                                    <Chip
                                                        label={
                                                            order.orderStatus
                                                        }
                                                        color={
                                                            order.orderStatus ===
                                                            "Completed"
                                                                ? "success"
                                                                : order.orderStatus ===
                                                                    "Cancelled"
                                                                  ? "error"
                                                                  : "default"
                                                        }
                                                    />
                                                    {order.orderStatus ===
                                                    "Active" ? (
                                                        <Chip
                                                            label={
                                                                order.fulfillmentStatus
                                                            }
                                                        />
                                                    ) : null}
                                                </Box>
                                            )}
                                        </Box>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Box
                                            className={styles.orderDescription}
                                        >
                                            {order.orderItems?.map(
                                                (item, index) => (
                                                    <Box
                                                        className={
                                                            styles.productList
                                                        }
                                                        key={index}
                                                    >
                                                        <Box
                                                            className={
                                                                styles.productBox
                                                            }
                                                        >
                                                            <Box
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
                                                                            item
                                                                                .product
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
                                                                            item.orderItemPrice
                                                                        }
                                                                    </Typography>
                                                                </Box>
                                                            </Box>
                                                            {isMobile ? (
                                                                order.orderStatus ===
                                                                    "Completed" &&
                                                                !review?.some(
                                                                    (review) =>
                                                                        review.productID ===
                                                                            item
                                                                                .product
                                                                                .productID &&
                                                                        review.orderID ===
                                                                            order.orderID,
                                                                ) ? (
                                                                    <Button
                                                                        className={
                                                                            styles.reviewButton
                                                                        }
                                                                        onClick={() => {
                                                                            setIsReviewOpen(
                                                                                true,
                                                                            );
                                                                            setReviewItem(
                                                                                item,
                                                                            );
                                                                            setReviewOrder(
                                                                                order,
                                                                            );
                                                                        }}
                                                                    >
                                                                        Review
                                                                    </Button>
                                                                ) : null
                                                            ) : (
                                                                <>
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
                                                                            {
                                                                                item.orderItemQuantity
                                                                            }{" "}
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
                                                                            ₱{" "}
                                                                            {
                                                                                item.orderItemTotal
                                                                            }
                                                                        </Typography>
                                                                    </Box>
                                                                    {order.orderStatus ===
                                                                        "Completed" &&
                                                                    !review?.some(
                                                                        (
                                                                            review,
                                                                        ) =>
                                                                            review.productID ===
                                                                                item
                                                                                    .product
                                                                                    .productID &&
                                                                            review.orderID ===
                                                                                order.orderID,
                                                                    ) ? (
                                                                        <Button
                                                                            className={
                                                                                styles.reviewButton
                                                                            }
                                                                            onClick={() => {
                                                                                setIsReviewOpen(
                                                                                    true,
                                                                                );
                                                                                setReviewItem(
                                                                                    item,
                                                                                );
                                                                                setReviewOrder(
                                                                                    order,
                                                                                );
                                                                            }}
                                                                        >
                                                                            Review
                                                                        </Button>
                                                                    ) : null}
                                                                </>
                                                            )}
                                                        </Box>
                                                        <Box
                                                            className={
                                                                styles.productBoxBottom
                                                            }
                                                        >
                                                            {isMobile && (
                                                                <>
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
                                                                            {
                                                                                item.orderItemQuantity
                                                                            }{" "}
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
                                                                            ₱{" "}
                                                                            {
                                                                                item.orderItemTotal
                                                                            }
                                                                        </Typography>
                                                                    </Box>
                                                                </>
                                                            )}
                                                        </Box>
                                                    </Box>
                                                ),
                                            )}
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
                                                                <strong>
                                                                    {
                                                                        order
                                                                            .orderDeliveryDetails
                                                                            .deliveryFullName
                                                                    }
                                                                </strong>
                                                                , 0
                                                                {
                                                                    order
                                                                        .orderDeliveryDetails
                                                                        .deliveryPhoneNo
                                                                }
                                                            </Typography>
                                                            <Typography>
                                                                {order
                                                                    .orderDeliveryDetails
                                                                    .deliveryAddressExtra &&
                                                                    `${order.orderDeliveryDetails.deliveryAddressExtra}, `}
                                                                {
                                                                    order
                                                                        .orderDeliveryDetails
                                                                        .deliveryAddress
                                                                }
                                                                ,{" "}
                                                                {
                                                                    order
                                                                        .orderDeliveryDetails
                                                                        .deliveryBarangay
                                                                }
                                                                ,{" "}
                                                                {
                                                                    order
                                                                        .orderDeliveryDetails
                                                                        .deliveryCity
                                                                }
                                                                ,{" "}
                                                                {
                                                                    order
                                                                        .orderDeliveryDetails
                                                                        .deliveryProvince
                                                                }
                                                                ,{" "}
                                                                {
                                                                    order
                                                                        .orderDeliveryDetails
                                                                        .deliveryRegion
                                                                }
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
                                                                {
                                                                    order.orderDateTime
                                                                }
                                                            </Typography>
                                                            <Typography>
                                                                Payment option:{" "}
                                                                {order.orderPaymentMethod ==
                                                                "cod"
                                                                    ? "Cash On Delivery"
                                                                    : "Online Payment"}
                                                            </Typography>
                                                            <Box
                                                                className={
                                                                    styles.paymentDetails
                                                                }
                                                            >
                                                                <Chip
                                                                    label={
                                                                        order.paymentStatus
                                                                    }
                                                                    color={
                                                                        order.paymentStatus ===
                                                                        "Paid"
                                                                            ? "success"
                                                                            : order.paymentStatus ===
                                                                                "Refunded"
                                                                              ? "error"
                                                                              : "default"
                                                                    }
                                                                />
                                                                {order.paymentStatus ==
                                                                    "Pending" &&
                                                                    order.paymentLink && (
                                                                        <Button
                                                                            className={
                                                                                styles.payNowButton
                                                                            }
                                                                            onClick={() =>
                                                                                window.open(
                                                                                    order.paymentLink,
                                                                                    "_blank",
                                                                                )
                                                                            }
                                                                        >
                                                                            Pay
                                                                            now
                                                                        </Button>
                                                                    )}
                                                            </Box>
                                                        </Box>
                                                        <Box
                                                            className={
                                                                styles.orderDetailsBox
                                                            }
                                                        >
                                                            <Typography>
                                                                Subtotal: ₱{" "}
                                                                {(
                                                                    parseFloat(
                                                                        order.orderTotal,
                                                                    ) -
                                                                    parseFloat(
                                                                        shippingFee,
                                                                    )
                                                                ).toFixed(2)}
                                                            </Typography>
                                                            <Typography>
                                                                Shipping fee: ₱{" "}
                                                                {shippingFee}
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
                                                                {
                                                                    order.orderTotal
                                                                }
                                                            </Typography>
                                                        </Box>
                                                    </Grid2>
                                                </Grid2>
                                            </Box>
                                        </Box>
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                            <Pagination
                                count={totalPages}
                                page={currentPage}
                                onChange={(event, newPage) =>
                                    handlePageChange(newPage)
                                }
                                className={styles.orderPagination}
                            />
                        </Box>
                    ) : (
                        <Typography className={styles.orderNoItemsText}>
                            No orders.
                        </Typography>
                    )}
                </Grid2>
            </Grid2>
            <Modal open={isReviewOpen} className={styles.reviewModal}>
                <Box className={styles.reviewContainer}>
                    <IconButton
                        className={styles.modalCloseButton}
                        onClick={() => {
                            setIsReviewOpen(false);
                            setRating(null);
                            setRatingError(false);
                            setFeedback(null);
                        }}
                    >
                        <Close />
                    </IconButton>
                    <Typography className={styles.reviewModalText}>
                        Review our product
                    </Typography>
                    <Box className={styles.reviewProductBox}>
                        <CardMedia
                            component="img"
                            image={`/hydrogen/${reviewItem?.product.productImage}`}
                            className={styles.reviewProductImage}
                        />
                        <Typography className={styles.reviewProductName}>
                            {reviewItem?.product.productName}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography className={styles.ratingTitle}>
                            Overall Rating:
                        </Typography>
                        <Rating
                            precision={0.5}
                            onChange={(event, newValue) => {
                                setRating(newValue);
                            }}
                            size="large"
                        />
                        {ratingError && (
                            <Typography className={styles.ratingErrorText}>
                                Provide rating
                            </Typography>
                        )}
                    </Box>

                    <TextField
                        label="Review Feedback (Optional)"
                        multiline
                        maxRows={4}
                        onChange={(e) => setFeedback(e.target.value)}
                    />
                    <Box className={styles.removeModalButtons}>
                        <Button
                            className={styles.removeCancel}
                            onClick={() => {
                                setIsReviewOpen(false);
                                setReviewItem(null);
                                setRating(null);
                                setRatingError(false);
                                setFeedback(null);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            className={styles.removeRemove}
                            onClick={() => {
                                submitReview();
                            }}
                        >
                            Review
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}
