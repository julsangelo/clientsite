import React, { useEffect, useState } from "react";
import styles from "./Details.module";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
    Box,
    Button,
    Container,
    Grid2,
    IconButton,
    Modal,
    Tab,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
    getCart,
    getOrders,
    removeItem,
    updateItemQuantity,
} from "../ajax/backend";
import { useLocation } from "react-router-dom";
import { Close } from "@mui/icons-material";
import OrdersPanel from "../components/Details/OrderPanel";
import CartPanel from "../components/Details/CartPanel";
import { useFlashMessage } from "../context/FlashMessage";

export default function Cart() {
    const location = useLocation();
    const [value, setValue] = useState("0");
    const [orderItem, setOrderItem] = useState();
    const [cartItem, setCartItem] = useState();
    const [removeItemCode, setRemoveItemCode] = useState();
    const [isRemoveOpen, setIsRemoveOpen] = useState(false);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const { setFlashMessage, setFlashStatus } = useFlashMessage();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        if (location.state?.value !== undefined) {
            setValue(String(location.state.value));
        }
    }, [location.state]);

    useEffect(() => {
        getOrders((response) => {
            setOrderItem(response);
        });
    }, []);

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

    const handleRemoveItem = () => {
        removeItem(removeItemCode, (response) => {
            setFlashMessage(response.message);
            setFlashStatus(response.status);
            if (response.status === "success") {
                setIsRemoveOpen(false);
                getCart((data) => {
                    setCartItem(data);
                });
            }
        });
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
                                    <Tab label="My Orders" value="0" />
                                    <Tab label="My Cart" value="1" />
                                    <Tab label="My Addresses" value="2" />
                                </TabList>
                            </Grid2>
                            <Grid2 size={{ xs: 12, md: 10 }}>
                                <TabPanel value="0">
                                    <OrdersPanel orderItem={orderItem} />
                                </TabPanel>
                                <TabPanel value="1">
                                    <CartPanel
                                        cartItem={cartItem}
                                        total={total}
                                        isMobile={isMobile}
                                        handleAdd={handleAdd}
                                        handleMinus={handleMinus}
                                        setIsRemoveOpen={setIsRemoveOpen}
                                        setRemoveItemCode={setRemoveItemCode}
                                    />
                                </TabPanel>
                                <TabPanel value="2"></TabPanel>
                            </Grid2>
                        </Grid2>
                    </TabContext>
                </Container>
            </div>
            <Footer />
            <Modal open={isRemoveOpen} className={styles.removeModal}>
                <Box className={styles.removeContainer}>
                    <IconButton
                        className={styles.modalCloseButton}
                        onClick={() => {
                            setIsRemoveOpen(false);
                        }}
                    >
                        <Close />
                    </IconButton>
                    <Typography className={styles.removeModalText}>
                        Are you sure to remove this product?
                    </Typography>
                    <Box className={styles.removeModalButtons}>
                        <Button
                            className={styles.removeCancel}
                            onClick={() => {
                                setIsRemoveOpen(false);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            className={styles.removeRemove}
                            onClick={handleRemoveItem}
                        >
                            Remove
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
