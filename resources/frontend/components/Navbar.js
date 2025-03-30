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
import { useReference } from "../context/ReferenceProvider";
import { Link } from "react-router-dom";
import {
    getCart,
    getProducts,
    signOut,
    updateItemQuantity,
} from "../ajax/backend";
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
    const [search, setSearch] = useState(null);
    const [settings, setSettings] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const { references } = useReference();
    const [cartItem, setCartItem] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [product, setProduct] = useState();
    const [filteredProducts, setFilteredProducts] = useState();
    const { isLoggedIn, user, toggleUpdate } = useAuth();
    const { setFlashMessage, setFlashStatus } = useFlashMessage();

    const handleMenu = (event) => {
        setMenu((prev) => (prev ? null : event.currentTarget));
        setCart(null);
        setShop(null);
        setSettings(null);
        setSearch(null);
    };

    const handleShop = (event) => {
        setShop((prev) => (prev ? null : event.currentTarget));
        setCart(null);
        setMenu(null);
        setSettings(null);
        setSearch(null);
    };

    const handleCart = (event) => {
        setCart((prev) => (prev ? null : event.currentTarget));
        setMenu(null);
        setShop(null);
        setSettings(null);
        setSearch(null);
    };

    const handleSettings = (event) => {
        setSettings((prev) => (prev ? null : event.currentTarget));
        setMenu(null);
        setCart(null);
        setShop(null);
        setSearch(null);
    };

    const handleSearch = (event) => {
        setSearch((prev) => (prev ? null : event.currentTarget));
        setMenu(null);
        setCart(null);
        setShop(null);
        setSettings(null);
    };

    const handleModalOpen = () => setModalOpen(true);

    const menuOpen = Boolean(menu);
    const shopOpen = Boolean(shop);
    const cartOpen = Boolean(cart);
    const settingsOpen = Boolean(settings);
    const searchOpen = Boolean(search);

    useEffect(() => {
        const handleClickOutside = (event) => {
            const navbar = document.querySelector(`.${styles.navbar}`);
            if (navbar && !navbar.contains(event.target)) {
                setMenu(null);
                setCart(null);
                setShop(null);
                setSettings(null);
                setSearch(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSignOut = () => {
        signOut((response) => {
            setFlashMessage(response.message);
            setFlashStatus(response.status);
            toggleUpdate();
            window.location.href = "/";
        });
    };

    useEffect(() => {
        getProducts((response) => {
            setProduct(response.allProducts);
        });
    }, []);

    useEffect(() => {
        if (cartOpen) {
            getCart((data) => {
                setCartItem(data);
            });
        }
    }, [cartOpen, handleMinus]);

    const handleSearchQuery = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        if (!query.trim()) {
            setSearch(null);
            setFilteredProducts([]);
        } else {
            setSearch(event.currentTarget);
            const filteredProducts = product.filter((item) =>
                item.productName.toLowerCase().includes(query),
            );
            setFilteredProducts(filteredProducts);
        }
    };

    const handleAdd = (productID) => {
        const updatedCart = cartItem.map((item) =>
            item.productID === productID
                ? { ...item, quantity: item.quantity + 1 }
                : item,
        );

        setCartItem(updatedCart);
        updateItemQuantity(productID, "increment");
    };

    const handleMinus = (productID) => {
        console.log(cartOpen);
        setCartItem((prevCart) => {
            const updatedCart = prevCart
                .map((item) =>
                    item.productID === productID
                        ? { ...item, quantity: item.quantity - 1 }
                        : item,
                )
                .filter((item) => item.quantity > 0);

            return [...updatedCart];
        });

        updateItemQuantity(productID, "decrement");
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
                        searchOpen={searchOpen}
                        searchQuery={searchQuery}
                        handleSearchQuery={handleSearchQuery}
                        filteredProducts={filteredProducts}
                        handleSearch={handleSearch}
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
                        handleSearch={handleSearch}
                        cartOpen={cartOpen}
                        shopOpen={shopOpen}
                        settingsOpen={settingsOpen}
                        cartItem={cartItem}
                        total={total}
                        user={user}
                        isLoggedIn={isLoggedIn}
                        references={references}
                        searchOpen={searchOpen}
                        searchQuery={searchQuery}
                        handleSearchQuery={handleSearchQuery}
                        filteredProducts={filteredProducts}
                    />
                )}
            </Container>
            <AuthModal
                isOpen={modalOpen}
                setModalOpen={setModalOpen}
                setMenu={setMenu}
                toggleUpdate={toggleUpdate}
            />
        </AppBar>
    );
}
