import React, { useState, useEffect } from "react";
import styles from "./CheckOut.module";
import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import {
    Box,
    Button,
    CardMedia,
    Container,
    Divider,
    Grid2,
    IconButton,
    Tab,
    Typography,
    useMediaQuery,
    useTheme,
    TextField,
    RadioGroup,
    FormControlLabel,
    Radio,
    Collapse,
} from "@mui/material";
import { getCart } from "../ajax/backend";

export default function CheckOut() {
    const [selected, setSelected] = useState();
    const [cartItem, setCartItem] = useState();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

    const handleChange = (event) => {
        setSelected(event.target.value);
    };

    useEffect(() => {
        getCart((data) => {
            setCartItem(data);
        });
    }, []);

    const total = (cartItem || [])
        .reduce(
            (sum, item) => sum + parseFloat(item.productPrice) * item.quantity,
            0,
        )
        .toFixed(2);

    return (
        <div className={styles.page}>
            <Navbar />
            <div className={styles.checkOut}>
                <Container maxWidth="xl">
                    <Grid2 container spacing={3}>
                        <Grid2 size={{ xs: 12 }}>
                            <Box className={styles.brandContainer}>
                                <Typography className={styles.brandTitle}>
                                    Cliff
                                </Typography>
                                <Typography className={styles.brandSubtitle}>
                                    Motor Parts and Accesories
                                </Typography>
                            </Box>
                        </Grid2>
                        {isSmallScreen ? (
                            <Grid2 size={{ xs: 12, md: 5 }}>
                                <Box className={styles.checkOutItems}>
                                    {cartItem?.map((item, index) => (
                                        <Box
                                            className={styles.cartListContainer}
                                        >
                                            <Box
                                                className={
                                                    styles.cartImageDetails
                                                }
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
                                                        ₱ {item.productPrice}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <Typography>
                                                {item.quantity} item/s
                                            </Typography>
                                            <Typography
                                                className={
                                                    styles.cartDetailsTotal
                                                }
                                            >
                                                ₱{" "}
                                                {(
                                                    item.productPrice *
                                                    item.quantity
                                                ).toFixed(2)}
                                            </Typography>
                                        </Box>
                                    ))}
                                    <Divider orientation="horizontal" />
                                    <Box className={styles.totalContainer}>
                                        <Box className={styles.total}>
                                            <Typography>Subtotal</Typography>
                                            <Typography
                                                className={styles.totalText}
                                            >
                                                ₱ {total}
                                            </Typography>
                                        </Box>
                                        <Box className={styles.total}>
                                            <Typography>
                                                Shipping Fee
                                            </Typography>
                                            <Typography
                                                className={styles.totalText}
                                            >
                                                ₱ {total}
                                            </Typography>
                                        </Box>
                                        <Box className={styles.total}>
                                            <Typography
                                                className={styles.totalTextBold}
                                            >
                                                Total
                                            </Typography>
                                            <Typography
                                                className={styles.totalTextBold}
                                            >
                                                ₱ {total}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid2>
                        ) : null}
                        <Grid2 size={{ xs: 12, md: 7 }}>
                            <Box className={styles.checkOutForm}>
                                <Box>
                                    <Typography className={styles.formTitle}>
                                        Delivery
                                    </Typography>
                                    <Grid2 container spacing={2.5}>
                                        <Grid2 size={{ xs: 12, md: 12 }}>
                                            <TextField
                                                className={styles.formInput}
                                                select
                                                id="outlined-error-helper-text"
                                                label="Country"
                                            />
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, md: 6 }}>
                                            <TextField
                                                className={styles.formInput}
                                                id="outlined-error-helper-text"
                                                label="First Name"
                                            />
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, md: 6 }}>
                                            <TextField
                                                className={styles.formInput}
                                                id="outlined-error-helper-text"
                                                label="Last Name"
                                            />
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, md: 12 }}>
                                            <TextField
                                                className={styles.formInput}
                                                id="outlined-error-helper-text"
                                                label="Address"
                                            />
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, md: 12 }}>
                                            <TextField
                                                className={styles.formInput}
                                                id="outlined-error-helper-text"
                                                label="Apartment, suite, etc."
                                            />
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, md: 6 }}>
                                            <TextField
                                                className={styles.formInput}
                                                id="outlined-error-helper-text"
                                                label="Postal Code"
                                            />
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, md: 6 }}>
                                            <TextField
                                                className={styles.formInput}
                                                select
                                                id="outlined-error-helper-text"
                                                label="Region"
                                            />
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, md: 6 }}>
                                            <TextField
                                                className={styles.formInput}
                                                select
                                                id="outlined-error-helper-text"
                                                label="City"
                                            />
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, md: 6 }}>
                                            <TextField
                                                className={styles.formInput}
                                                id="outlined-error-helper-text"
                                                label="Phone Number"
                                            />
                                        </Grid2>
                                    </Grid2>
                                </Box>
                                <Box>
                                    <Typography className={styles.formTitle}>
                                        Payment
                                    </Typography>
                                    <RadioGroup
                                        value={selected}
                                        onChange={handleChange}
                                    >
                                        <Box>
                                            <FormControlLabel
                                                className={
                                                    selected === "option1"
                                                        ? `${styles.radioButtonSelected}`
                                                        : styles.radioButton
                                                }
                                                value="option1"
                                                control={<Radio />}
                                                label="Option 1"
                                            />
                                            <Collapse
                                                in={selected === "option1"}
                                            >
                                                <Box
                                                    sx={{
                                                        p: 2,
                                                        border: "1px solid #ddd",
                                                        borderRadius: "4px",
                                                    }}
                                                >
                                                    <Typography>
                                                        Additional content for
                                                        Option 1
                                                    </Typography>
                                                </Box>
                                            </Collapse>
                                        </Box>

                                        <Box>
                                            <FormControlLabel
                                                className={
                                                    selected === "option2"
                                                        ? `${styles.radioButtonSelected}`
                                                        : styles.radioButton
                                                }
                                                value="option2"
                                                control={<Radio />}
                                                label="Option 2"
                                            />
                                            <Collapse
                                                in={selected === "option2"}
                                            >
                                                <Box
                                                    sx={{
                                                        p: 2,
                                                        border: "1px solid #ddd",
                                                        borderRadius: "4px",
                                                    }}
                                                >
                                                    <Typography>
                                                        Additional content for
                                                        Option 2
                                                    </Typography>
                                                </Box>
                                            </Collapse>
                                        </Box>

                                        <Box>
                                            <FormControlLabel
                                                className={
                                                    selected === "option3"
                                                        ? `${styles.radioButtonSelected}`
                                                        : styles.radioButton
                                                }
                                                value="option3"
                                                control={<Radio />}
                                                label="Option 3"
                                            />
                                            <Collapse
                                                in={selected === "option3"}
                                            >
                                                <Box
                                                    sx={{
                                                        p: 2,
                                                        border: "1px solid #ddd",
                                                        borderRadius: "4px",
                                                    }}
                                                >
                                                    <Typography>
                                                        Additional content for
                                                        Option 3
                                                    </Typography>
                                                </Box>
                                            </Collapse>
                                        </Box>
                                    </RadioGroup>
                                </Box>
                                <Button className={styles.placeOrderButton}>
                                    Place Order
                                </Button>
                            </Box>
                        </Grid2>
                        {isSmallScreen ? null : (
                            <Grid2 size={{ xs: 12, md: 5 }}>
                                <Box className={styles.checkOutItems}>
                                    {cartItem?.map((item, index) => (
                                        <Box
                                            className={styles.cartListContainer}
                                        >
                                            <Box
                                                className={
                                                    styles.cartImageDetails
                                                }
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
                                                        ₱ {item.productPrice}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <Typography>
                                                {item.quantity} item/s
                                            </Typography>
                                            <Typography
                                                className={
                                                    styles.cartDetailsTotal
                                                }
                                            >
                                                ₱{" "}
                                                {(
                                                    item.productPrice *
                                                    item.quantity
                                                ).toFixed(2)}
                                            </Typography>
                                        </Box>
                                    ))}
                                    <Divider orientation="horizontal" />
                                    <Box className={styles.totalContainer}>
                                        <Box className={styles.total}>
                                            <Typography>Subtotal</Typography>
                                            <Typography
                                                className={styles.totalText}
                                            >
                                                ₱ {total}
                                            </Typography>
                                        </Box>
                                        <Box className={styles.total}>
                                            <Typography>
                                                Shipping Fee
                                            </Typography>
                                            <Typography
                                                className={styles.totalText}
                                            >
                                                ₱ {total}
                                            </Typography>
                                        </Box>
                                        <Box className={styles.total}>
                                            <Typography
                                                className={styles.totalTextBold}
                                            >
                                                Total
                                            </Typography>
                                            <Typography
                                                className={styles.totalTextBold}
                                            >
                                                ₱ {total}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid2>
                        )}
                    </Grid2>
                </Container>
            </div>
            <Footer />
        </div>
    );
}
