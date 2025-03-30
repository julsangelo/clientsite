import React, { useState, useEffect } from "react";
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
    RadioGroup,
    FormControlLabel,
    Radio,
    Collapse,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Modal,
    IconButton,
    CircularProgress,
} from "@mui/material";
import {
    getAllAddress,
    getCart,
    getProductDetail,
    placeOrder,
} from "../ajax/backend";
import { Add, Close, Edit, ExpandMore } from "@mui/icons-material";
import CheckOutSummary from "../components/Checkout/CheckOutSummary.js";
import AddAddressForm from "../components/AddAddressForm.js";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFlashMessage } from "../context/FlashMessage.js";
import Brand from "../components/Brand.js";

export default function CheckOut() {
    document.title = "Checkout | Cliff Motorshop";
    const location = useLocation();
    const navigate = useNavigate();
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
    const checkoutItem = location.state;
    const [expanded, setExpanded] = useState(false);
    const [placeOrderResponse, setPlaceOrderResponse] = useState();
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const [orderNumber, setOrderNumber] = useState();
    const [isLoading, setIsLoading] = useState(false);

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

    useEffect(() => {
        getAllAddress((response) => {
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

        setTotal(total);
    }, [items]);

    const handleSubmitOrder = () => {
        setIsLoading(true);
        const orderData = {
            orderDeliveryID: selectedAddress,
            orderItems: items,
            orderTotal: total,
            orderPaymentMethod: selectedPayment,
        };

        placeOrder(orderData, (response) => {
            if (response.status === "success") {
                setPlaceOrderResponse(response.message);
                setOrderNumber(response.orderNumber);
            } else if (response.status === "error") {
                setFlashMessage(response.message);
                setFlashStatus(response.status);
            }
            setIsLoading(false);
        });
    };

    useEffect(() => {
        if (placeOrderResponse) {
            setConfirmationOpen(true);
        }
    }, [placeOrderResponse]);

    return (
        <div className={styles.page}>
            <Navbar />
            <div className={styles.checkOut}>
                <Container maxWidth="xl">
                    <Grid2 container spacing={3}>
                        <Grid2 size={{ xs: 12 }}>
                            <Box className={styles.brandContainer}>
                                <Brand fontSize="40px" />
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
                                                                        <Radio
                                                                            size="small"
                                                                            sx={{
                                                                                display:
                                                                                    "none",
                                                                            }}
                                                                        />
                                                                    }
                                                                    label={
                                                                        <Box>
                                                                            {item.deliveryIsDefault ==
                                                                                1 && (
                                                                                <Typography
                                                                                    className={
                                                                                        styles.addressOptionDefault
                                                                                    }
                                                                                >
                                                                                    Default
                                                                                    Address
                                                                                </Typography>
                                                                            )}
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
                                            <AddAddressForm
                                                addAddressOpen={addAddressOpen}
                                                setAddressUpdated={
                                                    setAddressUpdated
                                                }
                                                setAddAddressOpen={
                                                    setAddAddressOpen
                                                }
                                                page="checkout"
                                            />
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
                                                label="Pay Online"
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
                                                    <Typography
                                                        className={
                                                            styles.paymentText
                                                        }
                                                    >
                                                        Pay online using card,
                                                        direct debit, e-wallets,
                                                        pay later options, QR,
                                                        or retail outlets.
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
                                <Button
                                    className={styles.placeOrderButton}
                                    onClick={() => handleSubmitOrder()}
                                >
                                    {isLoading ? (
                                        <CircularProgress
                                            size="28px"
                                            className={styles.progress}
                                        />
                                    ) : (
                                        "Place Order"
                                    )}
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
            <Modal open={confirmationOpen} className={styles.confirmationModal}>
                <Box className={styles.confirmationContainer}>
                    <IconButton
                        className={styles.modalCloseButton}
                        onClick={() => {
                            setConfirmationOpen(false);
                            navigate("/details", {
                                state: { value: 0, orderNo: orderNumber },
                            });
                        }}
                    >
                        <Close />
                    </IconButton>
                    <DotLottieReact
                        src="https://lottie.host/22ec7a6a-9eb1-4a90-8a8a-b19155ef948d/Wq39rWzqPb.lottie"
                        autoplay
                    />
                    <Typography
                        className={styles.confirmationModalText}
                        dangerouslySetInnerHTML={{ __html: placeOrderResponse }}
                    />
                </Box>
            </Modal>
        </div>
    );
}
