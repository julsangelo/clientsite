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
        emailUsername: isLogin
            ? Yup.string()
                  .required("Email or username is required")
                  .test(
                      "email-or-username",
                      "Invalid email or username",
                      (value) => {
                          if (!value) return false;
                          const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                              value,
                          );
                          const isUsername = /^[a-zA-Z0-9_]{3,15}$/.test(value);
                          return isEmail || isUsername;
                      },
                  )
            : Yup.string(),
        email: isLogin
            ? Yup.string()
            : Yup.string().email("Invalid email").required("Email is required"),
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
        username: isLogin
            ? Yup.string()
            : Yup.string()
                  .required("Username is required")
                  .min(3, "Username must be at least 3 characters long")
                  .max(15, "Username must be at most 15 characters long"),
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

export default function AuthModal({
    isOpen,
    setModalOpen,
    setIsLoggedIn,
    setUser,
    setMenu,
}) {
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
            username: "",
            phoneNumber: "",
            confirmPassword: "",
            emailUsername: "",
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
                if (!isLogin && response.status == "success") {
                    setIsLogin(true);
                } else if (isLogin && response.status == "success") {
                    setModalOpen(false);
                    setMenu(false);
                    setIsLoggedIn(true);
                    setUser(response.user);
                    reset();
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
                emailUsername: "",
                email: "",
                password: "",
                username: "",
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
                                <Grid2 size={{ xs: 12, md: 12 }}>
                                    <Controller
                                        name="username"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label="Username"
                                                fullWidth
                                                error={!!errors.username}
                                                helperText={
                                                    errors.username?.message
                                                }
                                            />
                                        )}
                                    />
                                </Grid2>
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
                                                helperText={
                                                    errors.email?.message
                                                }
                                            />
                                        )}
                                    />
                                </Grid2>
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
                                <Grid2 size={{ xs: 12 }}>
                                    <Controller
                                        name="password"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label="Password"
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                fullWidth
                                                error={!!errors.password}
                                                helperText={
                                                    errors.password?.message
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
                                                    errors.confirmPassword
                                                        ?.message
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
                            </>
                        )}

                        {isLogin && (
                            <>
                                <Grid2 size={{ xs: 12 }}>
                                    <Controller
                                        name="emailUsername"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label="Email or Username"
                                                fullWidth
                                                error={!!errors.emailUsername}
                                                helperText={
                                                    errors.emailUsername
                                                        ?.message
                                                }
                                            />
                                        )}
                                    />
                                </Grid2>
                                <Grid2 size={{ xs: 12 }}>
                                    <Controller
                                        name="password"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label="Password"
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                fullWidth
                                                error={!!errors.password}
                                                helperText={
                                                    errors.password?.message
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
                            </>
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
                        {isLogin ? "Sign up" : "Sign in"}
                    </Link>
                </Typography>
            </Box>
        </Modal>
    );
}
