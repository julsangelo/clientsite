import React, { useContext, useState } from "react";
import styles from "./AddAddressForm.module";
import {
    Box,
    Button,
    Collapse,
    Grid2,
    InputAdornment,
    MenuItem,
    TextField,
} from "@mui/material";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { useReference } from "../context/ReferenceProvider";
import { addAddress } from "../ajax/backend";
import { useFlashMessage } from "../context/FlashMessage";
import { yupResolver } from "@hookform/resolvers/yup";

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

export default function AddAddressForm({
    addAddressOpen,
    setAddressUpdated,
    setAddAddressOpen,
    page,
}) {
    const { setFlashMessage, setFlashStatus } = useFlashMessage();
    const { references } = useReference();
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

    return (
        <Collapse in={addAddressOpen}>
            <Box
                className={
                    page === "details"
                        ? styles.addAddressContainerDetails
                        : styles.addAddressContainerCheckout
                }
                component="form"
                onSubmit={handleSubmit(onAddressSubmit)}
            >
                <Grid2 container spacing={2.5}>
                    <Grid2
                        size={{
                            xs: 12,
                            md: 6,
                        }}
                    >
                        <Controller
                            name="fullName"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Full Name"
                                    error={!!errors.fullName}
                                    helperText={errors.fullName?.message}
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
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Phone Number"
                                    error={!!errors.phoneNumber}
                                    helperText={errors.phoneNumber?.message}
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
                    <Grid2
                        size={{
                            xs: 12,
                            md: 12,
                        }}
                    >
                        <Controller
                            name="address"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Address"
                                    error={!!errors.address}
                                    helperText={errors.address?.message}
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
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Apartment/Suite/Unit (Optional)"
                                    error={!!errors.addressInfo}
                                    helperText={errors.addressInfo?.message}
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
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Postal Code"
                                    error={!!errors.postalCode}
                                    helperText={errors.postalCode?.message}
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
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    select
                                    label="Region"
                                    error={!!errors.region}
                                    helperText={errors.region?.message}
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
                                    {references?.region?.map((option) => (
                                        <MenuItem
                                            key={option.regionID}
                                            value={option.regionID}
                                        >
                                            {option.regionDescription}
                                        </MenuItem>
                                    ))}
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
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    select
                                    label="Province"
                                    error={!!errors.province}
                                    helperText={errors.province?.message}
                                    value={formState.province}
                                    onChange={(e) => {
                                        handleInputChange(
                                            "province",
                                            e.target.value,
                                        );
                                        field.onChange(e);
                                    }}
                                    disabled={!formState.region}
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
                                                key={option.provinceID}
                                                value={option.provinceID}
                                            >
                                                {option.provinceName}
                                            </MenuItem>
                                        ))}
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
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    select
                                    label="City/Municipality"
                                    error={!!errors.municipality}
                                    helperText={errors.municipality?.message}
                                    value={formState.municipality}
                                    onChange={(e) => {
                                        handleInputChange(
                                            "municipality",
                                            e.target.value,
                                        );
                                        field.onChange(e);
                                    }}
                                    disabled={!formState.province}
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
                                                key={option.municipalityID}
                                                value={option.municipalityID}
                                            >
                                                {option.municipalityName}
                                            </MenuItem>
                                        ))}
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
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    select
                                    label="Barangay"
                                    error={!!errors.barangay}
                                    helperText={errors.barangay?.message}
                                    value={formState.barangay}
                                    onChange={(e) => {
                                        handleInputChange(
                                            "barangay",
                                            e.target.value,
                                        );
                                        field.onChange(e);
                                    }}
                                    disabled={!formState.municipality}
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
                                                key={option.barangayID}
                                                value={option.barangayID}
                                            >
                                                {option.barangayName}
                                            </MenuItem>
                                        ))}
                                </TextField>
                            )}
                        />
                    </Grid2>
                </Grid2>
                <Box className={styles.addAddressButtonContainer}>
                    <Button
                        className={styles.addAddressCancel}
                        onClick={() => {
                            setAddAddressOpen(false);
                            reset();
                            setFormState({
                                region: "",
                                province: "",
                                municipality: "",
                                barangay: "",
                            });
                        }}
                    >
                        Cancel
                    </Button>
                    <Button className={styles.addAddressSave} type="submit">
                        Save
                    </Button>
                </Box>
            </Box>
        </Collapse>
    );
}
