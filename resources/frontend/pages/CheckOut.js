import React, { useState, useEffect, useRef, useContext } from "react";
import styles from "./CheckOut.module";
import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import {
    Box,
    Button,
    Container,
    Grid2,
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
    InputAdornment,
    MenuItem,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from "@mui/material";
import {
    addAddress,
    getAddress,
    getCart,
    getClientIntent,
    getProductDetail,
    placeOrder,
} from "../ajax/backend";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Add, CreditCard, Edit, ExpandMore } from "@mui/icons-material";
import { ReferenceContext } from "../context/ReferenceProvider.js";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useFlashMessage } from "../context/FlashMessage.js";
import CheckOutSummary from "../components/Checkout/CheckOutSummary.js";

const navigation = performance.getEntriesByType("navigation")[0];
const isReloaded = navigation && navigation.type === "reload";

if (!isReloaded) {
    localStorage.removeItem("item");
}

const validationSchema = yup.object().shape({
    fullName: yup.string().required("First Name is required"),
    phoneNumber: yup
        .string()
        .matches(/^9/, "Phone number must start with 9")
        .matches(/^\d{10}$/, "Phone Number must be 10 digits")
        .required("Phone Number is required"),
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
    const { setFlashMessage, setFlashStatus } = useFlashMessage();
    const [selectedPayment, setSelectedPayment] = useState();
    const [selectedAddress, setSelectedAddress] = useState();
    const [address, setAddress] = useState();
    const [items, setItems] = useState();
    const [allAddress, setAllAddress] = useState();
    const [addressUpdated, setAddressUpdated] = useState(false);
    const [total, setTotal] = useState();
    const [addAddressOpen, setAddAddressOpen] = useState(false);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
    const checkoutItem = JSON.parse(localStorage.getItem("item"));
    const [expanded, setExpanded] = useState(false);
    const [formState, setFormState] = useState({
        fullName: "",
        phoneNumber: "",
        address: "",
        addressInfo: "",
        postalCode: "",
        region: "",
        province: "",
        municipality: "",
        barangay: "",
    });

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: yupResolver(validationSchema),
        mode: "onChange",
        defaultValues: {
            fullName: "",
            phoneNumber: "",
            address: "",
            addressInfo: "",
            postalCode: "",
            region: "",
            province: "",
            municipality: "",
            barangay: "",
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

    const handleChangePayment = (event) => {
        setSelectedPayment(event.target.value);
    };

    const handleChangeAddress = (event) => {
        setSelectedAddress(event.target.value);
    };

    useEffect(() => {
        setAddress(
            allAddress?.find((item) => item.orderDeliveryID == selectedAddress),
        );
    }, [selectedAddress, allAddress]);

    const onAddressSubmit = (formState) => {
        addAddress(formState, (response) => {
            setFlashMessage(response.message);
            setFlashStatus(response.status);
            if (response.status === "success") {
                setAddressUpdated((prev) => !prev);
                setAddAddressOpen(false);
                reset();
                setFormState({
                    region: "",
                    province: "",
                    municipality: "",
                    barangay: "",
                });
            }
        });
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
    }, [addressUpdated]);

    // useEffect(() => {
    //     getClientIntent(5000, (response) => {
    //         setClientSecret(response.clientSecret);
    //     });
    // }, []);

    useEffect(() => {
        getAddress((response) => {
            setAllAddress(response.allAddress);
            setSelectedAddress(response.defaultAddress[0].orderDeliveryID);
        });
    }, [addressUpdated]);

    useEffect(() => {
        if (address || allAddress?.length === 0) {
            setExpanded(true);
        }
    }, [address, allAddress]);

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

        // setTotal(total);

        // setFormState((prevState) => ({
        //     ...prevState,
        //     total: total,
        // }));

        // setValue("total", total);
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
                            <CheckOutSummary items={items} total={total} />
                        ) : null}
                        <Grid2 size={{ xs: 12, md: 7 }}>
                            <Box className={styles.checkOutForm}>
                                <Box>
                                    <Typography className={styles.formTitle}>
                                        Delivery
                                    </Typography>
                                    <Accordion
                                        expanded={expanded}
                                        onChange={() => setExpanded(!expanded)}
                                    >
                                        <AccordionSummary
                                            expandIcon={<ExpandMore />}
                                        >
                                            <Typography
                                                className={
                                                    styles.deliveryAccordionSummary
                                                }
                                            >
                                                Select Delivery Address
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            {selectedAddress && address ? (
                                                <Box
                                                    className={
                                                        styles.selectedAddress
                                                    }
                                                >
                                                    <Typography
                                                        className={
                                                            styles.selectedAddressDetails
                                                        }
                                                    >
                                                        <strong>
                                                            {
                                                                address.deliveryFullName
                                                            }
                                                        </strong>
                                                        , 0
                                                        {
                                                            address.deliveryPhoneNo
                                                        }
                                                    </Typography>
                                                    <Typography
                                                        className={
                                                            styles.selectedAddressDetails
                                                        }
                                                    >
                                                        {address.deliveryAddressExtra &&
                                                            `${address.deliveryAddressExtra}, `}
                                                        {
                                                            address.deliveryAddress
                                                        }
                                                        ,{" "}
                                                        {
                                                            address.deliveryBarangay
                                                        }
                                                        , {address.deliveryCity}
                                                        ,{" "}
                                                        {
                                                            address.deliveryProvince
                                                        }
                                                        ,{" "}
                                                        {address.deliveryRegion}
                                                    </Typography>
                                                </Box>
                                            ) : (
                                                <RadioGroup
                                                    className={
                                                        styles.addressOptionContainer
                                                    }
                                                    key={allAddress?.length}
                                                    onChange={
                                                        handleChangeAddress
                                                    }
                                                >
                                                    {allAddress?.map(
                                                        (item, index) => (
                                                            <Box
                                                                className={
                                                                    styles.addressOption
                                                                }
                                                                key={index}
                                                            >
                                                                <FormControlLabel
                                                                    value={
                                                                        item.orderDeliveryID
                                                                    }
                                                                    control={
                                                                        <Radio size="small" />
                                                                    }
                                                                    label={
                                                                        <Box>
                                                                            <Typography
                                                                                className={
                                                                                    styles.addressOptionDetails
                                                                                }
                                                                            >
                                                                                <strong>
                                                                                    {
                                                                                        item.deliveryFullName
                                                                                    }
                                                                                </strong>

                                                                                ,
                                                                                0
                                                                                {
                                                                                    item.deliveryPhoneNo
                                                                                }
                                                                            </Typography>
                                                                            <Typography
                                                                                className={
                                                                                    styles.addressOptionDetails
                                                                                }
                                                                            >
                                                                                {item.deliveryAddressExtra &&
                                                                                    `${item.deliveryAddressExtra}, `}
                                                                                {
                                                                                    item.deliveryAddress
                                                                                }

                                                                                ,{" "}
                                                                                {
                                                                                    item.deliveryBarangay
                                                                                }

                                                                                ,{" "}
                                                                                {
                                                                                    item.deliveryCity
                                                                                }

                                                                                ,{" "}
                                                                                {
                                                                                    item.deliveryProvince
                                                                                }

                                                                                ,{" "}
                                                                                {
                                                                                    item.deliveryRegion
                                                                                }
                                                                            </Typography>
                                                                        </Box>
                                                                    }
                                                                />
                                                            </Box>
                                                        ),
                                                    )}
                                                </RadioGroup>
                                            )}
                                            {selectedAddress && address ? (
                                                <Button
                                                    className={
                                                        styles.addAddressButton
                                                    }
                                                    onClick={() => {
                                                        setSelectedAddress(
                                                            null,
                                                        );
                                                        setAddress(null);
                                                    }}
                                                >
                                                    <Edit />
                                                    Change Address
                                                </Button>
                                            ) : addAddressOpen ||
                                              allAddress?.length >= 5 ? null : (
                                                <Button
                                                    className={
                                                        styles.addAddressButton
                                                    }
                                                    onClick={() =>
                                                        setAddAddressOpen(true)
                                                    }
                                                >
                                                    <Add />
                                                    Add Delivery Address
                                                </Button>
                                            )}
                                            <Collapse in={addAddressOpen}>
                                                <Box
                                                    className={
                                                        styles.addAddressContainer
                                                    }
                                                    component="form"
                                                    onSubmit={handleSubmit(
                                                        onAddressSubmit,
                                                    )}
                                                >
                                                    <Grid2
                                                        container
                                                        spacing={2.5}
                                                    >
                                                        <Grid2
                                                            size={{
                                                                xs: 12,
                                                                md: 6,
                                                            }}
                                                        >
                                                            <Controller
                                                                name="fullName"
                                                                control={
                                                                    control
                                                                }
                                                                render={({
                                                                    field,
                                                                }) => (
                                                                    <TextField
                                                                        {...field}
                                                                        label="Full Name"
                                                                        error={
                                                                            !!errors.fullName
                                                                        }
                                                                        helperText={
                                                                            errors
                                                                                .fullName
                                                                                ?.message
                                                                        }
                                                                        fullWidth
                                                                    />
                                                                )}
                                                            />
                                                        </Grid2>
                                                        <Grid2
                                                            size={{
                                                                xs: 12,
                                                                md: 6,
                                                            }}
                                                        >
                                                            <Controller
                                                                name="phoneNumber"
                                                                control={
                                                                    control
                                                                }
                                                                render={({
                                                                    field,
                                                                }) => (
                                                                    <TextField
                                                                        {...field}
                                                                        label="Phone Number"
                                                                        error={
                                                                            !!errors.phoneNumber
                                                                        }
                                                                        helperText={
                                                                            errors
                                                                                .phoneNumber
                                                                                ?.message
                                                                        }
                                                                        InputProps={{
                                                                            startAdornment:
                                                                                (
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
                                                        <Grid2
                                                            size={{
                                                                xs: 12,
                                                                md: 12,
                                                            }}
                                                        >
                                                            <Controller
                                                                name="address"
                                                                control={
                                                                    control
                                                                }
                                                                render={({
                                                                    field,
                                                                }) => (
                                                                    <TextField
                                                                        {...field}
                                                                        label="Address"
                                                                        error={
                                                                            !!errors.address
                                                                        }
                                                                        helperText={
                                                                            errors
                                                                                .address
                                                                                ?.message
                                                                        }
                                                                        fullWidth
                                                                    />
                                                                )}
                                                            />
                                                        </Grid2>
                                                        <Grid2
                                                            size={{
                                                                xs: 12,
                                                                md: 6,
                                                            }}
                                                        >
                                                            <Controller
                                                                name="addressInfo"
                                                                control={
                                                                    control
                                                                }
                                                                render={({
                                                                    field,
                                                                }) => (
                                                                    <TextField
                                                                        {...field}
                                                                        label="Apartment/Suite/Unit (Optional)"
                                                                        error={
                                                                            !!errors.addressInfo
                                                                        }
                                                                        helperText={
                                                                            errors
                                                                                .addressInfo
                                                                                ?.message
                                                                        }
                                                                        fullWidth
                                                                    />
                                                                )}
                                                            />
                                                        </Grid2>
                                                        <Grid2
                                                            size={{
                                                                xs: 12,
                                                                md: 6,
                                                            }}
                                                        >
                                                            <Controller
                                                                name="postalCode"
                                                                control={
                                                                    control
                                                                }
                                                                render={({
                                                                    field,
                                                                }) => (
                                                                    <TextField
                                                                        {...field}
                                                                        label="Postal Code"
                                                                        error={
                                                                            !!errors.postalCode
                                                                        }
                                                                        helperText={
                                                                            errors
                                                                                .postalCode
                                                                                ?.message
                                                                        }
                                                                        fullWidth
                                                                    />
                                                                )}
                                                            />
                                                        </Grid2>
                                                        <Grid2
                                                            size={{
                                                                xs: 12,
                                                                md: 6,
                                                            }}
                                                        >
                                                            <Controller
                                                                name="region"
                                                                control={
                                                                    control
                                                                }
                                                                render={({
                                                                    field,
                                                                }) => (
                                                                    <TextField
                                                                        {...field}
                                                                        select
                                                                        label="Region"
                                                                        error={
                                                                            !!errors.region
                                                                        }
                                                                        helperText={
                                                                            errors
                                                                                .region
                                                                                ?.message
                                                                        }
                                                                        value={
                                                                            formState.region
                                                                        }
                                                                        onChange={(
                                                                            e,
                                                                        ) => {
                                                                            field.onChange(
                                                                                e,
                                                                            );
                                                                            handleInputChange(
                                                                                "region",
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                            );
                                                                        }}
                                                                        fullWidth
                                                                    >
                                                                        {references?.region?.map(
                                                                            (
                                                                                option,
                                                                            ) => (
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
                                                        <Grid2
                                                            size={{
                                                                xs: 12,
                                                                md: 6,
                                                            }}
                                                        >
                                                            <Controller
                                                                name="province"
                                                                control={
                                                                    control
                                                                }
                                                                render={({
                                                                    field,
                                                                }) => (
                                                                    <TextField
                                                                        {...field}
                                                                        select
                                                                        label="Province"
                                                                        error={
                                                                            !!errors.province
                                                                        }
                                                                        helperText={
                                                                            errors
                                                                                .province
                                                                                ?.message
                                                                        }
                                                                        value={
                                                                            formState.province
                                                                        }
                                                                        onChange={(
                                                                            e,
                                                                        ) => {
                                                                            handleInputChange(
                                                                                "province",
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                            );
                                                                            field.onChange(
                                                                                e,
                                                                            );
                                                                        }}
                                                                        disabled={
                                                                            !formState.region
                                                                        }
                                                                        fullWidth
                                                                    >
                                                                        {references?.province
                                                                            ?.filter(
                                                                                (
                                                                                    option,
                                                                                ) =>
                                                                                    option.regionID ===
                                                                                    formState.region,
                                                                            )
                                                                            .map(
                                                                                (
                                                                                    option,
                                                                                ) => (
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
                                                                                ),
                                                                            )}
                                                                    </TextField>
                                                                )}
                                                            />
                                                        </Grid2>
                                                        <Grid2
                                                            size={{
                                                                xs: 12,
                                                                md: 6,
                                                            }}
                                                        >
                                                            <Controller
                                                                name="municipality"
                                                                control={
                                                                    control
                                                                }
                                                                render={({
                                                                    field,
                                                                }) => (
                                                                    <TextField
                                                                        {...field}
                                                                        select
                                                                        label="City/Municipality"
                                                                        error={
                                                                            !!errors.municipality
                                                                        }
                                                                        helperText={
                                                                            errors
                                                                                .municipality
                                                                                ?.message
                                                                        }
                                                                        value={
                                                                            formState.municipality
                                                                        }
                                                                        onChange={(
                                                                            e,
                                                                        ) => {
                                                                            handleInputChange(
                                                                                "municipality",
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                            );
                                                                            field.onChange(
                                                                                e,
                                                                            );
                                                                        }}
                                                                        disabled={
                                                                            !formState.province
                                                                        }
                                                                        fullWidth
                                                                    >
                                                                        {references?.municipality
                                                                            ?.filter(
                                                                                (
                                                                                    option,
                                                                                ) =>
                                                                                    option.provinceID ===
                                                                                    formState.province,
                                                                            )
                                                                            .map(
                                                                                (
                                                                                    option,
                                                                                ) => (
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
                                                                                ),
                                                                            )}
                                                                    </TextField>
                                                                )}
                                                            />
                                                        </Grid2>
                                                        <Grid2
                                                            size={{
                                                                xs: 12,
                                                                md: 6,
                                                            }}
                                                        >
                                                            <Controller
                                                                name="barangay"
                                                                control={
                                                                    control
                                                                }
                                                                render={({
                                                                    field,
                                                                }) => (
                                                                    <TextField
                                                                        {...field}
                                                                        select
                                                                        label="Barangay"
                                                                        error={
                                                                            !!errors.barangay
                                                                        }
                                                                        helperText={
                                                                            errors
                                                                                .barangay
                                                                                ?.message
                                                                        }
                                                                        value={
                                                                            formState.barangay
                                                                        }
                                                                        onChange={(
                                                                            e,
                                                                        ) => {
                                                                            handleInputChange(
                                                                                "barangay",
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                            );
                                                                            field.onChange(
                                                                                e,
                                                                            );
                                                                        }}
                                                                        disabled={
                                                                            !formState.municipality
                                                                        }
                                                                        fullWidth
                                                                    >
                                                                        {references?.barangay
                                                                            ?.filter(
                                                                                (
                                                                                    option,
                                                                                ) =>
                                                                                    option.municipalityID ===
                                                                                    formState.municipality,
                                                                            )
                                                                            .map(
                                                                                (
                                                                                    option,
                                                                                ) => (
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
                                                                                ),
                                                                            )}
                                                                    </TextField>
                                                                )}
                                                            />
                                                        </Grid2>
                                                    </Grid2>
                                                    <Box
                                                        className={
                                                            styles.addAddressButtonContainer
                                                        }
                                                    >
                                                        <Button
                                                            className={
                                                                styles.addAddressCancel
                                                            }
                                                            onClick={() => {
                                                                setAddAddressOpen(
                                                                    false,
                                                                );
                                                                reset();
                                                                setFormState({
                                                                    region: "",
                                                                    province:
                                                                        "",
                                                                    municipality:
                                                                        "",
                                                                    barangay:
                                                                        "",
                                                                });
                                                            }}
                                                        >
                                                            Cancel
                                                        </Button>
                                                        <Button
                                                            className={
                                                                styles.addAddressSave
                                                            }
                                                            type="submit"
                                                        >
                                                            Save
                                                        </Button>
                                                    </Box>
                                                </Box>
                                            </Collapse>
                                        </AccordionDetails>
                                    </Accordion>
                                </Box>
                                <Box>
                                    <Typography className={styles.formTitle}>
                                        Payment
                                    </Typography>
                                    <RadioGroup
                                        value={selectedPayment}
                                        onChange={handleChangePayment}
                                    >
                                        <Box>
                                            <FormControlLabel
                                                className={
                                                    selectedPayment === "online"
                                                        ? `${styles.radioButtonSelected}`
                                                        : styles.radioButton
                                                }
                                                value="online"
                                                control={<Radio />}
                                                label="Online Payment"
                                            />
                                            <Collapse
                                                in={
                                                    selectedPayment === "online"
                                                }
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
                                                    selectedPayment ===
                                                    "e-wallet"
                                                        ? `${styles.radioButtonSelected}`
                                                        : styles.radioButton
                                                }
                                                value="e-wallet"
                                                control={<Radio />}
                                                label="E-Wallet"
                                            />
                                            <Collapse
                                                in={
                                                    selectedPayment ===
                                                    "e-wallet"
                                                }
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
                                                    selectedPayment === "cod"
                                                        ? `${styles.radioButtonSelected}`
                                                        : styles.radioButton
                                                }
                                                value="cod"
                                                control={<Radio />}
                                                label="Cash On Delivery"
                                            />
                                            <Collapse
                                                in={selectedPayment === "cod"}
                                            >
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
                                <Button className={styles.placeOrderButton}>
                                    Place Order
                                </Button>
                            </Box>
                        </Grid2>
                        {isSmallScreen ? null : (
                            <CheckOutSummary items={items} total={total} />
                        )}
                    </Grid2>
                </Container>
            </div>
            <Footer />
        </div>
    );
}
