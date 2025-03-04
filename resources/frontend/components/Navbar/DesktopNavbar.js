import React from "react";
import styles from "./DesktopNavbar.module";
import {
    List,
    Button,
    Typography,
    ListItemButton,
    ListItemText,
    InputBase,
    Box,
    IconButton,
    CardMedia,
    Divider,
} from "@mui/material";
import {
    AccountCircle,
    Add,
    DeleteOutline,
    ExpandMore,
    ListAlt,
    Logout,
    Place,
    Remove,
    Search,
    ShoppingCart,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function DesktopNavbar({
    handleCart,
    handleShop,
    handleSettings,
    handleAdd,
    handleMinus,
    handleModalOpen,
    handleSignOut,
    cartOpen,
    shopOpen,
    settingsOpen,
    isLoggedIn,
    user,
    references,
    cartItem,
    total,
}) {
    return (
        <>
            <Typography className={styles.navbarBrand}>Cliff</Typography>
            <List className={styles.navLinkContainer}>
                <ListItemButton to="/" className={styles.navLinkButton}>
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
                                        categoryName: "All Products",
                                    }}
                                >
                                    <ListItemText>All Products</ListItemText>
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
                                                {item.productCategoryName}
                                            </ListItemText>
                                        </ListItemButton>
                                    ),
                                )}
                            </List>
                        </Box>
                    )}
                </div>
                <ListItemButton to="/about" className={styles.navLinkButton}>
                    <ListItemText>About</ListItemText>
                </ListItemButton>
                <ListItemButton to="/contact" className={styles.navLinkButton}>
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
                                            className={styles.cartListImage}
                                        />
                                        <Box className={styles.cartDetails}>
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
                                                ₱ {item.productPrice}
                                            </Typography>
                                        </Box>
                                        <Box className={styles.cartQuantity}>
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
                                                    handleAdd(item.productCode)
                                                }
                                            >
                                                <Add />
                                            </IconButton>
                                        </Box>
                                        <Box>
                                            <Typography
                                                className={styles.cartItemPrice}
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
                                        className={styles.cartTotalText}
                                    >
                                        Total
                                    </Typography>
                                    <Typography
                                        className={styles.cartTotalText}
                                    >
                                        ₱ {total}
                                    </Typography>
                                </Box>
                                <Box className={styles.cartButtons}>
                                    <Button
                                        className={styles.cartView}
                                        component={Link}
                                        to="/details"
                                        state={{ value: 1 }}
                                    >
                                        View Cart
                                    </Button>
                                    <Button
                                        className={styles.cartCheckout}
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
                )}
            </div>

            {isLoggedIn ? (
                <div className={styles.settings}>
                    <Button
                        startIcon={<AccountCircle />}
                        endIcon={<ExpandMore />}
                        className={styles.settingsButton}
                        onClick={handleSettings}
                    >
                        {user?.customerUsername}
                    </Button>
                    {settingsOpen && (
                        <Box className={styles.settingsInfo}>
                            <Button
                                startIcon={<ListAlt size={20} />}
                                className={styles.settingsOption}
                                component={Link}
                                to="/details"
                                state={{ value: 0 }}
                            >
                                <Typography>Orders</Typography>
                            </Button>
                            <Button
                                startIcon={<Place />}
                                className={styles.settingsOption}
                                component={Link}
                                to="/details"
                                state={{ value: 2 }}
                            >
                                <Typography>Addresses</Typography>
                            </Button>
                            <Button
                                startIcon={<Logout />}
                                className={styles.settingsOption}
                                onClick={handleSignOut}
                            >
                                <Typography>Sign out</Typography>
                            </Button>
                        </Box>
                    )}
                </div>
            ) : (
                <Button
                    className={styles.navbarLoginButton}
                    onClick={handleModalOpen}
                >
                    Sign In
                </Button>
            )}
        </>
    );
}
