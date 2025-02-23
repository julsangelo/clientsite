import React, { useState } from "react";
import styles from "./Login.module";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
    Box,
    Container,
    Grid2,
    IconButton,
    InputAdornment,
    Link,
    TextField,
    Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    const handleClickShowPassword = () => {
        setShowPassword((show) => !show);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div className={styles.page}>
            <Navbar />
            <div className={styles.container}>
                <Container maxWidth="xl">
                    <Box className={styles.form}>
                        <Typography className={styles.formTitle}>
                            Sign In
                        </Typography>
                        <Grid2 container spacing={2.5}>
                            {isLogin ? (
                                <>
                                    <Grid2 size={{ xs: 12, md: 12 }}>
                                        <TextField label="Email" fullWidth />
                                    </Grid2>
                                    <Grid2 size={{ xs: 12, md: 12 }}>
                                        <TextField
                                            label="Password"
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            fullWidth
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label={
                                                                showPassword
                                                                    ? "hide the password"
                                                                    : "display the password"
                                                            }
                                                            onClick={
                                                                handleClickShowPassword
                                                            }
                                                            onMouseDown={
                                                                handleMouseDownPassword
                                                            }
                                                            onMouseUp={
                                                                handleMouseUpPassword
                                                            }
                                                            edge="end"
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
                                    </Grid2>
                                </>
                            ) : (
                                <>
                                    <Grid2 size={{ xs: 12, md: 6 }}>
                                        <TextField
                                            label="First Name"
                                            fullWidth
                                        />
                                    </Grid2>
                                    <Grid2 size={{ xs: 12, md: 6 }}>
                                        <TextField
                                            label="Last Name"
                                            fullWidth
                                        />
                                    </Grid2>
                                    <Grid2 size={{ xs: 12, md: 6 }}>
                                        <TextField label="Email" fullWidth />
                                    </Grid2>
                                    <Grid2 size={{ xs: 12, md: 6 }}>
                                        <TextField
                                            label="Phone Number"
                                            fullWidth
                                        />
                                    </Grid2>
                                    <Grid2 size={{ xs: 12, md: 6 }}>
                                        <TextField
                                            label="Password"
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            fullWidth
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label={
                                                                showPassword
                                                                    ? "hide the password"
                                                                    : "display the password"
                                                            }
                                                            onClick={
                                                                handleClickShowPassword
                                                            }
                                                            onMouseDown={
                                                                handleMouseDownPassword
                                                            }
                                                            onMouseUp={
                                                                handleMouseUpPassword
                                                            }
                                                            edge="end"
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
                                    </Grid2>
                                    <Grid2 size={{ xs: 12, md: 6 }}>
                                        <TextField
                                            label="Confirm Password"
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            fullWidth
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label={
                                                                showPassword
                                                                    ? "hide the password"
                                                                    : "display the password"
                                                            }
                                                            onClick={
                                                                handleClickShowPassword
                                                            }
                                                            onMouseDown={
                                                                handleMouseDownPassword
                                                            }
                                                            onMouseUp={
                                                                handleMouseUpPassword
                                                            }
                                                            edge="end"
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
                                    </Grid2>
                                </>
                            )}
                        </Grid2>
                        <Typography className={styles.formLink}>
                            {isLogin ? (
                                <>
                                    Don't have an account yet?{" "}
                                    <Link
                                        className={styles.formLinkButton}
                                        component="button"
                                        onClick={() => setIsLogin(false)}
                                    >
                                        Sign up
                                    </Link>
                                </>
                            ) : (
                                <>
                                    Already have an account?{" "}
                                    <Link
                                        className={styles.formLinkButton}
                                        component="button"
                                        onClick={() => setIsLogin(true)}
                                    >
                                        Sign in
                                    </Link>
                                </>
                            )}
                        </Typography>
                    </Box>
                </Container>
            </div>
            <Footer />
        </div>
    );
}
