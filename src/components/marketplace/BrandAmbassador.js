import React from "react";
import { styled, keyframes } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import CssBaseline from "@mui/material/CssBaseline";
import { Box } from "@mui/material";

// Animated gradient background with light colors
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const GlobalReset = styled("div")(() => ({
  margin: 0,
  padding: 0,
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #f3e5f5, #e1f5fe, #e8f5e9)",
  backgroundSize: "300% 300%",
  animation: `${gradientAnimation} 15s ease infinite`,
  fontFamily: "'Poppins', sans-serif",
  overflow: "hidden",
}));

// Styled card with hover glow effect
const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 420,
  textAlign: "center",
  boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.2)",
  borderRadius: "24px",
  overflow: "hidden",
  padding: "24px",
  background: "linear-gradient(to bottom, #ffffff, #f9f9f9)",
  position: "relative",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: "0px 16px 30px rgba(0, 0, 0, 0.3)",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: "24px",
    padding: "4px",
    background: "linear-gradient(135deg, #aed581, #81c784, #4fc3f7)",
    zIndex: -1,
    WebkitMask:
      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
    WebkitMaskComposite: "destination-out",
    maskComposite: "exclude",
  },
}));

// Circular image with hover glow
const CircularImage = styled(CardMedia)(({ theme }) => ({
  width: 160,
  height: 160,
  borderRadius: "50%",
  margin: "16px auto 0",
  border: "6px solid #fff",
  boxShadow: "0px 6px 20px rgba(144, 202, 249, 0.5)",
  transition: "transform 0.4s ease, box-shadow 0.4s ease",
  "&:hover": {
    transform: "scale(1.1)",
    boxShadow: "0px 8px 30px rgba(144, 202, 249, 0.8)",
  },
}));

// Highlighted gradient text
const HighlightedText = styled(Typography)(({ theme }) => ({
  background: "linear-gradient(90deg, #81c784, #aed581)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: "bold",
  fontSize: "2rem",
}));

// Icon container with hover animations
const IconContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: "15px",
  marginTop: "12px",
  "& i": {
    fontSize: "1.5rem",
    color: "#4fc3f7",
    transition: "color 0.3s ease, transform 0.3s ease",
    "&:hover": {
      color: "#aed581",
      transform: "scale(1.2)",
    },
  },
}));

export default function BrandAmbassador() {
  return (
    <GlobalReset>
      <CssBaseline />
      <StyledCard>
        <CardMedia
          component="img"
          image="/logo.png"
          alt="Logo"
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
            width: 130,
            height: 65,
            border: "2px solid #fff",
          }}
        />
        <CircularImage
          component="img"
          image="AbuBakarTalha.png"
          alt="Abu Bakar Talha"
        />
        <CardContent>
          <HighlightedText variant="h4" gutterBottom>
            Abu Bakar Talha
          </HighlightedText>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            gutterBottom
            sx={{ fontStyle: "italic" }}
          >
            National Tennis Champion, Pakistan
          </Typography>
          <Divider sx={{ my: 2, backgroundColor: "#81c784" }} />
          <Typography
            variant="body2"
            color="text.primary"
            sx={{ mb: 2, lineHeight: 1.8 }}
          >
            Abu Bakar Talha is one of Pakistan's most accomplished tennis
            players, dominating the junior categories and representing the
            country on international platforms. His dedication and skill inspire
            the next generation of athletes.
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 1,
              fontWeight: "bold",
              fontSize: "1.2rem",
              color: "#4fc3f7",
            }}
          >
            Career Highlights:
          </Typography>
          <Typography variant="body2" color="text.primary">
            🏆 U-10, U-12, U-14, U-16, U-18 National Champion
            <br />
            🌍 Pakistan Junior Davis Cup Player
            <br />
            🎾 Winner of multiple Asia-ranking tennis championships in the
            junior category
          </Typography>
          <IconContainer>
            <i className="fas fa-trophy"></i>
            <i className="fas fa-globe"></i>
            <i className="fas fa-medal"></i>
          </IconContainer>
        </CardContent>
      </StyledCard>
    </GlobalReset>
  );
}
