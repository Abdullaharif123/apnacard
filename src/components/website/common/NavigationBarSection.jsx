import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { whatsAppMessage } from "../../../utils/common";

const NavigationBarSection = () => {
  const navigate = useNavigate();
  const location = useLocation(); // 👈 Get current location

  const handleSignInClick = () => {
    navigate("/login");
  };
  const handleWhatsAppClick = () => {
    whatsAppMessage();
  };

  const navItems = [
    { label: "ABOUT US", route: "/about-us" },
    { label: "SOLUTIONS", route: "/acs-services" },
    { label: "FEATURES", route: "/acs-unqiue-features" },
    { label: "PRODUCTS", route: "/acs-products-showcase" },
    { label: "PHARMACY", isWhatsApp: true },
    { label: "CONTACT", route: "/acs-contact-us" },
  ];

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: "#1f164f",
        height: "90px",
        boxShadow: "none",
      }}
    >
      <Container maxWidth={false}>
        <Toolbar
          disableGutters
          sx={{
            height: "62px",
            mt: "19px",
            justifyContent: "space-between",
          }}
        >
          <Link to="/" style={{ textDecoration: "none" }}>
            <Box
              component="img"
              src="/logo.png"
              alt="Logo"
              sx={{
                width: "200px",
                height: "61.7px",
                cursor: "pointer",
              }}
            />
          </Link>

          {/* Navigation Items */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              width: { xs: "auto", md: "1000px" },
            }}
          >
            {navItems.map((item) => {
              const isActive = location.pathname === item.route;

              return (
                <Typography
                  key={item.label}
                  onClick={() => {
                    if (item.isWhatsApp) {
                      handleWhatsAppClick();
                    } else {
                      navigate(item.route);
                    }
                  }}
                  variant="h6"
                  component="div"
                  sx={{
                    fontFamily: "'Satoshi-Medium', Montserrat",
                    fontWeight: 500,
                    fontSize: "20px",
                    color: "white",
                    textAlign: "center",
                    letterSpacing: "-1px",
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                    mb: 2.5,
                    borderBottom: isActive ? "3px solid #fff" : "none", // 👈 Highlight
                  }}
                >
                  {item.label}
                </Typography>
              );
            })}

            {/* Sign in Button */}
            <Button
              variant="contained"
              onClick={handleSignInClick}
              sx={{
                width: "130px",
                height: "61px",
                bgcolor: "#201756",
                borderRadius: "10px",
                boxShadow: "none",
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  width: "2px",
                  height: "61px",
                  left: 0,
                  top: 0,
                  backgroundColor: "white",
                },
                "&:hover": {
                  bgcolor: "#201756",
                },
              }}
            >
              <Typography
                sx={{
                  fontFamily: "'Istok_Web-Bold', Montserrat",
                  fontWeight: 700,
                  fontSize: "20px",
                  color: "white",
                  textAlign: "center",
                  letterSpacing: "-0.32px",
                }}
              >
                SIGN IN
              </Typography>
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavigationBarSection;
