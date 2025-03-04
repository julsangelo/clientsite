import React, { useContext, useEffect, useState } from "react";
import styles from "./Navbar.module";
import {
    AppBar,
    List,
    Button,
    Container,
    Typography,
    ListItemButton,
    ListItemText,
    InputBase,
    Box,
    IconButton,
    Collapse,
    CardMedia,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    useMediaQuery,
    useTheme,
    Divider,
} from "@mui/material";
import {
    AccountCircle,
    Add,
    Close,
    DeleteOutline,
    ExpandMore,
    ListAlt,
    Logout,
    Place,
    Remove,
    Search,
    ShoppingCart,
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { ReferenceContext } from "../context/ReferenceProvider";
import { Link } from "react-router-dom";
import { getCart, signOut, updateItemQuantity } from "../ajax/backend";
import AuthModal from "./AuthModal";
import { useAuth } from "../context/AuthContext";
import { useFlashMessage } from "../context/FlashMessage";
import MobileNavbar from "./Navbar/MobileNavbar";
import DesktopNavbar from "./Navbar/DesktopNavbar";

export default function Navbar() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [menu, setMenu] = useState(null);
    const [cart, setCart] = useState(null);
    const [shop, setShop] = useState(null);
    const [settings, setSettings] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const { references } = useContext(ReferenceContext);
    const [cartItem, setCartItem] = useState([]);
    const { isLoggedIn, user, setIsLoggedIn, setUser } = useAuth();
    const { setFlashMessage, setFlashStatus } = useFlashMessage();

    const handleMenu = (event) => {
        setMenu((prev) => (prev ? null : event.currentTarget));
        setCart(null);
        setShop(null);
        setSettings(null);
    };

    const handleShop = (event) => {
        setShop((prev) => (prev ? null : event.currentTarget));
        setCart(null);
        setMenu(null);
        setSettings(null);
    };

    const handleCart = (event) => {
        setCart((prev) => (prev ? null : event.currentTarget));
        setMenu(null);
        setShop(null);
        setSettings(null);
    };

    const handleSettings = (event) => {
        setSettings((prev) => (prev ? null : event.currentTarget));
        setMenu(null);
        setCart(null);
        setShop(null);
    };

    const handleModalOpen = () => setModalOpen(true);

    const menuOpen = Boolean(menu);
    const shopOpen = Boolean(shop);
    const cartOpen = Boolean(cart);
    const settingsOpen = Boolean(settings);

    const handleSignOut = () => {
        signOut((response) => {
            setFlashMessage(response.message);
            setFlashStatus(response.status);
            setIsLoggedIn(false);
            setUser(null);
            window.location.reload();
        });
    };

    useEffect(() => {
        if (cartOpen) {
            getCart((data) => {
                setCartItem(data);
            });
        }
    }, [cartOpen, handleMinus]);

    const handleAdd = (productCode) => {
        const updatedCart = cartItem.map((item) =>
            item.productCode === productCode
                ? { ...item, quantity: item.quantity + 1 }
                : item,
        );
        setCartItem(updatedCart);
        updateItemQuantity(productCode, "increment");
    };

    const handleMinus = (productCode) => {
        setCartItem((prevCart) => {
            const updatedCart = prevCart
                .map((item) =>
                    item.productCode === productCode
                        ? { ...item, quantity: item.quantity - 1 }
                        : item,
                )
                .filter((item) => item.quantity > 0);

            return [...updatedCart];
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
        <AppBar position="static" className={styles.navbar}>
            <Container maxWidth="xl" className={styles.navbarContainer}>
                {isMobile ? (
                    <MobileNavbar
                        handleMenu={handleMenu}
                        handleCart={handleCart}
                        handleAdd={handleAdd}
                        handleMinus={handleMinus}
                        handleModalOpen={handleModalOpen}
                        handleSignOut={handleSignOut}
                        menuOpen={menuOpen}
                        cartOpen={cartOpen}
                        cartItem={cartItem}
                        total={total}
                        user={user}
                        isLoggedIn={isLoggedIn}
                        references={references}
                    />
                ) : (
                    <DesktopNavbar
                        handleCart={handleCart}
                        handleShop={handleShop}
                        handleSettings={handleSettings}
                        handleAdd={handleAdd}
                        handleMinus={handleMinus}
                        handleModalOpen={handleModalOpen}
                        handleSignOut={handleSignOut}
                        cartOpen={cartOpen}
                        shopOpen={shopOpen}
                        settingsOpen={settingsOpen}
                        cartItem={cartItem}
                        total={total}
                        user={user}
                        isLoggedIn={isLoggedIn}
                        references={references}
                    />
                )}
            </Container>
            <AuthModal
                isOpen={modalOpen}
                setModalOpen={setModalOpen}
                setIsLoggedIn={setIsLoggedIn}
                setUser={setUser}
                setMenu={setMenu}
            />
        </AppBar>
    );
}
