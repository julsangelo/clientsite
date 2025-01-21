import React, { useContext, useState } from "react";
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
} from "@mui/material";
import {
    Add,
    Close,
    ExpandMore,
    Remove,
    Search,
    ShoppingCart,
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { ReferenceContext } from "../context/ReferenceProvider";
import { Link } from "react-router-dom";

export default function Navbar() {
    const isMobile = window.innerWidth < 900;
    const [menu, setMenu] = useState(null);
    const [cart, setCart] = useState(null);
    const [shop, setShop] = useState(null);
    const { references } = useContext(ReferenceContext);

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

    const menuOpen = Boolean(menu);
    const shopOpen = Boolean(shop);
    const cartOpen = Boolean(cart);

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
                                                        {references?.productCategory?.map(
                                                            (item, index) => (
                                                                <ListItemButton
                                                                    key={index}
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
                                    >
                                        Login
                                    </Button>
                                </Box>
                            </Collapse>
                        </Box>
                        <Typography className={styles.navbarBrand}>
                            MUX
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
                                    <Box className={styles.mobileCartList}>
                                        <CardMedia
                                            component="img"
                                            image="/fjmoto/images/PAANO, JULIUS ANGELO A b-min.JPG"
                                            className={
                                                styles.mobileCartListImage
                                            }
                                        />
                                        <Box
                                            className={styles.mobileCartDetails}
                                        >
                                            <Typography
                                                className={
                                                    styles.mobileCartDetailsName
                                                }
                                            >
                                                Ponyan Pentair TY-564 (Toyota
                                                Hiace)
                                            </Typography>
                                            <Typography
                                                className={
                                                    styles.mobileCartDetailsPrice
                                                }
                                            >
                                                ₱ 2,500.00
                                            </Typography>
                                        </Box>
                                        <Box
                                            className={
                                                styles.mobileCartQuantity
                                            }
                                        >
                                            <IconButton>
                                                <Remove />
                                            </IconButton>
                                            <Typography>1</Typography>
                                            <IconButton>
                                                <Add />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                    <Box className={styles.mobileCartTotal}>
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
                                            ₱ 2,500.00
                                        </Typography>
                                    </Box>
                                    <Box className={styles.mobileCartButtons}>
                                        <Button
                                            className={styles.mobileCartView}
                                        >
                                            View Cart
                                        </Button>
                                        <Button
                                            className={
                                                styles.mobileCartCheckout
                                            }
                                        >
                                            Checkout
                                        </Button>
                                    </Box>
                                </Box>
                            </Collapse>
                        </Box>
                    </>
                ) : (
                    <>
                        <Typography className={styles.navbarBrand}>
                            MUX
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
                                Cart (0)
                            </Button>
                            {cartOpen && (
                                <Box className={styles.cartInfo}>
                                    <Box className={styles.cartList}>
                                        <CardMedia
                                            component="img"
                                            image="/fjmoto/images/PAANO, JULIUS ANGELO A b-min.JPG"
                                            className={styles.cartListImage}
                                        />
                                        <Box className={styles.cartDetails}>
                                            <Typography
                                                className={
                                                    styles.cartDetailsName
                                                }
                                            >
                                                Ponyan Pentair TY-564 (Toyota
                                                Hiace)
                                            </Typography>
                                            <Typography
                                                className={
                                                    styles.cartDetailsPrice
                                                }
                                            >
                                                ₱ 2,500.00
                                            </Typography>
                                        </Box>
                                        <Box className={styles.cartQuantity}>
                                            <IconButton>
                                                <Remove />
                                            </IconButton>
                                            <Typography>1</Typography>
                                            <IconButton>
                                                <Add />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                    <Box className={styles.cartTotal}>
                                        <Typography
                                            className={styles.cartTotalText}
                                        >
                                            Total
                                        </Typography>
                                        <Typography
                                            className={styles.cartTotalText}
                                        >
                                            ₱ 2,500.00
                                        </Typography>
                                    </Box>
                                    <Box className={styles.cartButtons}>
                                        <Button className={styles.cartView}>
                                            View Cart
                                        </Button>
                                        <Button className={styles.cartCheckout}>
                                            Checkout
                                        </Button>
                                    </Box>
                                </Box>
                            )}
                        </div>

                        <Button className={styles.navbarLoginButton}>
                            Login
                        </Button>
                    </>
                )}
            </Container>
        </AppBar>
    );
}
