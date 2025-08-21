import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: "blur(24px)",
  border: "1px solid",
  borderColor: theme.palette.divider,
  backgroundColor: alpha(theme.palette.background.default, 0.4),
  boxShadow: theme.shadows[1],
  padding: "8px 12px",
}));

export default function AppAppBar() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleSignInClick = () => {
    navigate("/login");
  };

  // const handleSignUpClick = () => {
  //   navigate("/signup");
  // };

  const handleBrandAmbassadorClick = () => {
    navigate("/brand-ambassador");
  };

  const handleOrderMedicinesClick = () => {
    navigate("/order-medicines");
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = "+923217564880";
    const message = "Hello, I want to order from Pharmacy.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        // boxShadow: 0,
        // bgcolor: "transparent",
        // backgroundImage: "none",
        // mt: 10,
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        top: 0, // Fix the app bar to the top
        left: 0,
        right: 0,
        zIndex: 1201, // Ensure it stays on top of other content
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box
            sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}
          >
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {/* <Button variant="text" color="info" size="small">
                Highlights
              </Button> */}
              {/* <Button variant="text" color="info" size="small">
                Pricing
              </Button> */}
              {/* <Button
                variant="text"
                color="info"
                size="small"
                sx={{ minWidth: 0 }}
              >
                FAQ
              </Button> */}
              <Tooltip title="Get Medicines On Your Doorstep" arrow>
                <Button
                  variant="text"
                  color="info"
                  size="small"
                  sx={{ minWidth: 0 }}
                  onClick={handleWhatsAppClick}
                >
                  Pharmacy
                </Button>
              </Tooltip>
              <Button
                variant="text"
                color="info"
                size="small"
                onClick={handleBrandAmbassadorClick}
              >
                Our Brand Ambassador
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                onClick={handleOrderMedicinesClick}
              >
                Medicines
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1,
              alignItems: "center",
            }}
          >
            <Button
              color="primary"
              variant="text"
              size="small"
              onClick={handleSignInClick}
            >
              Sign in
            </Button>
            {/* <Button
              color="primary"
              variant="contained"
              size="small"
              onClick={handleSignUpClick}
            >
              Sign up
            </Button> */}
          </Box>
          <Box sx={{ display: { sm: "flex", md: "none" } }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
              <Box sx={{ p: 2, backgroundColor: "background.default" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                <Divider sx={{ my: 3 }} />
                {/* <MenuItem>Features</MenuItem> */}
                {/* <MenuItem>Testimonials</MenuItem> */}
                {/* <MenuItem>Highlights</MenuItem> */}
                <MenuItem onClick={handleWhatsAppClick}>Pharmacy</MenuItem>
                <MenuItem onClick={handleBrandAmbassadorClick}>
                  Our Brand Ambassador
                </MenuItem>
                <MenuItem onClick={handleOrderMedicinesClick}>
                  Medicines
                </MenuItem>
                {/* <MenuItem>FAQ</MenuItem> */}
                {/* <MenuItem>Blog</MenuItem> */}
                {/* <MenuItem>
                  <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    onClick={handleSignUpClick}
                  >
                    Sign up
                  </Button>
                </MenuItem> */}
                <MenuItem>
                  <Button
                    color="primary"
                    variant="outlined"
                    fullWidth
                    onClick={handleSignInClick}
                  >
                    Sign in
                  </Button>
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
