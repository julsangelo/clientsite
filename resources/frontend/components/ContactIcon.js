import React from "react";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import StayCurrentPortraitIcon from "@mui/icons-material/StayCurrentPortrait";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkIcon from "@mui/icons-material/Link";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { LocationOn } from "@mui/icons-material";

const ICON_TYPE = {
    phone: <StayCurrentPortraitIcon />,
    landline: <LocalPhoneIcon />,
    email: <EmailIcon />,
    facebook: <FacebookIcon />,
    instagram: <InstagramIcon />,
    linkedin: <LinkedInIcon />,
    x: <XIcon />,
    address: <LocationOn />,
    unknown: <LinkIcon />,
};
export default function ContactIcon({ iconType }) {
    return ICON_TYPE[iconType] ? ICON_TYPE[iconType] : ICON_TYPE["unknown"];
}
