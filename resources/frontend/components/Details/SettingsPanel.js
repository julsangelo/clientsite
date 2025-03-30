import React, { useEffect, useState } from "react";
import styles from "./SettingsPanel.module";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Button, TextField, Typography, Grid2 } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { updateProfile } from "../../ajax/backend";
import { useFlashMessage } from "../../context/FlashMessage";

export default function SettingsPanel() {
    document.title = "Settings | Cliff Motorshop";
    const { user, setUpdate } = useAuth();
    const [isChangePassword, setIsChangePassword] = useState(false);
    const [validationSchema, setValidationSchema] = useState(yup.object({}));
    const { setFlashMessage, setFlashStatus } = useFlashMessage();

    useEffect(() => {
        setValidationSchema(
            yup.object({
                customerUsername: yup.string().required("Username is required"),
                customerEmail: yup
                    .string()
                    .email("Invalid email")
                    .required("Email is required"),
                customerContactNo: yup
                    .string()
                    .matches(/^09\d{9}$/, "Invalid phone number")
                    .required("Contact number is required"),
                ...(isChangePassword && {
                    currentPassword: yup
                        .string()
                        .required("Current password is required"),
                    newPassword: yup
                        .string()
                        .min(8, "Password must be at least 8 characters")
                        .matches(
                            /[A-Z]/,
                            "Must contain at least one uppercase letter",
                        )
                        .matches(
                            /[a-z]/,
                            "Must contain at least one lowercase letter",
                        )
                        .matches(/[0-9]/, "Must contain at least one number")
                        .matches(
                            /[\W_]/,
                            "Must contain at least one special character",
                        )
                        .required("New password is required"),
                    confirmPassword: yup
                        .string()
                        .oneOf([yup.ref("newPassword")], "Passwords must match")
                        .required("Confirm password is required"),
                }),
            }),
        );
    }, [isChangePassword]);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            customerUsername: user?.customerUsername || "",
            customerEmail: user?.customerEmail || "",
            customerContactNo: user?.customerContactNo || "",
        },
        resolver: yupResolver(validationSchema),
    });

    useEffect(() => {
        if (user) {
            reset({
                customerUsername: user.customerUsername || "",
                customerEmail: user.customerEmail || "",
                customerContactNo: user.customerContactNo || "",
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });
        }
    }, [user, reset]);

    const onSubmit = (data) => {
        if (!isChangePassword) {
            delete data.currentPassword;
            delete data.newPassword;
            delete data.confirmPassword;
        }
        updateProfile(data, (response) => {
            setFlashMessage(response.message);
            setFlashStatus(response.status);
            if (response.status === "success") {
                setIsChangePassword(false);
                setUpdate();
            }
        });
    };

    return (
        <Grid2 spacing={3}>
            <Grid2 xs={12}>
                <Typography className={styles.tabTitle}>
                    Profile Settings
                </Typography>
            </Grid2>
            <Grid2 xs={12} component="form" onSubmit={handleSubmit(onSubmit)}>
                <Box className={styles.settingsContainer}>
                    <Controller
                        name="customerUsername"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                label="Username"
                                error={!!errors.customerUsername}
                                helperText={errors.customerUsername?.message}
                                margin="normal"
                            />
                        )}
                    />
                    <Controller
                        name="customerEmail"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                label="Email"
                                error={!!errors.customerEmail}
                                helperText={errors.customerEmail?.message}
                                margin="normal"
                            />
                        )}
                    />
                    <Controller
                        name="customerContactNo"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                label="Contact Number"
                                error={!!errors.customerContactNo}
                                helperText={errors.customerContactNo?.message}
                                margin="normal"
                            />
                        )}
                    />
                    {!isChangePassword && (
                        <Button onClick={() => setIsChangePassword(true)}>
                            Change password
                        </Button>
                    )}
                    {isChangePassword && (
                        <Box className={styles.editPasswordBox}>
                            <Controller
                                name="currentPassword"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="Current Password"
                                        type="password"
                                        error={!!errors.currentPassword}
                                        helperText={
                                            errors.currentPassword?.message
                                        }
                                        margin="normal"
                                    />
                                )}
                            />
                            <Controller
                                name="newPassword"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="New Password"
                                        type="password"
                                        error={!!errors.newPassword}
                                        helperText={errors.newPassword?.message}
                                        margin="normal"
                                    />
                                )}
                            />
                            <Controller
                                name="confirmPassword"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="Confirm New Password"
                                        type="password"
                                        error={!!errors.confirmPassword}
                                        helperText={
                                            errors.confirmPassword?.message
                                        }
                                        margin="normal"
                                    />
                                )}
                            />
                            <Button
                                className={styles.editPasswordCancel}
                                onClick={() => {
                                    setIsChangePassword(false);
                                    reset((prevValues) => ({
                                        ...prevValues,
                                        currentPassword: "",
                                        newPassword: "",
                                        confirmPassword: "",
                                    }));
                                }}
                            >
                                Cancel
                            </Button>
                        </Box>
                    )}
                </Box>
                <Button type="submit">Save Changes</Button>
            </Grid2>
        </Grid2>
    );
}
