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
    Settings,
    ShoppingCart,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import Brand from "../Brand";

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
            <Link to="/" className={styles.brandName}>
                <Brand fontSize="48px" />
            </Link>
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
            <div className={styles.searhcContainer}>
                <Box className={styles.navbarSearchContainer}>
                    <Search />
                    <InputBase
                        placeholder="Search products"
                        className={styles.navbarSearchInput}
                        value={searchQuery}
                        onChange={handleSearchQuery}
                        onFocus={handleSearch}
                        onMouseDown={handleSearch}
                        tabIndex={0}
                    />
                </Box>
                {searchOpen && filteredProducts && (
                    <Box className={styles.searchOutputContainer}>
                        {filteredProducts.length != 0 ? (
                            filteredProducts.map((item, index) => (
                                <Box
                                    key={index}
                                    className={styles.searchOutputItem}
                                    component={Link}
                                    onClick={() =>
                                        handleProductClick(item.productCode)
                                    }
                                >
                                    <CardMedia
                                        component="img"
                                        image={`/hydrogen/${item.productImage}`}
                                        className={styles.searchOutputImage}
                                    />
                                    <Typography
                                        className={styles.searchOutputName}
                                    >
                                        {item.productName}
                                    </Typography>
                                </Box>
                            ))
                        ) : (
                            <Typography className={styles.searchNoOutput}>
                                No products found
                            </Typography>
                        )}
                    </Box>
                )}
            </div>
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
                                                    handleAdd(item.productID)
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
                                startIcon={<Settings />}
                                className={styles.settingsOption}
                                component={Link}
                                to="/details"
                                state={{ value: 3 }}
                            >
                                <Typography>Profile Settings</Typography>
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
