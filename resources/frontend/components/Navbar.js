import React from "react";
import { styled, alpha } from "@mui/material/styles";
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    Button,
    MenuItem,
    InputBase,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const pages = ["Home", "Shop", "About", "Contact"];
const shopOptions = [
    "Interior Car Accessories",
    "Car Care Detailing",
    "Automotive Parts",
    "Car Electronics",
    "Tools and Garage ",
];

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: "0",
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    margin: theme.spacing(1, 0),
    width: "100%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        width: "100%",
    },
}));

export default function Navbar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElShop, setAnchorElShop] = React.useState(null);
    const [mobileShopView, setMobileShopView] = React.useState(false);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
        setAnchorElShop(null);
    };

    const handleToggleShopDropdown = (event) => {
        setAnchorElShop(event.currentTarget);
    };

    const handleBackToMenu = () => {
        setMobileShopView(false);
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: "#373737", px: 2 }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* Mobile Menu Icon */}
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="Open navigation menu"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>

                    {/* Logo (Desktop) */}
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#"
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontWeight: "800",
                            color: "#D62828",
                            textDecoration: "none",
                        }}
                    >
                        MUX
                    </Typography>

                    {/* Logo (Mobile) */}
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#"
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            fontWeight: "800",
                            color: "#D62828",
                            textDecoration: "none",
                            width: "100%",
                            justifyContent: "center", // Center on small screens
                        }}
                    >
                        MUX
                    </Typography>

                    {/* Mobile Menu */}
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "center",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "center",
                            }}
                            open={Boolean(anchorElNav) && !mobileShopView}
                            onClose={handleCloseNavMenu}
                            PaperProps={{
                                sx: {
                                    width: "100vw",
                                    maxWidth: "none",
                                    top: "64px !important",
                                    left: "0 !important",
                                    right: "0 !important",
                                    backgroundColor: "#373737",
                                    boxShadow: "none",
                                    borderRadius: 0,
                                    px: 2,
                                },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    key={page}
                                    onClick={
                                        page === "Shop"
                                            ? () => setMobileShopView(true)
                                            : handleCloseNavMenu
                                    }
                                    sx={{
                                        justifyContent: "center",
                                        color: "#FFFFFF",
                                        fontWeight: "400",
                                        textAlign: "center",
                                        py: 2,
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1,
                                        }}
                                    >
                                        {page}
                                    </Typography>
                                </MenuItem>
                            ))}

                            {/* Search Bar */}
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{ "aria-label": "search" }}
                                />
                            </Search>
                        </Menu>

                        {/* Mobile Shop Menu */}
                        {mobileShopView && (
                            <Menu
                                id="mobile-shop-menu"
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "center",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "center",
                                }}
                                open={mobileShopView}
                                onClose={handleBackToMenu}
                                PaperProps={{
                                    sx: {
                                        width: "100vw",
                                        maxWidth: "none",
                                        top: "64px !important",
                                        left: "0 !important",
                                        right: "0 !important",
                                        backgroundColor: "#373737",
                                        boxShadow: "none",
                                        borderRadius: 0,
                                        px: 2,
                                    },
                                }}
                            >
                                <MenuItem
                                    onClick={handleBackToMenu}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        color: "#FFFFFF",
                                        py: 2,
                                    }}
                                >
                                    <ArrowBackIcon sx={{ mr: 1 }} />
                                    <Typography>Back</Typography>
                                </MenuItem>
                                {shopOptions.map((shop) => (
                                    <MenuItem
                                        key={shop}
                                        onClick={handleCloseNavMenu}
                                        sx={{
                                            justifyContent: "center",
                                            color: "#FFFFFF",
                                            fontWeight: "400",
                                            textAlign: "center",
                                            py: 2,
                                        }}
                                    >
                                        <Typography>{shop}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        )}
                    </Box>

                    {/* Menu Items and Search Bar */}
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                            alignItems: "center",
                        }}
                    >
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={
                                    page === "Shop"
                                        ? handleToggleShopDropdown
                                        : handleCloseNavMenu
                                }
                                sx={{
                                    m: 2,
                                    color: "#FFFFFF",
                                    textTransform: "none",
                                    textDecoration: "none",
                                    fontWeight: "400",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                }}
                            >
                                {page}
                                {page === "Shop" && <ExpandMoreIcon />}
                            </Button>
                        ))}
                        {/* Desktop Shop Dropdown */}
                        <Menu
                            anchorEl={anchorElShop}
                            open={Boolean(anchorElShop)}
                            onClose={handleCloseNavMenu}
                            PaperProps={{
                                sx: {
                                    backgroundColor: "#373737",
                                    color: "#FFFFFF",
                                    borderRadius: "4px",
                                    mt: 1,
                                    p: 0,
                                    width: "auto",
                                    minWidth: "160px",
                                    textAlign: "center",
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                },
                            }}
                        >
                            {shopOptions.map((shop) => (
                                <MenuItem
                                    key={shop}
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                        justifyContent: "center",
                                        py: 1,
                                    }}
                                >
                                    {shop}
                                </MenuItem>
                            ))}
                        </Menu>

                        {/* Search Bar */}
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ "aria-label": "search" }}
                            />
                        </Search>
                    </Box>

                    {/* Login Button */}
                    <Box
                        sx={{
                            ml: 2,
                        }}
                    >
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#D62828",
                                textTransform: "none",
                                border: "none",
                                borderRadius: 0,
                                boxShadow: "none",
                                px: 2,
                            }}
                        >
                            Login
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
