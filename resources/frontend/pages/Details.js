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
    deleteAddress,
    getAllAddress,
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
import AddressPanel from "../components/Details/AddressPanel";
import SettingsPanel from "../components/Details/SettingsPanel";
import Bot from "../components/Bot";

export default function Cart() {
    const location = useLocation();
    const [value, setValue] = useState("0");
    const [orderItem, setOrderItem] = useState();
    const [cartItem, setCartItem] = useState();
    const [addressItem, setAddressItem] = useState();
    const [addressUpdated, setAddressUpdated] = useState(false);
    const [removeItemID, setRemoveItemID] = useState();
    const [deleteAddressID, setDeleteAddressID] = useState();
    const [isRemoveOpen, setIsRemoveOpen] = useState(false);
    const [removeItemType, setRemoveItemType] = useState("");
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
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

    useEffect(() => {
        getAllAddress((response) => {
            setAddressItem(response.allAddress);
        });
    }, [addressUpdated]);

    const handleAdd = (productID) => {
        const updatedcart = cartItem.map((item) =>
            item.productID === productID
                ? { ...item, quantity: item.quantity + 1 }
                : item,
        );
        setCartItem(updatedcart);
        updateItemQuantity(productID, "increment");
    };

    const handleMinus = (productID) => {
        setCartItem((prevcart) => {
            const updatedcart = prevcart
                .map((item) =>
                    item.productID === productID
                        ? { ...item, quantity: item.quantity - 1 }
                        : item,
                )
                .filter((item) => item.quantity > 0);

            return [...updatedcart];
        });

        updateItemQuantity(productID, "decrement");
    };

    const handleRemoveItem = () => {
        if (removeItemType === "cart") {
            removeItem(removeItemID, (response) => {
                setFlashMessage(response.message);
                setFlashStatus(response.status);
                if (response.status === "success") {
                    setIsRemoveOpen(false);
                    getCart((data) => {
                        setCartItem(data);
                    });
                }
            });
        } else if (removeItemType === "address") {
            deleteAddress(deleteAddressID, (response) => {
                setFlashMessage(response.message);
                setFlashStatus(response.status);
                if (response.status === "success") {
                    setIsRemoveOpen(false);
                    getAllAddress((data) => {
                        setAddressItem(data.allAddress);
                    });
                }
            });
        }
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
                                        isMobile ? "horizontal" : "vertical"
                                    }
                                >
                                    <Tab label="My Orders" value="0" />
                                    <Tab label="My Cart" value="1" />
                                    <Tab label="My Addresses" value="2" />
                                    <Tab label="Profile Settings" value="3" />
                                </TabList>
                            </Grid2>
                            <Grid2 size={{ xs: 12, md: 10 }}>
                                <TabPanel value="0">
                                    <OrdersPanel
                                        orderItem={orderItem}
                                        isMobile={isMobile}
                                    />
                                </TabPanel>
                                <TabPanel value="1">
                                    <CartPanel
                                        cartItem={cartItem}
                                        total={total}
                                        isMobile={isMobile}
                                        handleAdd={handleAdd}
                                        handleMinus={handleMinus}
                                        setIsRemoveOpen={setIsRemoveOpen}
                                        setRemoveItemID={setRemoveItemID}
                                        setRemoveItemType={setRemoveItemType}
                                    />
                                </TabPanel>
                                <TabPanel value="2">
                                    <AddressPanel
                                        addressItem={addressItem}
                                        setAddressUpdated={setAddressUpdated}
                                        setIsRemoveOpen={setIsRemoveOpen}
                                        setDeleteAddressID={setDeleteAddressID}
                                        setRemoveItemType={setRemoveItemType}
                                    />
                                </TabPanel>
                                <TabPanel value="3">
                                    <SettingsPanel
                                        orderItem={orderItem}
                                        isMobile={isMobile}
                                    />
                                </TabPanel>
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

                    {removeItemType == "cart" ? (
                        <Typography className={styles.removeModalText}>
                            Are you sure to remove this item?
                        </Typography>
                    ) : (
                        <Typography className={styles.removeModalText}>
                            Are you sure to remove this address?
                        </Typography>
                    )}

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
            <Bot />
        </div>
    );
}
