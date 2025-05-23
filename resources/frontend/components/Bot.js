import {
    Box,
    CardActionArea,
    CardMedia,
    Divider,
    IconButton,
    Slide,
    TextField,
    Typography,
} from "@mui/material";
import styles from "./Bot.module";
import React, { useState } from "react";
import { Minimize, Send, SmartToy } from "@mui/icons-material";
import axios from "axios";
import { sendMessage } from "../ajax/backend";
import { useNavigate } from "react-router-dom";

export default function Bot() {
    const [isBotOpen, setIsBotOpen] = useState(false);
    const navigate = useNavigate();

    const [messages, setMessages] = useState([
        { text: "Hi! Need help with motorcycle parts?", from: "bot" },
    ]);
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage = { text: input, from: "user" };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");

        sendMessage(input, (newMessages) => {
            const botMessages = newMessages.filter(
                (msg) => msg.from !== "user",
            );
            setMessages((prev) => [...prev, ...botMessages]);
        });
    };

    return (
        <>
            <IconButton
                className={styles.botButton}
                onClick={() => setIsBotOpen(true)}
            >
                <SmartToy fontSize="large" />
            </IconButton>
            <Slide direction="left" in={isBotOpen} mountOnEnter unmountOnExit>
                <Box className={styles.chatbox}>
                    <Box>
                        <Typography className={styles.botName}>
                            Cliff Bot
                        </Typography>
                        <IconButton
                            className={styles.minimizeButton}
                            onClick={() => setIsBotOpen(false)}
                        >
                            <Minimize />
                        </IconButton>
                        <Divider />
                    </Box>
                    <Box className={styles.messageBox}>
                        {messages.map((item, index) => (
                            <Box
                                key={index}
                                sx={{ display: "flex" }}
                                justifyContent={
                                    item.from === "bot" ? "left" : "right"
                                }
                            >
                                {item.type === "cards" ? (
                                    <Box className={styles.cardsContainer}>
                                        {item.items.map((items, index) => (
                                            <CardActionArea
                                                key={index}
                                                className={styles.card}
                                                onClick={() => {
                                                    if (items.productCode) {
                                                        navigate(
                                                            `/shop/product/${items.productCode}`,
                                                        );
                                                    } else if (
                                                        items.productCategoryName
                                                    ) {
                                                        navigate(
                                                            `/shop/${items.productCategoryName}`,
                                                        );
                                                    }
                                                }}
                                            >
                                                <CardMedia
                                                    component="img"
                                                    image={`/hydrogen/${items.productImage || items.productCategoryImage}`}
                                                    width="120px"
                                                />
                                                <div>
                                                    {Object.entries(items).map(
                                                        ([key, value]) =>
                                                            key
                                                                .toLowerCase()
                                                                .includes(
                                                                    "name",
                                                                ) && (
                                                                <Typography
                                                                    noWrap
                                                                    key={key}
                                                                    className={
                                                                        styles.cardName
                                                                    }
                                                                >
                                                                    {value}
                                                                </Typography>
                                                            ),
                                                    )}
                                                </div>
                                            </CardActionArea>
                                        ))}
                                    </Box>
                                ) : (
                                    <Typography
                                        className={styles.botMessages}
                                        sx={{
                                            backgroundColor:
                                                item.from === "bot"
                                                    ? "#5f5f5f"
                                                    : "#1ea1d7",
                                        }}
                                    >
                                        {item.text}
                                    </Typography>
                                )}
                            </Box>
                        ))}
                    </Box>
                    <Box className={styles.botInput}>
                        <TextField
                            className={styles.botInputField}
                            placeholder="Write here"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleSend();
                            }}
                            autoComplete="off"
                        />
                        <IconButton
                            className={styles.botInputSend}
                            onClick={() => handleSend()}
                        >
                            <Send fontSize="medium" />
                        </IconButton>
                    </Box>
                </Box>
            </Slide>
        </>
    );
}
