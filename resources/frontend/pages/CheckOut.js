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
    RadioGroup,
    FormControlLabel,
    Radio,
    Collapse,
    List,
    ListItem,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from "@mui/material";
import {
    createInvoice,
    getAllAddress,
    getCart,
    getProductDetail,
    placeOrder,
} from "../ajax/backend";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Add, CreditCard, Edit, ExpandMore } from "@mui/icons-material";

import { useFlashMessage } from "../context/FlashMessage.js";
import CheckOutSummary from "../components/Checkout/CheckOutSummary.js";
import AddAddressForm from "../components/AddAddressForm.js";
import { useAuth } from "../context/AuthContext.js";

const navigation = performance.getEntriesByType("navigation")[0];
const isReloaded = navigation && navigation.type === "reload";

if (!isReloaded) {
    localStorage.removeItem("item");
}

const paymentMethodDisplayNames = {
    SHOPEEPAY: "ShopeePay",
    GCASH: "GCash",
    PAYMAYA: "Maya",
    GRABPAY: "GrabPay",
    BILLEASE: "BillEase",
    CASHALO: "Cashalo",
    QRPH: "QRPh",
    "7ELEVEN": "7-Eleven",
    CEBUANA: "Cebuana",
    DP_MLHUILLIER: "M Lhuillier",
    DP_ECPAY_LOAN: "ECPay Loan",
    DP_PALAWAN: "Palawan Express",
    LBC: "LBC",
    DP_ECPAY_SCHOOL: "ECPay School",
};

export default function CheckOut() {
    const { user } = useAuth();
    const [selectedPayment, setSelectedPayment] = useState();
    const [selectedAddress, setSelectedAddress] = useState();
    const [paymentInvoice, setPaymentInvoice] = useState();
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
        if (!user || total <= 0) return;

        const invoice = {
            externalID: `cliff-${user.customerID}-${Date.now()}`,
            amount: total,
            email: user.customerEmail,
            desc: `Cliff Motorshop Invoice for ${user.customerUsername} for order with date ${new Date().toISOString()}`,
            duration: 86400,
            currency: "PHP",
        };
        createInvoice(invoice, (response) => {
            setPaymentInvoice(response);
        });
    }, [user, total]);

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
                                                    selectedPayment === "card"
                                                        ? `${styles.radioButtonSelected}`
                                                        : styles.radioButton
                                                }
                                                value="card"
                                                control={<Radio />}
                                                label="Debit/Credit Card"
                                            />
                                            <Collapse
                                                in={selectedPayment === "card"}
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

                                        {paymentInvoice?.available_direct_debits
                                            .length > 0 && (
                                            <Box>
                                                <FormControlLabel
                                                    className={
                                                        selectedPayment ===
                                                        "directDebit"
                                                            ? `${styles.radioButtonSelected}`
                                                            : styles.radioButton
                                                    }
                                                    value="directDebit"
                                                    control={<Radio />}
                                                    label="Direct Debit"
                                                />
                                                <Collapse
                                                    in={
                                                        selectedPayment ===
                                                        "directDebit"
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
                                        )}

                                        {paymentInvoice?.available_ewallets
                                            .length > 0 && (
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
                                                        <List>
                                                            {paymentInvoice?.available_ewallets.map(
                                                                (
                                                                    item,
                                                                    index,
                                                                ) => (
                                                                    <ListItem
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        <Button
                                                                            className={
                                                                                styles.paymentOptions
                                                                            }
                                                                        >
                                                                            <CreditCard />
                                                                            <Typography>
                                                                                {
                                                                                    paymentMethodDisplayNames[
                                                                                        item
                                                                                            .ewallet_type
                                                                                    ]
                                                                                }
                                                                            </Typography>
                                                                        </Button>
                                                                    </ListItem>
                                                                ),
                                                            )}
                                                        </List>
                                                    </Box>
                                                </Collapse>
                                            </Box>
                                        )}

                                        {paymentInvoice?.available_paylaters
                                            .length > 0 && (
                                            <Box>
                                                <FormControlLabel
                                                    className={
                                                        selectedPayment ===
                                                        "paylaters"
                                                            ? `${styles.radioButtonSelected}`
                                                            : styles.radioButton
                                                    }
                                                    value="paylaters"
                                                    control={<Radio />}
                                                    label="Pay Later"
                                                />
                                                <Collapse
                                                    in={
                                                        selectedPayment ===
                                                        "paylaters"
                                                    }
                                                >
                                                    <Box
                                                        className={
                                                            styles.paymentAccordion
                                                        }
                                                    >
                                                        <List>
                                                            {paymentInvoice?.available_paylaters.map(
                                                                (
                                                                    item,
                                                                    index,
                                                                ) => (
                                                                    <ListItem
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        <Button
                                                                            className={
                                                                                styles.paymentOptions
                                                                            }
                                                                        >
                                                                            <CreditCard />
                                                                            <Typography>
                                                                                {
                                                                                    paymentMethodDisplayNames[
                                                                                        item
                                                                                            .paylater_type
                                                                                    ]
                                                                                }
                                                                            </Typography>
                                                                        </Button>
                                                                    </ListItem>
                                                                ),
                                                            )}
                                                        </List>
                                                    </Box>
                                                </Collapse>
                                            </Box>
                                        )}

                                        {paymentInvoice?.available_qr_codes
                                            .length > 0 && (
                                            <Box>
                                                <FormControlLabel
                                                    className={
                                                        selectedPayment ===
                                                        "qrCode"
                                                            ? `${styles.radioButtonSelected}`
                                                            : styles.radioButton
                                                    }
                                                    value="qrCode"
                                                    control={<Radio />}
                                                    label="Pay With QR"
                                                />
                                                <Collapse
                                                    in={
                                                        selectedPayment ===
                                                        "qrCode"
                                                    }
                                                >
                                                    <Box
                                                        className={
                                                            styles.paymentAccordion
                                                        }
                                                    >
                                                        <List>
                                                            {paymentInvoice?.available_qr_codes.map(
                                                                (
                                                                    item,
                                                                    index,
                                                                ) => (
                                                                    <ListItem
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        <Button
                                                                            className={
                                                                                styles.paymentOptions
                                                                            }
                                                                        >
                                                                            <CreditCard />
                                                                            <Typography>
                                                                                {
                                                                                    paymentMethodDisplayNames[
                                                                                        item
                                                                                            .qr_code_type
                                                                                    ]
                                                                                }
                                                                            </Typography>
                                                                        </Button>
                                                                    </ListItem>
                                                                ),
                                                            )}
                                                        </List>
                                                    </Box>
                                                </Collapse>
                                            </Box>
                                        )}

                                        {paymentInvoice
                                            ?.available_retail_outlets.length >
                                            0 && (
                                            <Box>
                                                <FormControlLabel
                                                    className={
                                                        selectedPayment ===
                                                        "retailOutlets"
                                                            ? `${styles.radioButtonSelected}`
                                                            : styles.radioButton
                                                    }
                                                    value="retailOutlets"
                                                    control={<Radio />}
                                                    label="Retail Outlets"
                                                />
                                                <Collapse
                                                    in={
                                                        selectedPayment ===
                                                        "retailOutlets"
                                                    }
                                                >
                                                    <Box
                                                        className={
                                                            styles.paymentAccordion
                                                        }
                                                    >
                                                        <List>
                                                            {paymentInvoice?.available_retail_outlets.map(
                                                                (
                                                                    item,
                                                                    index,
                                                                ) => (
                                                                    <ListItem
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        <Button
                                                                            className={
                                                                                styles.paymentOptions
                                                                            }
                                                                        >
                                                                            <CreditCard />
                                                                            <Typography>
                                                                                {
                                                                                    paymentMethodDisplayNames[
                                                                                        item
                                                                                            .retail_outlet_name
                                                                                    ]
                                                                                }
                                                                            </Typography>
                                                                        </Button>
                                                                    </ListItem>
                                                                ),
                                                            )}
                                                        </List>
                                                    </Box>
                                                </Collapse>
                                            </Box>
                                        )}

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
