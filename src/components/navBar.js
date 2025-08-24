import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice.js";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import { userRoles } from "../common/constant/index.js";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  // Get the user's role from Redux
  const { role } = useSelector((state) => state.auth);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleUpdatePassword = () => {
    handleMenuClose(); // Close the menu after selecting
    navigate("/update-password"); // Navigate to the update password screen
  };

  const handleWalletDetails = () => {
    handleMenuClose(); // Close the menu after selecting
    navigate("/walletDetails"); // Navigate to the update password screen
  };

  const handleProfile = () => {
    handleMenuClose(); // Close the menu after selecting
    navigate("/details"); // Navigate to the details screen
  };

  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("cardNumber");

    window.localStorage.setItem("logout", Date.now());

    navigate("/login");
    dispatch(logout());
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: 1201,
        background: "linear-gradient(90deg, #20164F, #20164F)",
      }}
    >
      <Toolbar>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Logo on the left */}
          <Link to="/" style={{ textDecoration: "none" }}>
            <Box
              component="img"
              src="/logo.png"
              alt="Logo"
              sx={{
                height: "55px", // adjust as needed
              }}
            />
          </Link>

          {/* Avatar on the right */}
          <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
            <Avatar alt="Profile Picture" src="/static/images/avatar/1.jpg" />
          </IconButton>
        </Box>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          transitionDuration={250}
          PaperProps={{
            elevation: 0,
            sx: {
              mt: 1.5,
              minWidth: 200,
              backdropFilter: "blur(12px)",
              backgroundColor: "rgba(255, 255, 255, 0.75)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              borderRadius: 3,
              overflow: "hidden",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
              "& .MuiMenuItem-root": {
                color: "#20164F",
                fontWeight: 500,
                letterSpacing: "0.5px",
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: "#20164F",
                  transform: "translateX(4px)",
                  color: "#FFFFFF",
                },
              },
            },
          }}
        >
          {role === userRoles.USER && (
            <>
              <MenuItem onClick={handleProfile}>Profile</MenuItem>
              <MenuItem onClick={handleUpdatePassword}>
                Update Password
              </MenuItem>
              <MenuItem onClick={handleWalletDetails}>Wallet</MenuItem>
            </>
          )}
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
