import React from "react";
import styles from "./MobileNavbar.module";
import {
    AccountCircle,
    Add,
    Close,
    DeleteOutline,
    ExpandMore,
    ListAlt,
    Logout,
    Menu,
    Place,
    Remove,
    Search,
    Settings,
    ShoppingCart,
} from "@mui/icons-material";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    CardMedia,
    Collapse,
    Divider,
    IconButton,
    InputBase,
    List,
    ListItemButton,
    ListItemText,
    Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import Brand from "../Brand";

export default function MobileNavbar({
    handleMenu,
    handleCart,
    handleAdd,
    handleMinus,
    handleModalOpen,
    handleSignOut,
    menuOpen,
    cartOpen,
    isLoggedIn,
    user,
    references,
    cartItem,
    total,
    searchOpen,
    searchQuery,
    handleSearchQuery,
    handleSearch,
    filteredProducts,
}) {
    const handleProductClick = (productCode) => {
        window.location.href = `/shop/product/${productCode}`;
    };

    return (
        <>
            <IconButton onClick={handleMenu}>
                <Menu className={styles.mobileNavbarButton} />
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
                                className={styles.mobileNavLinkButton}
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
                                        <Typography>Shop</Typography>
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
                                    </AccordionDetails>
                                </Accordion>
                            </Box>
                            <ListItemButton
                                to="/about"
                                className={styles.mobileNavLinkButton}
                            >
                                <ListItemText>About</ListItemText>
                            </ListItemButton>
                            <ListItemButton
                                to="/contact"
                                className={styles.mobileNavLinkButton}
                            >
                                <ListItemText>Contact</ListItemText>
                            </ListItemButton>
                        </List>
                        <div>
                            <Box className={styles.mobileNavbarSearchContainer}>
                                <Search />
                                <InputBase
                                    placeholder="Search products"
                                    className={styles.mobileNavbarSearchInput}
                                    value={searchQuery}
                                    onChange={handleSearchQuery}
                                />
                            </Box>
                            {searchOpen && filteredProducts && (
                                <Box className={styles.searchOutputContainer}>
                                    {filteredProducts.length != 0 ? (
                                        filteredProducts.map((item, index) => (
                                            <Box
                                                key={index}
                                                className={
                                                    styles.searchOutputItem
                                                }
                                                component={Link}
                                                onClick={() =>
                                                    handleProductClick(
                                                        item.productCode,
                                                    )
                                                }
                                            >
                                                <CardMedia
                                                    component="img"
                                                    image={`/hydrogen/${item.productImage}`}
                                                    className={
                                                        styles.searchOutputImage
                                                    }
                                                />
                                                <Typography
                                                    className={
                                                        styles.searchOutputName
                                                    }
                                                >
                                                    {item.productName}
                                                </Typography>
                                            </Box>
                                        ))
                                    ) : (
                                        <Typography
                                            className={styles.searchNoOutput}
                                        >
                                            No products found
                                        </Typography>
                                    )}
                                </Box>
                            )}
                        </div>
                        {isLoggedIn ? (
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
                                        expandIcon={
                                            <ExpandMore
                                                className={styles.expandIcon}
                                            />
                                        }
                                        className={styles.settingsAccordion}
                                    >
                                        <AccountCircle
                                            className={styles.startIcon}
                                        />
                                        <Typography>
                                            {user?.customerUsername}
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails
                                        className={
                                            styles.mobileAccordionDetails
                                        }
                                    >
                                        <Box className={styles.settingsInfo}>
                                            <Button
                                                startIcon={
                                                    <ListAlt size={20} />
                                                }
                                                component={Link}
                                                to="/details"
                                                state={{ value: 0 }}
                                                className={
                                                    styles.settingsOption
                                                }
                                            >
                                                <Typography>Orders</Typography>
                                            </Button>
                                            <Button
                                                startIcon={
                                                    <Place
                                                        className={
                                                            styles.settingsOption
                                                        }
                                                    />
                                                }
                                                component={Link}
                                                to="/details"
                                                state={{ value: 2 }}
                                            >
                                                <Typography
                                                    className={
                                                        styles.settingsOption
                                                    }
                                                >
                                                    Addresses
                                                </Typography>
                                            </Button>
                                            <Button
                                                startIcon={
                                                    <Settings
                                                        className={
                                                            styles.settingsOption
                                                        }
                                                    />
                                                }
                                                component={Link}
                                                to="/details"
                                                state={{ value: 3 }}
                                            >
                                                <Typography
                                                    className={
                                                        styles.settingsOption
                                                    }
                                                >
                                                    Profile Settings
                                                </Typography>
                                            </Button>
                                            <Button
                                                startIcon={
                                                    <Logout
                                                        className={
                                                            styles.settingsOption
                                                        }
                                                    />
                                                }
                                                onClick={handleSignOut}
                                            >
                                                <Typography
                                                    className={
                                                        styles.settingsOption
                                                    }
                                                >
                                                    Sign out
                                                </Typography>
                                            </Button>
                                        </Box>
                                    </AccordionDetails>
                                </Accordion>
                            </Box>
                        ) : (
                            <Button
                                className={styles.mobileNavbarLoginButton}
                                onClick={handleModalOpen}
                            >
                                Sign In
                            </Button>
                        )}
                    </Box>
                </Collapse>
            </Box>
            <Link to="/" className={styles.brandName}>
                <Brand fontSize="44px" />
            </Link>
            <IconButton onClick={handleCart}>
                <ShoppingCart className={styles.mobileNavbarButton} />
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
                                    <Box key={index}>
                                        <Box className={styles.mobileCartList}>
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
                                                    {item.productName}
                                                </Typography>
                                                <Typography
                                                    className={
                                                        styles.mobileCartDetailsPrice
                                                    }
                                                >
                                                    ₱ {item.productPrice}
                                                </Typography>
                                            </Box>
                                            <Box
                                                className={
                                                    styles.mobileCartQuantity
                                                }
                                            >
                                                {item.quantity === 1 ? (
                                                    <IconButton
                                                        onClick={() =>
                                                            handleMinus(
                                                                item.productID,
                                                            )
                                                        }
                                                    >
                                                        <DeleteOutline />
                                                    </IconButton>
                                                ) : (
                                                    <IconButton
                                                        onClick={() =>
                                                            handleMinus(
                                                                item.productID,
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
                                                            item.productID,
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
                                    </Box>
                                ))}
                                <Divider orientation="horizontal" />
                                <Box className={styles.mobileCartTotal}>
                                    <Typography
                                        className={styles.mobileCartTotalText}
                                    >
                                        Total
                                    </Typography>
                                    <Typography
                                        className={styles.mobileCartTotalText}
                                    >
                                        ₱ {total}
                                    </Typography>
                                </Box>
                                <Box className={styles.mobileCartButtons}>
                                    <Button
                                        className={styles.mobileCartView}
                                        component={Link}
                                        to="/details"
                                        state={{ value: 1 }}
                                    >
                                        View Cart
                                    </Button>
                                    <Button
                                        className={styles.mobileCartCheckout}
                                        component={Link}
                                        to="/checkout"
                                    >
                                        Checkout
                                    </Button>
                                </Box>
                            </>
                        ) : (
                            <Typography className={styles.cartNoItemsText}>
                                No items in cart.
                            </Typography>
                        )}
                    </Box>
                </Collapse>
            </Box>
        </>
    );
}
