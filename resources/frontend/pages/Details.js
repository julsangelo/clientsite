import React, { useEffect, useState } from "react";
import styles from "./Details.module";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
    Box,
    Button,
    CardMedia,
    Container,
    Divider,
    Grid2,
    IconButton,
    Tab,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { getCart, updateItemQuantity } from "../ajax/backend";
import { Link } from "react-router-dom";
import { Add, DeleteOutline, Remove } from "@mui/icons-material";

export default function Cart() {
    const [value, setValue] = useState("0");
    const [cartItem, setCartItem] = useState();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        getCart((data) => {
            setCartItem(data);
        });
    }, [handleMinus]);

    const handleAdd = (productCode) => {
        const updatedcart = cartItem.map((item) =>
            item.productCode === productCode
                ? { ...item, quantity: item.quantity + 1 }
                : item,
        );
        setCartItem(updatedcart);
        updateItemQuantity(productCode, "increment");
    };

    const handleMinus = (productCode) => {
        setCartItem((prevcart) => {
            const updatedcart = prevcart
                .map((item) =>
                    item.productCode === productCode
                        ? { ...item, quantity: item.quantity - 1 }
                        : item,
                )
                .filter((item) => item.quantity > 0);

            return [...updatedcart];
        });

        updateItemQuantity(productCode, "decrement");
    };

    const total = (cartItem || [])
        .reduce(
            (sum, item) => sum + parseFloat(item.productPrice) * item.quantity,
            0,
        )
        .toFixed(2);

    return (
        <div className={styles.page}>
            <Navbar />
            <div className={styles.cart}>
                <Container maxWidth="xl">
                    <TabContext value={value}>
                        <Grid2 container>
                            <Grid2 size={{ xs: 12, md: 2 }}>
                                <TabList
                                    onChange={handleChange}
                                    orientation={
                                        isSmallScreen
                                            ? "horizontal"
                                            : "vertical"
                                    }
                                >
                                    <Tab label="My cart" value="0" />
                                    <Tab label="My Addresses" value="1" />
                                </TabList>
                            </Grid2>
                            <Grid2 size={{ xs: 12, md: 10 }}>
                                <TabPanel value="0">
                                    <Grid2 container spacing={3}>
                                        <Grid2 size={{ xs: 12, lg: 8 }}>
                                            <Typography
                                                className={styles.tabTitle}
                                            >
                                                My cart
                                            </Typography>
                                            <Box
                                                className={
                                                    styles.cartItemDetails
                                                }
                                            >
                                                {cartItem &&
                                                cartItem.length > 0 ? (
                                                    <>
                                                        {cartItem?.map(
                                                            (item, index) => (
                                                                <Box>
                                                                    <Box
                                                                        className={
                                                                            styles.cartList
                                                                        }
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
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
                                                                                    {
                                                                                        item.productName
                                                                                    }
                                                                                </Typography>
                                                                                <Typography
                                                                                    className={
                                                                                        styles.cartDetailsPrice
                                                                                    }
                                                                                >
                                                                                    ₱{" "}
                                                                                    {
                                                                                        item.productPrice
                                                                                    }
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
                                                                                            {
                                                                                                item.quantity
                                                                                            }
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
                                                                                        ).toFixed(
                                                                                            2,
                                                                                        )}
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
                                                                                        {
                                                                                            item.quantity
                                                                                        }
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
                                                                                ).toFixed(
                                                                                    2,
                                                                                )}
                                                                            </Typography>
                                                                        </Box>
                                                                    ) : null}
                                                                </Box>
                                                            ),
                                                        )}
                                                    </>
                                                ) : (
                                                    <Typography
                                                        className={
                                                            styles.cartNoItemsText
                                                        }
                                                    >
                                                        No items in cart.
                                                    </Typography>
                                                )}
                                            </Box>
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, lg: 4 }}>
                                            <Box
                                                className={
                                                    styles.totalContainer
                                                }
                                            >
                                                <Box
                                                    className={styles.cartTotal}
                                                >
                                                    <Typography
                                                        className={
                                                            styles.cartTotalText
                                                        }
                                                    >
                                                        Total
                                                    </Typography>
                                                    <Typography
                                                        className={
                                                            styles.cartTotalText
                                                        }
                                                    >
                                                        ₱ {total}
                                                    </Typography>
                                                </Box>
                                                <Divider orientation="horizontal" />
                                                <Box
                                                    className={
                                                        styles.cartMessage
                                                    }
                                                >
                                                    <Typography
                                                        className={
                                                            styles.cartMessageText
                                                        }
                                                    >
                                                        Tax included. Shipping
                                                        calculated at checkout.
                                                    </Typography>
                                                </Box>
                                                <Box
                                                    className={
                                                        styles.cartButtons
                                                    }
                                                >
                                                    <Button
                                                        className={
                                                            styles.cartCheckout
                                                        }
                                                        component={Link}
                                                        to="/checkout"
                                                    >
                                                        Checkout
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </Grid2>
                                    </Grid2>
                                </TabPanel>
                                <TabPanel value="1"></TabPanel>
                            </Grid2>
                        </Grid2>
                    </TabContext>
                </Container>
            </div>
            <Footer />
        </div>
    );
}
