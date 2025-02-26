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
    Remove,
    Search,
    ShoppingCart,
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { ReferenceContext } from "../context/ReferenceProvider";
import { Link } from "react-router-dom";
import { getCart, updateItemQuantity } from "../ajax/backend";
import AuthModal from "./AuthModal";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [menu, setMenu] = useState(null);
    const [cart, setCart] = useState(null);
    const [shop, setShop] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const { references } = useContext(ReferenceContext);
    const [cartItem, setCartItem] = useState(null);
    const { isLoggedIn, user } = useAuth();

    const handleMenu = (event) => {
        setMenu((prev) => (prev ? null : event.currentTarget));
        setCart(null);
        setShop(null);
    };

    const handleShop = (event) => {
        setShop((prev) => (prev ? null : event.currentTarget));
        setCart(null);
        setMenu(null);
    };

    const handleCart = (event) => {
        setCart((prev) => (prev ? null : event.currentTarget));
        setMenu(null);
        setShop(null);
    };

    const handleModalOpen = () => setModalOpen(true);

    const menuOpen = Boolean(menu);
    const shopOpen = Boolean(shop);
    const cartOpen = Boolean(cart);

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
                    <>
                        <IconButton
                            className={styles.mobileNavbarButton}
                            onClick={handleMenu}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Box className={styles.menuPopover}>
                            <Collapse
                                in={menuOpen}
                                orientation="horizontal"
                                collapsedSize="0px"
                            >
                                <Box className={styles.popoverContainer}></Box>
                            </Collapse>
                        </Box>
                        <Box className={styles.menuPopover}>
                            <Collapse
                                orientation="horizontal"
                                in={menuOpen}
                                collapsedSize="0px"
                            >
                                <Box className={styles.menuPopoverBox}>
                                    <IconButton
                                        onClick={handleMenu}
                                        className={styles.closeButton}
                                    >
                                        <Close />
                                    </IconButton>
                                    <List>
                                        <ListItemButton
                                            to="/"
                                            className={
                                                styles.mobileNavLinkButton
                                            }
                                        >
                                            <ListItemText>Home</ListItemText>
                                        </ListItemButton>
                                        <Box className={styles.mobileAccordion}>
                                            <Accordion
                                                sx={{
                                                    backgroundColor: "inherit",
                                                    color: "inherit",
                                                    boxShadow: "none",
                                                    "&:before": {
                                                        display: "none",
                                                    },
                                                }}
                                            >
                                                <AccordionSummary
                                                    expandIcon={<ExpandMore />}
                                                >
                                                    <Typography>
                                                        Shop
                                                    </Typography>
                                                </AccordionSummary>
                                                <AccordionDetails
                                                    className={
                                                        styles.mobileAccordionDetails
                                                    }
                                                >
                                                    <List>
                                                        <ListItemButton
                                                            to="/shop"
                                                            component={Link}
                                                            state={{
                                                                categoryID: 0,
                                                                categoryName:
                                                                    "All Products",
                                                            }}
                                                        >
                                                            <ListItemText>
                                                                All Products
                                                            </ListItemText>
                                                        </ListItemButton>
                                                        {references?.productCategory?.map(
                                                            (item, index) => (
                                                                <ListItemButton
                                                                    key={index}
                                                                    component={
                                                                        Link
                                                                    }
                                                                    to={`/shop/${item.productCategoryName.toLowerCase()}`}
                                                                    state={{
                                                                        categoryID:
                                                                            item.productCategoryID,
                                                                        categoryName:
                                                                            item.productCategoryName,
                                                                    }}
                                                                >
                                                                    <ListItemText>
                                                                        {
                                                                            item.productCategoryName
                                                                        }
                                                                    </ListItemText>
                                                                </ListItemButton>
                                                            ),
                                                        )}
                                                    </List>
                                                </AccordionDetails>
                                            </Accordion>
                                        </Box>
                                        <ListItemButton
                                            to="/about"
                                            className={
                                                styles.mobileNavLinkButton
                                            }
                                        >
                                            <ListItemText>About</ListItemText>
                                        </ListItemButton>
                                        <ListItemButton
                                            to="/contact"
                                            className={
                                                styles.mobileNavLinkButton
                                            }
                                        >
                                            <ListItemText>Contact</ListItemText>
                                        </ListItemButton>
                                    </List>
                                    <Box
                                        className={
                                            styles.mobileNavbarSearchContainer
                                        }
                                    >
                                        <Search />
                                        <InputBase
                                            placeholder="Search products"
                                            className={
                                                styles.mobileNavbarSearchInput
                                            }
                                        />
                                    </Box>
                                    <Button
                                        className={
                                            styles.mobileNavbarLoginButton
                                        }
                                        onClick={handleModalOpen}
                                    >
                                        Sign In
                                    </Button>
                                </Box>
                            </Collapse>
                        </Box>
                        <Typography className={styles.navbarBrand}>
                            Cliff
                        </Typography>
                        <IconButton
                            className={styles.mobileNavbarButton}
                            onClick={handleCart}
                        >
                            <ShoppingCart />
                        </IconButton>
                        <Box className={styles.cartPopover}>
                            <Collapse
                                in={cartOpen}
                                orientation="horizontal"
                                collapsedSize="0px"
                            >
                                <Box className={styles.popoverContainer}></Box>
                            </Collapse>
                        </Box>
                        <Box className={styles.cartPopover}>
                            <Collapse
                                in={cartOpen}
                                orientation="horizontal"
                                collapsedSize="0px"
                            >
                                <Box className={styles.mobileCartInfo}>
                                    <IconButton
                                        onClick={handleCart}
                                        className={styles.closeButton}
                                    >
                                        <Close />
                                    </IconButton>
                                    {cartItem && cartItem.length > 0 ? (
                                        <>
                                            {cartItem?.map((item, index) => (
                                                <>
                                                    <Box
                                                        className={
                                                            styles.mobileCartList
                                                        }
                                                        key={index}
                                                    >
                                                        <CardMedia
                                                            component="img"
                                                            image={`/hydrogen/${item.productImage}`}
                                                            className={
                                                                styles.mobileCartListImage
                                                            }
                                                        />
                                                        <Box
                                                            className={
                                                                styles.mobileCartDetails
                                                            }
                                                        >
                                                            <Typography
                                                                className={
                                                                    styles.mobileCartDetailsName
                                                                }
                                                            >
                                                                {
                                                                    item.productName
                                                                }
                                                            </Typography>
                                                            <Typography
                                                                className={
                                                                    styles.mobileCartDetailsPrice
                                                                }
                                                            >
                                                                ₱{" "}
                                                                {
                                                                    item.productPrice
                                                                }
                                                            </Typography>
                                                        </Box>
                                                        <Box
                                                            className={
                                                                styles.mobileCartQuantity
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
                                                    </Box>
                                                    <Box>
                                                        <Typography
                                                            className={
                                                                styles.mobileItemPrice
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
                                            ))}
                                            <Divider orientation="horizontal" />
                                            <Box
                                                className={
                                                    styles.mobileCartTotal
                                                }
                                            >
                                                <Typography
                                                    className={
                                                        styles.mobileCartTotalText
                                                    }
                                                >
                                                    Total
                                                </Typography>
                                                <Typography
                                                    className={
                                                        styles.mobileCartTotalText
                                                    }
                                                >
                                                    ₱ {total}
                                                </Typography>
                                            </Box>
                                            <Box
                                                className={
                                                    styles.mobileCartButtons
                                                }
                                            >
                                                <Button
                                                    className={
                                                        styles.mobileCartView
                                                    }
                                                    component={Link}
                                                    to="/details"
                                                >
                                                    View Cart
                                                </Button>
                                                <Button
                                                    className={
                                                        styles.mobileCartCheckout
                                                    }
                                                    component={Link}
                                                    to="/checkout"
                                                >
                                                    Checkout
                                                </Button>
                                            </Box>
                                        </>
                                    ) : (
                                        <Typography
                                            className={styles.cartNoItemsText}
                                        >
                                            No items in cart.
                                        </Typography>
                                    )}
                                </Box>
                            </Collapse>
                        </Box>
                    </>
                ) : (
                    <>
                        <Typography className={styles.navbarBrand}>
                            Cliff
                        </Typography>
                        <List className={styles.navLinkContainer}>
                            <ListItemButton
                                to="/"
                                className={styles.navLinkButton}
                            >
                                <ListItemText>Home</ListItemText>
                            </ListItemButton>
                            <div className={styles.navLinkShop}>
                                <Button
                                    className={styles.navLinkButton}
                                    endIcon={<ExpandMore />}
                                    onClick={handleShop}
                                >
                                    Shop
                                </Button>
                                {shopOpen && (
                                    <Box className={styles.shopMenu}>
                                        <List>
                                            <ListItemButton
                                                to="/shop"
                                                component={Link}
                                                state={{
                                                    categoryID: 0,
                                                    categoryName:
                                                        "All Products",
                                                }}
                                            >
                                                <ListItemText>
                                                    All Products
                                                </ListItemText>
                                            </ListItemButton>
                                            {references?.productCategory?.map(
                                                (item, index) => (
                                                    <ListItemButton
                                                        key={index}
                                                        component={Link}
                                                        to={`/shop/${item.productCategoryName.toLowerCase()}`}
                                                        state={{
                                                            categoryID:
                                                                item.productCategoryID,
                                                            categoryName:
                                                                item.productCategoryName,
                                                        }}
                                                    >
                                                        <ListItemText>
                                                            {
                                                                item.productCategoryName
                                                            }
                                                        </ListItemText>
                                                    </ListItemButton>
                                                ),
                                            )}
                                        </List>
                                    </Box>
                                )}
                            </div>
                            <ListItemButton
                                to="/about"
                                className={styles.navLinkButton}
                            >
                                <ListItemText>About</ListItemText>
                            </ListItemButton>
                            <ListItemButton
                                to="/contact"
                                className={styles.navLinkButton}
                            >
                                <ListItemText>Contact</ListItemText>
                            </ListItemButton>
                        </List>
                        <Box className={styles.navbarSearchContainer}>
                            <Search />
                            <InputBase
                                placeholder="Search products"
                                className={styles.navbarSearchInput}
                            />
                        </Box>
                        <div className={styles.cart}>
                            <Button
                                startIcon={<ShoppingCart />}
                                endIcon={<ExpandMore />}
                                className={styles.cartButton}
                                onClick={handleCart}
                            >
                                Cart
                            </Button>
                            {cartOpen && (
                                <Box className={styles.cartInfo}>
                                    {cartItem && cartItem.length > 0 ? (
                                        <>
                                            {cartItem?.map((item, index) => (
                                                <Box
                                                    className={styles.cartList}
                                                    key={index}
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
                                                            ₱{" "}
                                                            {item.productPrice}
                                                        </Typography>
                                                    </Box>
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
                                                </Box>
                                            ))}
                                            <Divider orientation="horizontal" />
                                            <Box className={styles.cartTotal}>
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
                                            <Box className={styles.cartButtons}>
                                                <Button
                                                    className={styles.cartView}
                                                    component={Link}
                                                    to="/details"
                                                >
                                                    View Cart
                                                </Button>
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
                                        </>
                                    ) : (
                                        <Typography
                                            className={styles.cartNoItemsText}
                                        >
                                            No items in cart.
                                        </Typography>
                                    )}
                                </Box>
                            )}
                        </div>

                        {isLoggedIn ? (
                            <Box>
                                <AccountCircle />
                            </Box>
                        ) : (
                            <Button
                                className={styles.navbarLoginButton}
                                onClick={handleModalOpen}
                            >
                                Sign In
                            </Button>
                        )}
                    </>
                )}
            </Container>
            <AuthModal isOpen={modalOpen} setModalOpen={setModalOpen} />
        </AppBar>
    );
}
