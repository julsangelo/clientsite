import React from "react";
import styles from "./Home.module";
import Navbar from "../components/Navbar";
import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Container,
    Grid2,
    Rating,
    Typography,
} from "@mui/material";
import {
    CheckBoxOutlined,
    MessageOutlined,
    ShoppingCartOutlined,
} from "@mui/icons-material";

export default function Main() {
    document.title = "MUX Moto Shop";

    return (
        <>
            <Navbar />
            <div className={styles.heroSection}>
                <Container maxWidth="xl">
                    <Grid2
                        container
                        spacing={5}
                        className={styles.heroSectionContainer}
                    >
                        <Grid2 container size={{ lg: 12, xl: 5 }} spacing={4}>
                            <Typography className={styles.heroSectionTitle}>
                                MUX Automotive Part Trading
                            </Typography>
                            <Typography className={styles.heroSectionHeading}>
                                COIDO VACUUM CLEANER DC 12V
                            </Typography>
                            <Typography
                                className={styles.heroSectionSubheading}
                            >
                                Get more done with cyclonic power and a
                                high-performance motor that maximizes suction.
                                Our vacuum’s easy-to-empty, clear dust cup and
                                changeable air filter keep it running smoothly,
                                while LED lighting helps you spot every last bit
                                of dust.
                            </Typography>
                        </Grid2>
                        <Grid2
                            container
                            size={{ lg: 12, xl: 7 }}
                            className={styles.heroSectionImageContainer}
                        >
                            <CardMedia
                                component="img"
                                image="/fjmoto/images/61Ov4yDCYEL._AC_UF1000,1000_QL80_.jpg"
                                className={styles.heroSectionImage}
                            />
                        </Grid2>
                    </Grid2>
                </Container>
            </div>
            <div className={styles.categoriesSection}>
                <Container maxWidth="xl">
                    <Grid2 className={styles.categoriesSectionContainer}>
                        <Grid2 size={2}>
                            <Typography
                                className={styles.categoriesSectionHeading}
                            >
                                Categories
                            </Typography>
                            <Typography
                                className={styles.categoriesSectionSubheading}
                            >
                                Browse by your interests
                            </Typography>
                        </Grid2>
                        <Grid2
                            container
                            size={10}
                            spacing={5}
                            className={styles.categoriesSectionGridContainer}
                        >
                            <Grid2
                                size={2}
                                className={styles.categoriesSectionGrid}
                            >
                                <Card className={styles.categoriesSectionCard}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            image="/fjmoto/images/PAANO, JULIUS ANGELO A b-min.JPG"
                                            height="200"
                                            width="200"
                                        />
                                        <CardContent
                                            className={
                                                styles.categoriesSectionCardContent
                                            }
                                        >
                                            Interior Car Accessories
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid2>
                            <Grid2
                                size={2}
                                className={styles.categoriesSectionGrid}
                            >
                                <Card className={styles.categoriesSectionCard}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            image="/fjmoto/images/PAANO, JULIUS ANGELO A b-min.JPG"
                                            height="200"
                                            width="200"
                                        />
                                        <CardContent
                                            className={
                                                styles.categoriesSectionCardContent
                                            }
                                        >
                                            Car Care & Detailing
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid2>
                            <Grid2
                                size={2}
                                className={styles.categoriesSectionGrid}
                            >
                                <Card className={styles.categoriesSectionCard}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            image="/fjmoto/images/PAANO, JULIUS ANGELO A b-min.JPG"
                                            height="200"
                                            width="200"
                                        />
                                        <CardContent
                                            className={
                                                styles.categoriesSectionCardContent
                                            }
                                        >
                                            Automotive Parts
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid2>
                            <Grid2
                                size={2}
                                className={styles.categoriesSectionGrid}
                            >
                                <Card className={styles.categoriesSectionCard}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            image="/fjmoto/images/PAANO, JULIUS ANGELO A b-min.JPG"
                                            height="200"
                                            width="200"
                                        />
                                        <CardContent
                                            className={
                                                styles.categoriesSectionCardContent
                                            }
                                        >
                                            Car Electronics
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid2>
                            <Grid2
                                size={2}
                                className={styles.categoriesSectionGrid}
                            >
                                <Card className={styles.categoriesSectionCard}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            image="/fjmoto/images/PAANO, JULIUS ANGELO A b-min.JPG"
                                            height="200"
                                            width="200"
                                        />
                                        <CardContent
                                            className={
                                                styles.categoriesSectionCardContent
                                            }
                                        >
                                            Tools and Garage
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid2>
                        </Grid2>
                    </Grid2>
                </Container>
            </div>
            <div className={styles.productSection}>
                <Container maxWidth="xl">
                    <div className={styles.productSectionHeader}>
                        <Typography className={styles.productSectionHeading}>
                            Featured Products
                        </Typography>
                    </div>
                    <Grid2 container size={12} spacing={2}>
                        <Grid2 size={{ xs: 6, sm: 4, md: 3, lg: 2.4, xl: 2 }}>
                            <Card className={styles.productSectionCard}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        image="/fjmoto/images/PAANO, JULIUS ANGELO A b-min.JPG"
                                        height="250"
                                        className={
                                            styles.productSectionCardImage
                                        }
                                    />
                                    <CardContent>
                                        <Typography
                                            className={
                                                styles.productSectionCardTitle
                                            }
                                        >
                                            Ponyan Pentair TY-564 (Toyota Hiace)
                                        </Typography>
                                        <div
                                            className={
                                                styles.productSectionCardRating
                                            }
                                        >
                                            <Rating
                                                defaultValue={2.5}
                                                precision={0.5}
                                                readOnly
                                            />
                                            <Typography
                                                className={
                                                    styles.productSectionCardRatingText
                                                }
                                            >
                                                1 review
                                            </Typography>
                                        </div>
                                        <div>
                                            <Typography
                                                className={
                                                    styles.productSectionCardPrice
                                                }
                                            >
                                                ₱ 2,500.00
                                            </Typography>
                                        </div>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid2>
                        <Grid2 size={{ xs: 6, sm: 4, md: 3, lg: 2.4, xl: 2 }}>
                            <Card className={styles.productSectionCard}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        image="/fjmoto/images/PAANO, JULIUS ANGELO A b-min.JPG"
                                        height="250"
                                        className={
                                            styles.productSectionCardImage
                                        }
                                    />
                                    <CardContent>
                                        <Typography
                                            className={
                                                styles.productSectionCardTitle
                                            }
                                        >
                                            Ponyan Pentair TY-564 (Toyota Hiace)
                                        </Typography>
                                        <div
                                            className={
                                                styles.productSectionCardRating
                                            }
                                        >
                                            <Rating
                                                defaultValue={2.5}
                                                precision={0.5}
                                                readOnly
                                            />
                                            <Typography
                                                className={
                                                    styles.productSectionCardRatingText
                                                }
                                            >
                                                1 review
                                            </Typography>
                                        </div>
                                        <div>
                                            <Typography
                                                className={
                                                    styles.productSectionCardPrice
                                                }
                                            >
                                                ₱ 2,500.00
                                            </Typography>
                                        </div>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid2>
                        <Grid2 size={{ xs: 6, sm: 4, md: 3, lg: 2.4, xl: 2 }}>
                            <Card className={styles.productSectionCard}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        image="/fjmoto/images/PAANO, JULIUS ANGELO A b-min.JPG"
                                        height="250"
                                        className={
                                            styles.productSectionCardImage
                                        }
                                    />
                                    <CardContent>
                                        <Typography
                                            className={
                                                styles.productSectionCardTitle
                                            }
                                        >
                                            Ponyan Pentair TY-564 (Toyota Hiace)
                                        </Typography>
                                        <div
                                            className={
                                                styles.productSectionCardRating
                                            }
                                        >
                                            <Rating
                                                defaultValue={2.5}
                                                precision={0.5}
                                                readOnly
                                            />
                                            <Typography
                                                className={
                                                    styles.productSectionCardRatingText
                                                }
                                            >
                                                1 review
                                            </Typography>
                                        </div>
                                        <div>
                                            <Typography
                                                className={
                                                    styles.productSectionCardPrice
                                                }
                                            >
                                                ₱ 2,500.00
                                            </Typography>
                                        </div>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid2>
                        <Grid2 size={{ xs: 6, sm: 4, md: 3, lg: 2.4, xl: 2 }}>
                            <Card className={styles.productSectionCard}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        image="/fjmoto/images/PAANO, JULIUS ANGELO A b-min.JPG"
                                        height="250"
                                        className={
                                            styles.productSectionCardImage
                                        }
                                    />
                                    <CardContent>
                                        <Typography
                                            className={
                                                styles.productSectionCardTitle
                                            }
                                        >
                                            Ponyan Pentair TY-564 (Toyota Hiace)
                                        </Typography>
                                        <div
                                            className={
                                                styles.productSectionCardRating
                                            }
                                        >
                                            <Rating
                                                defaultValue={2.5}
                                                precision={0.5}
                                                readOnly
                                            />
                                            <Typography
                                                className={
                                                    styles.productSectionCardRatingText
                                                }
                                            >
                                                1 review
                                            </Typography>
                                        </div>
                                        <div>
                                            <Typography
                                                className={
                                                    styles.productSectionCardPrice
                                                }
                                            >
                                                ₱ 2,500.00
                                            </Typography>
                                        </div>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid2>
                        <Grid2 size={{ xs: 6, sm: 4, md: 3, lg: 2.4, xl: 2 }}>
                            <Card className={styles.productSectionCard}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        image="/fjmoto/images/PAANO, JULIUS ANGELO A b-min.JPG"
                                        height="250"
                                        className={
                                            styles.productSectionCardImage
                                        }
                                    />
                                    <CardContent>
                                        <Typography
                                            className={
                                                styles.productSectionCardTitle
                                            }
                                        >
                                            Ponyan Pentair TY-564 (Toyota Hiace)
                                        </Typography>
                                        <div
                                            className={
                                                styles.productSectionCardRating
                                            }
                                        >
                                            <Rating
                                                defaultValue={2.5}
                                                precision={0.5}
                                                readOnly
                                            />
                                            <Typography
                                                className={
                                                    styles.productSectionCardRatingText
                                                }
                                            >
                                                1 review
                                            </Typography>
                                        </div>
                                        <div>
                                            <Typography
                                                className={
                                                    styles.productSectionCardPrice
                                                }
                                            >
                                                ₱ 2,500.00
                                            </Typography>
                                        </div>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid2>
                        <Grid2 size={{ xs: 6, sm: 4, md: 3, lg: 2.4, xl: 2 }}>
                            <Card className={styles.productSectionCard}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        image="/fjmoto/images/PAANO, JULIUS ANGELO A b-min.JPG"
                                        height="250"
                                        className={
                                            styles.productSectionCardImage
                                        }
                                    />
                                    <CardContent>
                                        <Typography
                                            className={
                                                styles.productSectionCardTitle
                                            }
                                        >
                                            Ponyan Pentair TY-564 (Toyota Hiace)
                                        </Typography>
                                        <div
                                            className={
                                                styles.productSectionCardRating
                                            }
                                        >
                                            <Rating
                                                defaultValue={2.5}
                                                precision={0.5}
                                                readOnly
                                            />
                                            <Typography
                                                className={
                                                    styles.productSectionCardRatingText
                                                }
                                            >
                                                1 review
                                            </Typography>
                                        </div>
                                        <div>
                                            <Typography
                                                className={
                                                    styles.productSectionCardPrice
                                                }
                                            >
                                                ₱ 2,500.00
                                            </Typography>
                                        </div>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid2>
                        <Grid2 size={{ xs: 6, sm: 4, md: 3, lg: 2.4, xl: 2 }}>
                            <Card className={styles.productSectionCard}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        image="/fjmoto/images/PAANO, JULIUS ANGELO A b-min.JPG"
                                        height="250"
                                        className={
                                            styles.productSectionCardImage
                                        }
                                    />
                                    <CardContent>
                                        <Typography
                                            className={
                                                styles.productSectionCardTitle
                                            }
                                        >
                                            Ponyan Pentair TY-564 (Toyota Hiace)
                                        </Typography>
                                        <div
                                            className={
                                                styles.productSectionCardRating
                                            }
                                        >
                                            <Rating
                                                defaultValue={2.5}
                                                precision={0.5}
                                                readOnly
                                            />
                                            <Typography
                                                className={
                                                    styles.productSectionCardRatingText
                                                }
                                            >
                                                1 review
                                            </Typography>
                                        </div>
                                        <div>
                                            <Typography
                                                className={
                                                    styles.productSectionCardPrice
                                                }
                                            >
                                                ₱ 2,500.00
                                            </Typography>
                                        </div>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid2>
                    </Grid2>
                </Container>
            </div>
            <div className={styles.featureSection}>
                <Container maxWidth="xl">
                    <Grid2 container size={12} spacing={3}>
                        <Grid2 size={{ xs: 12, md: 6, xl: 3 }}>
                            <Card className={styles.featureSectionCard}>
                                <Box
                                    className={styles.featureSectionCardIconBox}
                                >
                                    <ShoppingCartOutlined fontSize="large" />
                                </Box>
                                <CardContent
                                    className={styles.featureSectionCardContent}
                                >
                                    <Typography
                                        className={
                                            styles.featureSectionCardHeading
                                        }
                                    >
                                        Cash on Delivery & Pre-Order
                                    </Typography>
                                    <Typography
                                        className={
                                            styles.featureSectionCardSubheading
                                        }
                                    >
                                        Secure your items in advance, with
                                        cash-on-delivery options.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid2>
                        <Grid2 size={{ xs: 12, md: 6, xl: 3 }}>
                            <Card className={styles.featureSectionCard}>
                                <Box
                                    className={styles.featureSectionCardIconBox}
                                >
                                    <ShoppingCartOutlined fontSize="large" />
                                </Box>
                                <CardContent
                                    className={styles.featureSectionCardContent}
                                >
                                    <Typography
                                        className={
                                            styles.featureSectionCardHeading
                                        }
                                    >
                                        Guaranteed Satisfaction
                                    </Typography>
                                    <Typography
                                        className={
                                            styles.featureSectionCardSubheading
                                        }
                                    >
                                        We stand by our product quality and
                                        warranty.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid2>
                        <Grid2 size={{ xs: 12, md: 6, xl: 3 }}>
                            <Card className={styles.featureSectionCard}>
                                <Box
                                    className={styles.featureSectionCardIconBox}
                                >
                                    <MessageOutlined fontSize="large" />
                                </Box>
                                <CardContent
                                    className={styles.featureSectionCardContent}
                                >
                                    <Typography
                                        className={
                                            styles.featureSectionCardHeading
                                        }
                                    >
                                        AI-Powered Assistance
                                    </Typography>
                                    <Typography
                                        className={
                                            styles.featureSectionCardSubheading
                                        }
                                    >
                                        Our chatbot offers seamless support
                                        anytime, anywhere.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid2>
                        <Grid2 size={{ xs: 12, md: 6, xl: 3 }}>
                            <Card className={styles.featureSectionCard}>
                                <Box
                                    className={styles.featureSectionCardIconBox}
                                >
                                    <CheckBoxOutlined fontSize="large" />
                                </Box>
                                <CardContent
                                    className={styles.featureSectionCardContent}
                                >
                                    <Typography
                                        className={
                                            styles.featureSectionCardHeading
                                        }
                                    >
                                        Billing Verification
                                    </Typography>
                                    <Typography
                                        className={
                                            styles.featureSectionCardSubheading
                                        }
                                    >
                                        Efficient proof of billing for secure
                                        transactions.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid2>
                    </Grid2>
                </Container>
            </div>
        </>
    );
}
