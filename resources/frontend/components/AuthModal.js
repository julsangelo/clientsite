import React, { useEffect, useState } from "react";
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
import {
    checkResetCode,
    getResetCode,
    resetPassword,
    signIn,
    signUp,
} from "../ajax/backend";
import { useFlashMessage } from "../context/FlashMessage";
import OTPInput from "react-otp-input";

const validationSchema = (
    isLogin,
    isForgotPassword,
    isResetCode,
    isResetPassword,
) =>
    Yup.object().shape({
        emailUsername:
            (isLogin || isForgotPassword) && !isResetCode && !isResetPassword
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
                              const isUsername = /^[a-zA-Z0-9_]{3,15}$/.test(
                                  value,
                              );
                              return isEmail || isUsername;
                          },
                      )
                : Yup.string(),

        email:
            !isLogin && !isResetCode && !isResetPassword
                ? Yup.string()
                      .email("Invalid email")
                      .required("Email is required")
                : Yup.string(),

        password:
            !isForgotPassword && !isResetCode
                ? Yup.string()
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
                      .required("Password is required")
                : Yup.string(),

        confirmPassword:
            (!isLogin || isResetPassword) && !isResetCode
                ? Yup.string()
                      .oneOf(
                          [Yup.ref("password"), null],
                          "Passwords must match",
                      )
                      .required("Confirm password is required")
                : Yup.string(),

        username:
            !isLogin && !isResetCode && !isResetPassword
                ? Yup.string()
                      .required("Username is required")
                      .min(3, "Username must be at least 3 characters long")
                      .max(15, "Username must be at most 15 characters long")
                : Yup.string(),

        phoneNumber:
            !isLogin && !isResetCode && !isResetPassword
                ? Yup.string()
                      .matches(
                          /^\d{11}$/,
                          "Phone number must be exactly 11 digits",
                      )
                      .required("Phone number is required")
                : Yup.string(),
    });

export default function AuthModal({
    isOpen,
    setModalOpen,
    setMenu,
    toggleUpdate,
}) {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [isResetCode, setIsResetCode] = useState(false);
    const [isResetPassword, setIsResetPassword] = useState(false);
    const [otp, setOtp] = useState("");
    const [token, setToken] = useState();
    const [loading, setLoading] = useState(false);
    const { setFlashMessage, setFlashStatus } = useFlashMessage();

    const {
        control,
        handleSubmit,
        reset,
        setError,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(
            validationSchema(
                isLogin,
                isForgotPassword,
                isResetCode,
                isResetPassword,
            ),
        ),
        defaultValues: {
            email: "",
            password: "",
            username: "",
            phoneNumber: "",
            confirmPassword: "",
            emailUsername: "",
            otp: otp,
        },
    });

    useEffect(() => {
        setValue("otp", otp);
    }, [otp]);

    const onSubmit = (data) => {
        setLoading(true);
        const request = isResetPassword
            ? "resetPass"
            : isResetCode
              ? "authCode"
              : isForgotPassword
                ? "sendCode"
                : isLogin
                  ? signIn
                  : signUp;

        if (request === "resetPass") {
            resetPassword(token, data, (response) => {
                if (response.status === "success") {
                    setIsLogin(true);
                    setIsForgotPassword(false);
                    setIsResetCode(false);
                    setIsResetPassword(false);
                }
                setFlashMessage(response.message);
                setFlashStatus(response.status);
                setLoading(false);
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
            });
        } else if (request === "sendCode") {
            getResetCode(data, (response) => {
                if (response.status === "success") {
                    setIsResetCode(true);
                    setIsForgotPassword(false);
                    setIsLogin(null);
                }
                setLoading(false);
                setFlashMessage(response.message);
                setFlashStatus(response.status);
            });
        } else if (request === "authCode") {
            checkResetCode(data, (response) => {
                if (response.status === "success") {
                    setIsResetPassword(true);
                    setIsForgotPassword(false);
                    setIsResetCode(false);
                    setToken(response.token);
                }
                setLoading(false);
                setFlashMessage(response.message);
                setFlashStatus(response.status);
            });
        } else {
            request(data, (response) => {
                setLoading(false);
                if (!response?.errors) {
                    setFlashMessage(response.message);
                    setFlashStatus(response.status);
                    if (!isLogin && response.status == "success") {
                        setIsLogin(true);
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
                    } else if (isLogin && response.status == "success") {
                        setModalOpen(false);
                        setMenu(false);
                        toggleUpdate();
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
        }
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
            }}
            className={styles.modalContainer}
        >
            <Box
                className={styles.form}
                component="form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <IconButton
                    className={styles.modalCloseButton}
                    onClick={() => {
                        setIsLogin(true);
                        setModalOpen(false);
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
                        setShowPassword(false);
                        setIsForgotPassword(false);
                        setIsResetCode(false);
                        setIsResetPassword(false);
                        setOtp("");
                        setLoading(false);
                    }}
                >
                    <Close />
                </IconButton>
                <Typography className={styles.formTitle}>Cliff</Typography>
                {isResetPassword ? (
                    <Typography className={styles.formSubtext}>
                        Enter your new password.
                    </Typography>
                ) : isResetCode ? (
                    <Typography className={styles.formSubtext}>
                        Enter the password reset code from your email.
                    </Typography>
                ) : isForgotPassword ? (
                    <Typography className={styles.formSubtext}>
                        Enter your username or email to reset your password.
                    </Typography>
                ) : (
                    <Typography className={styles.formSubtext}>
                        {isLogin
                            ? "Welcome back! Please log in to access your account and explore our latest products."
                            : "Join us and unlock exclusive deals, updates, and a personalized shopping experience!"}
                    </Typography>
                )}
                <Box>
                    <Grid2
                        container
                        spacing={2}
                        className={styles.formContainer}
                    >
                        {!isResetPassword &&
                            !isResetCode &&
                            !isForgotPassword &&
                            !isLogin && (
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
                                                        errors.phoneNumber
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
                                                    error={
                                                        !!errors.confirmPassword
                                                    }
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
                        {!isResetPassword &&
                            !isResetCode &&
                            !isForgotPassword &&
                            isLogin && (
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
                                                    error={
                                                        !!errors.emailUsername
                                                    }
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
                        {!isResetPassword &&
                            !isResetCode &&
                            isForgotPassword && (
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
                            )}
                        {!isResetPassword && isResetCode && (
                            <OTPInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                shouldAutoFocus
                                inputStyle={{
                                    width: "40px",
                                    height: "40px",
                                    fontSize: "20px",
                                    textAlign: "center",
                                    margin: "5px",
                                    borderRadius: "5px",
                                    border: "1px solid #ccc",
                                }}
                                inputType="tel"
                                renderInput={(props) => <input {...props} />}
                            />
                        )}

                        {isResetPassword && (
                            <>
                                <Grid2 size={{ xs: 12 }}>
                                    <Controller
                                        name="password"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label="New Password"
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
                                                label="Confirm New Password"
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
                    </Grid2>
                </Box>
                <Box>
                    <Button
                        className={
                            isResetCode && otp.length !== 6
                                ? styles.formButtonDisabled
                                : styles.formButton
                        }
                        disabled={loading || (isResetCode && otp.length !== 6)}
                        type="submit"
                    >
                        {loading ? (
                            <CircularProgress
                                size="24.5px"
                                className={styles.progress}
                            />
                        ) : isResetPassword ? (
                            "Reset password"
                        ) : isResetCode ? (
                            "Verify code"
                        ) : isForgotPassword ? (
                            "Send reset code"
                        ) : isLogin ? (
                            "Sign in"
                        ) : (
                            "Sign up"
                        )}
                    </Button>
                    {!isForgotPassword && isLogin ? (
                        <Link
                            className={styles.forgotButton}
                            onClick={() => {
                                setIsForgotPassword(true);
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
                            }}
                        >
                            Forgot password?
                        </Link>
                    ) : null}
                </Box>
                {!isResetCode && (
                    <Typography className={styles.formLink}>
                        {isForgotPassword
                            ? "Remember your password?"
                            : isLogin
                              ? "Don't have an account yet? "
                              : "Already have an account? "}
                        {isForgotPassword ? (
                            <Link
                                className={styles.formLinkButton}
                                onClick={() => {
                                    setIsLogin(true);
                                    setIsForgotPassword(false);
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
                                }}
                            >
                                Go back to sign in
                            </Link>
                        ) : (
                            <Link
                                className={styles.formLinkButton}
                                onClick={() => {
                                    toggleMode();
                                    setIsForgotPassword(false);
                                    setShowPassword(false);
                                }}
                            >
                                {isLogin ? "Sign up" : "Sign in"}
                            </Link>
                        )}
                    </Typography>
                )}
            </Box>
        </Modal>
    );
}
