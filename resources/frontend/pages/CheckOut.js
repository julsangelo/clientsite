import React, { useState, useEffect, useRef, useContext } from "react";
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
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    InputAdornment,
    MenuItem,
} from "@mui/material";
import {
    getCart,
    getClientIntent,
    getProductDetail,
    placeOrder,
} from "../ajax/backend";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CreditCard } from "@mui/icons-material";
import { ReferenceContext } from "../context/ReferenceProvider.js";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

const navigation = performance.getEntriesByType("navigation")[0];
const isReloaded = navigation && navigation.type === "reload";

if (!isReloaded) {
    localStorage.removeItem("item");
}

const validationSchema = yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    phoneNumber: yup
        .string()
        .matches(/^9/, "Phone number must start with 9")
        .matches(/^\d{10}$/, "Phone Number must be 10 digits")
        .required("Phone Number is required"),
    email: yup
        .string()
        .email("Must be a valid email")
        .required("Email is required"),
    address: yup.string().required("Address is required"),
    addressInfo: yup.string(),
    postalCode: yup
        .string()
        .matches(/^\d{4}$/, "Postal Code must be 4 digits")
        .required("Postal Code is required"),
    region: yup.string().required("Region is required"),
    province: yup.string().required("Province is required"),
    municipality: yup.string().required("City/Municipality is required"),
    barangay: yup.string().required("Barangay is required"),
});

export default function CheckOut() {
    const { references } = useContext(ReferenceContext);
    const [selected, setSelected] = useState();
    const [items, setItems] = useState();
    const [total, setTotal] = useState();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
    const checkoutItem = JSON.parse(localStorage.getItem("item"));
    const [formState, setFormState] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        address: "",
        addressInfo: "",
        postalCode: "",
        region: "",
        province: "",
        municipality: "",
        barangay: "",
        total: "0.00",
    });

    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: yupResolver(validationSchema),
        mode: "onChange",
        defaultValues: {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            email: "",
            address: "",
            addressInfo: "",
            postalCode: "",
            region: "",
            province: "",
            municipality: "",
            barangay: "",
            total: "0.00",
        },
    });

    const handleInputChange = (field, value) => {
        setFormState((prev) => {
            const updatedState = { ...prev, [field]: value };

            if (field === "region") {
                updatedState.province = "";
                updatedState.municipality = "";
                updatedState.barangay = "";
            } else if (field === "province") {
                updatedState.municipality = "";
                updatedState.barangay = "";
            } else if (field === "municipality") {
                updatedState.barangay = "";
            }

            setValue(field, value);

            return updatedState;
        });
    };

    const handleChange = (event) => {
        setSelected(event.target.value);
    };

    const onSubmit = (formState) => {
        console.log(formState);
        placeOrder(formState);
    };

    useEffect(() => {
        if (checkoutItem) {
            getProductDetail(checkoutItem.productCode, (data) => {
                setItems([{ ...data[0], quantity: checkoutItem.quantity }]);
            });
        } else {
            getCart((data) => {
                setItems(data);
            });
        }
    }, []);

    useEffect(() => {
        getClientIntent(5000, (response) => {
            setClientSecret(response.clientSecret);
        });
    }, []);

    useEffect(() => {
        const total = Array.isArray(items)
            ? items
                  .reduce(
                      (sum, item) =>
                          sum + parseFloat(item.productPrice) * item.quantity,
                      0,
                  )
                  .toFixed(2)
            : "0.00";

        setTotal(total);

        setFormState((prevState) => ({
            ...prevState,
            total: total,
        }));

        setValue("total", total);
    }, [items]);

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
                                    {items?.map((item, index) => (
                                        <Box
                                            className={styles.cartListContainer}
                                            key={index}
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
                            <Box
                                className={styles.checkOutForm}
                                component="form"
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <Box>
                                    <Typography className={styles.formTitle}>
                                        Delivery
                                    </Typography>
                                    <Grid2 container spacing={2.5}>
                                        <Grid2 size={{ xs: 12, md: 6 }}>
                                            <Controller
                                                name="firstName"
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        label="First Name"
                                                        error={
                                                            !!errors.firstName
                                                        }
                                                        helperText={
                                                            errors.firstName
                                                                ?.message
                                                        }
                                                        fullWidth
                                                    />
                                                )}
                                            />
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, md: 6 }}>
                                            <Controller
                                                name="lastName"
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        label="Last Name"
                                                        error={
                                                            !!errors.lastName
                                                        }
                                                        helperText={
                                                            errors.lastName
                                                                ?.message
                                                        }
                                                        fullWidth
                                                    />
                                                )}
                                            />
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, md: 6 }}>
                                            <Controller
                                                name="phoneNumber"
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        label="Phone Number"
                                                        error={
                                                            !!errors.phoneNumber
                                                        }
                                                        helperText={
                                                            errors.phoneNumber
                                                                ?.message
                                                        }
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    +63
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                        fullWidth
                                                    />
                                                )}
                                            />
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, md: 6 }}>
                                            <Controller
                                                name="email"
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        label="Email"
                                                        error={!!errors.email}
                                                        helperText={
                                                            errors.email
                                                                ?.message
                                                        }
                                                        fullWidth
                                                    />
                                                )}
                                            />
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, md: 12 }}>
                                            <Controller
                                                name="address"
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        label="Address"
                                                        error={!!errors.address}
                                                        helperText={
                                                            errors.address
                                                                ?.message
                                                        }
                                                        fullWidth
                                                    />
                                                )}
                                            />
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, md: 6 }}>
                                            <Controller
                                                name="addressInfo"
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        label="Apartment, suite, etc. (Optional)"
                                                        error={
                                                            !!errors.addressInfo
                                                        }
                                                        helperText={
                                                            errors.addressInfo
                                                                ?.message
                                                        }
                                                        fullWidth
                                                    />
                                                )}
                                            />
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, md: 6 }}>
                                            <Controller
                                                name="postalCode"
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        label="Postal Code"
                                                        error={
                                                            !!errors.postalCode
                                                        }
                                                        helperText={
                                                            errors.postalCode
                                                                ?.message
                                                        }
                                                        fullWidth
                                                    />
                                                )}
                                            />
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, md: 6 }}>
                                            <Controller
                                                name="region"
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        select
                                                        label="Region"
                                                        error={!!errors.region}
                                                        helperText={
                                                            errors.region
                                                                ?.message
                                                        }
                                                        value={formState.region}
                                                        onChange={(e) => {
                                                            field.onChange(e);
                                                            handleInputChange(
                                                                "region",
                                                                e.target.value,
                                                            );
                                                        }}
                                                        fullWidth
                                                    >
                                                        {references?.region?.map(
                                                            (option) => (
                                                                <MenuItem
                                                                    key={
                                                                        option.regionID
                                                                    }
                                                                    value={
                                                                        option.regionID
                                                                    }
                                                                >
                                                                    {
                                                                        option.regionDescription
                                                                    }
                                                                </MenuItem>
                                                            ),
                                                        )}
                                                    </TextField>
                                                )}
                                            />
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, md: 6 }}>
                                            <Controller
                                                name="province"
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        select
                                                        label="Province"
                                                        error={
                                                            !!errors.province
                                                        }
                                                        helperText={
                                                            errors.province
                                                                ?.message
                                                        }
                                                        value={
                                                            formState.province
                                                        }
                                                        onChange={(e) => {
                                                            handleInputChange(
                                                                "province",
                                                                e.target.value,
                                                            );
                                                            field.onChange(e);
                                                        }}
                                                        disabled={
                                                            !formState.region
                                                        }
                                                        fullWidth
                                                    >
                                                        {references?.province
                                                            ?.filter(
                                                                (option) =>
                                                                    option.regionID ===
                                                                    formState.region,
                                                            )
                                                            .map((option) => (
                                                                <MenuItem
                                                                    key={
                                                                        option.provinceID
                                                                    }
                                                                    value={
                                                                        option.provinceID
                                                                    }
                                                                >
                                                                    {
                                                                        option.provinceName
                                                                    }
                                                                </MenuItem>
                                                            ))}
                                                    </TextField>
                                                )}
                                            />
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, md: 6 }}>
                                            <Controller
                                                name="municipality"
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        select
                                                        label="City/Municipality"
                                                        error={
                                                            !!errors.municipality
                                                        }
                                                        helperText={
                                                            errors.municipality
                                                                ?.message
                                                        }
                                                        value={
                                                            formState.municipality
                                                        }
                                                        onChange={(e) => {
                                                            handleInputChange(
                                                                "municipality",
                                                                e.target.value,
                                                            );
                                                            field.onChange(e);
                                                        }}
                                                        disabled={
                                                            !formState.province
                                                        }
                                                        fullWidth
                                                    >
                                                        {references?.municipality
                                                            ?.filter(
                                                                (option) =>
                                                                    option.provinceID ===
                                                                    formState.province,
                                                            )
                                                            .map((option) => (
                                                                <MenuItem
                                                                    key={
                                                                        option.municipalityID
                                                                    }
                                                                    value={
                                                                        option.municipalityID
                                                                    }
                                                                >
                                                                    {
                                                                        option.municipalityName
                                                                    }
                                                                </MenuItem>
                                                            ))}
                                                    </TextField>
                                                )}
                                            />
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, md: 6 }}>
                                            <Controller
                                                name="barangay"
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        select
                                                        label="Barangay"
                                                        error={
                                                            !!errors.barangay
                                                        }
                                                        helperText={
                                                            errors.barangay
                                                                ?.message
                                                        }
                                                        value={
                                                            formState.barangay
                                                        }
                                                        onChange={(e) => {
                                                            handleInputChange(
                                                                "barangay",
                                                                e.target.value,
                                                            );
                                                            field.onChange(e);
                                                        }}
                                                        disabled={
                                                            !formState.municipality
                                                        }
                                                        fullWidth
                                                    >
                                                        {references?.barangay
                                                            ?.filter(
                                                                (option) =>
                                                                    option.municipalityID ===
                                                                    formState.municipality,
                                                            )
                                                            .map((option) => (
                                                                <MenuItem
                                                                    key={
                                                                        option.barangayID
                                                                    }
                                                                    value={
                                                                        option.barangayID
                                                                    }
                                                                >
                                                                    {
                                                                        option.barangayName
                                                                    }
                                                                </MenuItem>
                                                            ))}
                                                    </TextField>
                                                )}
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
                                                    selected === "online"
                                                        ? `${styles.radioButtonSelected}`
                                                        : styles.radioButton
                                                }
                                                value="online"
                                                control={<Radio />}
                                                label="Online Payment"
                                            />
                                            <Collapse
                                                in={selected === "online"}
                                            >
                                                <Box
                                                    className={
                                                        styles.paymentAccordion
                                                    }
                                                >
                                                    <List>
                                                        <ListItem>
                                                            <Button
                                                                className={
                                                                    styles.paymentOptions
                                                                }
                                                            >
                                                                <CreditCard />
                                                                <Typography>
                                                                    Credit/Debit
                                                                    Card
                                                                </Typography>
                                                            </Button>
                                                        </ListItem>
                                                    </List>
                                                </Box>
                                            </Collapse>
                                        </Box>

                                        <Box>
                                            <FormControlLabel
                                                className={
                                                    selected === "e-wallet"
                                                        ? `${styles.radioButtonSelected}`
                                                        : styles.radioButton
                                                }
                                                value="e-wallet"
                                                control={<Radio />}
                                                label="E-Wallet"
                                            />
                                            <Collapse
                                                in={selected === "e-wallet"}
                                            >
                                                <Box
                                                    className={
                                                        styles.paymentAccordion
                                                    }
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
                                                    selected === "cod"
                                                        ? `${styles.radioButtonSelected}`
                                                        : styles.radioButton
                                                }
                                                value="cod"
                                                control={<Radio />}
                                                label="Cash On Delivery"
                                            />
                                            <Collapse in={selected === "cod"}>
                                                <Box
                                                    className={
                                                        styles.paymentAccordion
                                                    }
                                                >
                                                    <Typography
                                                        className={
                                                            styles.paymentText
                                                        }
                                                    >
                                                        Prepare the exact amount
                                                        to hand over to the
                                                        delivery person upon
                                                        receiving your order.
                                                        Only cash is accepted.
                                                    </Typography>
                                                </Box>
                                            </Collapse>
                                        </Box>
                                    </RadioGroup>
                                </Box>
                                <Button
                                    className={styles.placeOrderButton}
                                    type="submit"
                                >
                                    Place Order
                                </Button>
                            </Box>
                        </Grid2>
                        {isSmallScreen ? null : (
                            <Grid2 size={{ xs: 12, md: 5 }}>
                                <Box className={styles.checkOutItems}>
                                    {items?.map((item, index) => (
                                        <Box
                                            className={styles.cartListContainer}
                                            key={index}
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
