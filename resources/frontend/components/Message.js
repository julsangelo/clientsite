import React from "react";
import styles from "./Message.module";
import { Check, Close } from "@mui/icons-material";

export default function Message({ message, status }) {
    if (!message || !status) return null;

    return (
        <div className={styles.messageContainer}>
            <div
                className={
                    status === "success" ? styles.successIcon : styles.errorIcon
                }
            >
                {status === "success" ? (
                    <Check className={styles.icon} fontSize="12" />
                ) : (
                    <Close className={styles.icon} fontSize="12" />
                )}
            </div>
            {message}
        </div>
    );
}
