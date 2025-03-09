import React, { useState } from "react";
import styles from "./AddressPanel.module";
import { Add, DeleteOutline, Edit } from "@mui/icons-material";
import {
    Box,
    Button,
    FormControlLabel,
    Grid2,
    IconButton,
    Radio,
    RadioGroup,
    Typography,
} from "@mui/material";
import AddAddressForm from "../AddAddressForm";
import EditAddressForm from "./AddressPanel/EditAddressForm";
import { getAddress } from "../../ajax/backend";

export default function AddressPanel({
    addressItem,
    setAddressUpdated,
    setIsRemoveOpen,
    setDeleteAddressID,
    setRemoveItemType,
}) {
    const [addAddressOpen, setAddAddressOpen] = useState(false);
    const [editAddressOpen, setEditAddressOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState();
    const [editAddressItem, setEditAddressItem] = useState();

    const handleChangeAddress = (event) => {
        setEditAddressOpen(false);
        setAddAddressOpen(false);
        setSelectedAddress(event.target.value);
    };

    const handleEditAddress = (orderDeliveryID) => {
        getAddress(orderDeliveryID, (response) => {
            setEditAddressItem(response);
        });
    };

    return (
        <Grid2 container spacing={3}>
            <Grid2 size={{ xs: 12 }}>
                <Typography className={styles.tabTitle}>
                    My addresses
                </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
                {addressItem && addressItem.length !== 0 ? (
                    <Box className={styles.addressesContainer}>
                        <RadioGroup
                            className={styles.addressOptionContainer}
                            key={addressItem?.length}
                            onChange={handleChangeAddress}
                            value={selectedAddress || ""}
                        >
                            {addressItem?.map((item, index) => (
                                <Box key={index}>
                                    {editAddressOpen &&
                                    selectedAddress ==
                                        item.orderDeliveryID ? null : (
                                        <Box
                                            className={
                                                selectedAddress ==
                                                item.orderDeliveryID
                                                    ? styles.addressOptionSelected
                                                    : styles.addressOptionNotSelected
                                            }
                                        >
                                            <FormControlLabel
                                                value={item.orderDeliveryID}
                                                control={
                                                    <Radio
                                                        size="small"
                                                        sx={{ display: "none" }}
                                                    />
                                                }
                                                sx={{
                                                    width: "100%",
                                                    ".MuiFormControlLabel-label":
                                                        {
                                                            width: "100%",
                                                        },
                                                }}
                                                label={
                                                    <Box
                                                        className={
                                                            styles.addressOptionBox
                                                        }
                                                    >
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
                                                                , 0
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
                                                        {selectedAddress ==
                                                        item.orderDeliveryID ? (
                                                            <Box
                                                                className={
                                                                    styles.addressOptionButtons
                                                                }
                                                            >
                                                                <IconButton
                                                                    className={
                                                                        styles.addressOptionButton
                                                                    }
                                                                    onClick={() => {
                                                                        handleEditAddress(
                                                                            item.orderDeliveryID,
                                                                        );
                                                                        setEditAddressOpen(
                                                                            true,
                                                                        );
                                                                    }}
                                                                >
                                                                    <Edit />
                                                                </IconButton>
                                                                <IconButton
                                                                    className={
                                                                        styles.addressOptionButton
                                                                    }
                                                                    onClick={() => {
                                                                        setIsRemoveOpen(
                                                                            true,
                                                                        );
                                                                        setRemoveItemType(
                                                                            "address",
                                                                        );
                                                                        setDeleteAddressID(
                                                                            item.orderDeliveryID,
                                                                        );
                                                                    }}
                                                                >
                                                                    <DeleteOutline />
                                                                </IconButton>
                                                            </Box>
                                                        ) : null}
                                                    </Box>
                                                }
                                            />
                                        </Box>
                                    )}
                                    {editAddressItem?.orderDeliveryID ===
                                        item.orderDeliveryID && (
                                        <EditAddressForm
                                            editAddressOpen={editAddressOpen}
                                            setAddressUpdated={
                                                setAddressUpdated
                                            }
                                            setEditAddressOpen={
                                                setEditAddressOpen
                                            }
                                            editAddressItem={editAddressItem}
                                        />
                                    )}
                                </Box>
                            ))}
                        </RadioGroup>
                    </Box>
                ) : addAddressOpen ? null : (
                    <Typography className={styles.addressNoItemsText}>
                        No address.
                    </Typography>
                )}
                {addressItem?.length < 5 && !addAddressOpen ? (
                    <Button
                        onClick={() => {
                            setAddAddressOpen(true);
                            setEditAddressOpen(false);
                            setSelectedAddress();
                        }}
                    >
                        <Add />
                        Add Delivery Address
                    </Button>
                ) : null}
                <AddAddressForm
                    addAddressOpen={addAddressOpen}
                    setAddressUpdated={setAddressUpdated}
                    setAddAddressOpen={setAddAddressOpen}
                    page="details"
                />
            </Grid2>
        </Grid2>
    );
}
