import React, { useState } from "react";
import styles from "./AuthModal.module";
import {
    Modal,
    Grid2,
    TextField,
    InputAdornment,
    Box,
    IconButton,
    Typography,
    Button,
    Link,
    CircularProgress,
} from "@mui/material";
import { Close, Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { signIn, signUp } from "../ajax/backend";
import { useFlashMessage } from "../context/FlashMessage";

const validationSchema = (isLogin) =>
    Yup.object().shape({
        email: Yup.string()
            .email("Invalid email")
            .required("Email is required"),
        password: isLogin
            ? Yup.string()
                  .min(8, "Password must be at least 8 characters")
                  .required("Password is required")
            : Yup.string()
                  .min(8, "Password must be at least 8 characters")
                  .matches(
                      /[A-Z]/,
                      "Password must contain at least one uppercase letter",
                  )
                  .matches(
                      /[a-z]/,
                      "Password must contain at least one lowercase letter",
                  )
                  .matches(/[0-9]/, "Password must contain at least one number")
                  .matches(
                      /[\W_]/,
                      "Password must contain at least one special character",
                  )
                  .required("Password is required"),
        firstName: isLogin
            ? Yup.string()
            : Yup.string().required("First name is required"),
        lastName: isLogin
            ? Yup.string()
            : Yup.string().required("Last name is required"),
        phoneNumber: isLogin
            ? Yup.string()
            : Yup.string()
                  .matches(/^\d{11}$/, "Phone number must be exactly 11 digits")
                  .required("Phone number is required")
                  .matches(/^\d+$/, "Phone number must contain only numbers"),
        confirmPassword: isLogin
            ? Yup.string()
            : Yup.string()
                  .oneOf([Yup.ref("password"), null], "Passwords must match")
                  .required("Confirm password is required"),
    });

export default function AuthModal({ isOpen, setModalOpen }) {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { setFlashMessage, setFlashStatus } = useFlashMessage();

    const {
        control,
        handleSubmit,
        reset,
        setError,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema(isLogin)),
        defaultValues: {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
            confirmPassword: "",
        },
    });

    const onSubmit = (data) => {
        setLoading(true);
        const request = isLogin ? signIn : signUp;

        request(data, (response) => {
            setLoading(false);
            if (!response?.errors) {
                setFlashMessage(response.message);
                setFlashStatus(response.status);
                if (!isLogin) {
                    setIsLogin(true);
                }
            } else {
                Object.keys(response.errors).forEach((key) => {
                    setError(key, {
                        type: "server",
                        message: response.errors[key][0],
                    });
                });
            }
        });
    };

    const handleClickShowPassword = () => {
        setShowPassword((show) => !show);
    };

    const toggleMode = () => {
        setIsLogin((prev) => !prev);
        reset(
            {
                email: "",
                password: "",
                firstName: "",
                lastName: "",
                phoneNumber: "",
                confirmPassword: "",
            },
            { keepValues: false },
        );
    };

    return (
        <Modal
            open={isOpen}
            onClose={() => {
                setModalOpen(false);
                reset();
            }}
            className={styles.modalContainer}
        >
            <Box className={styles.form}>
                <IconButton
                    className={styles.modalCloseButton}
                    onClick={() => {
                        setIsLogin(true);
                        setModalOpen(false);
                        reset();
                        setShowPassword(false);
                    }}
                >
                    <Close />
                </IconButton>
                <Typography className={styles.formTitle}>Cliff</Typography>
                <Typography className={styles.formSubtext}>
                    {isLogin
                        ? "Welcome back! Please log in to access your account and explore our latest products."
                        : "Join us and unlock exclusive deals, updates, and a personalized shopping experience!"}
                </Typography>
                <Box>
                    <Grid2 container spacing={2}>
                        {!isLogin && (
                            <>
                                <Grid2 size={{ xs: 12, md: 6 }}>
                                    <Controller
                                        name="firstName"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label="First Name"
                                                fullWidth
                                                error={!!errors.firstName}
                                                helperText={
                                                    errors.firstName?.message
                                                }
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
                                                fullWidth
                                                error={!!errors.lastName}
                                                helperText={
                                                    errors.lastName?.message
                                                }
                                            />
                                        )}
                                    />
                                </Grid2>
                            </>
                        )}
                        <Grid2 size={{ xs: 12 }}>
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Email"
                                        fullWidth
                                        error={!!errors.email}
                                        helperText={errors.email?.message}
                                    />
                                )}
                            />
                        </Grid2>
                        {!isLogin && (
                            <Grid2 size={{ xs: 12 }}>
                                <Controller
                                    name="phoneNumber"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Phone Number"
                                            fullWidth
                                            error={!!errors.phoneNumber}
                                            helperText={
                                                errors.phoneNumber?.message
                                            }
                                        />
                                    )}
                                />
                            </Grid2>
                        )}
                        <Grid2 size={{ xs: 12 }}>
                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Password"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        fullWidth
                                        error={!!errors.password}
                                        helperText={errors.password?.message}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={
                                                            handleClickShowPassword
                                                        }
                                                    >
                                                        {showPassword ? (
                                                            <VisibilityOff />
                                                        ) : (
                                                            <Visibility />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                )}
                            />
                        </Grid2>
                        {!isLogin && (
                            <Grid2 size={{ xs: 12 }}>
                                <Controller
                                    name="confirmPassword"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Confirm Password"
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            fullWidth
                                            error={!!errors.confirmPassword}
                                            helperText={
                                                errors.confirmPassword?.message
                                            }
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={
                                                                handleClickShowPassword
                                                            }
                                                        >
                                                            {showPassword ? (
                                                                <VisibilityOff />
                                                            ) : (
                                                                <Visibility />
                                                            )}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    )}
                                />
                            </Grid2>
                        )}
                    </Grid2>
                </Box>
                <Button
                    className={styles.formButton}
                    onClick={handleSubmit(onSubmit)}
                    disabled={loading}
                >
                    {loading ? (
                        <CircularProgress
                            size="24.5px"
                            className={styles.progress}
                        />
                    ) : isLogin ? (
                        "Sign in"
                    ) : (
                        "Sign up"
                    )}
                </Button>
                <Typography className={styles.formLink}>
                    {isLogin
                        ? "Don't have an account yet? "
                        : "Already have an account? "}
                    <Link
                        className={styles.formLinkButton}
                        component="button"
                        onClick={() => {
                            toggleMode();
                            setShowPassword(false);
                        }}
                    >
                        {isLogin ? "Sign in" : "Sign up"}
                    </Link>
                </Typography>
            </Box>
        </Modal>
    );
}
