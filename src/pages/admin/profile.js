import React, { useState } from "react";
import {
  Box,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  TextField,
  Button,
} from "@mui/material";
import { updatePassword } from "../../api-services/user"; // Make sure this is correctly imported
import { useSelector, useDispatch } from "react-redux";
import { notification } from "../../redux/slices/authSlice";

const Profile = () => {
  const dispatch = useDispatch();

  const { email } = useSelector((state) => state.auth);

  const [selectedTab, setSelectedTab] = useState(0);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handlePasswordUpdate = async () => {
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      setError("New password and confirm password do not match");
      return;
    }

    try {
      const response = await updatePassword(
        email,
        passwordData.currentPassword,
        passwordData.newPassword,
        passwordData.confirmNewPassword
      );

      if (response.metadata.status === "SUCCESS") {
        dispatch(
          notification({
            open: true,
            type: "info",
            message: response.metadata.message,
          })
        );
        setSuccess(true);
      } else {
        setError("Failed to update password. Please try again.");
      }
    } catch (error) {
      setError("Error updating password.");
    }
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        bgcolor: "background.default",
        p: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Toolbar />
      <Box sx={{ width: "100%" }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: "left" }}>
          Admin Profile
        </Typography>
      </Box>

      <Box sx={{ width: "100%" }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          aria-label="Profile Tabs"
          textColor="Black"
          indicatorColor="primary"
          TabIndicatorProps={{ style: { height: "4px" } }}
          sx={{
            "& .MuiTab-root": { fontWeight: "bold", textTransform: "none" },
          }}
        >
          <Tab label="Account Information" />
          <Tab label="Update Password" />
        </Tabs>

        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexGrow: 1,
            minHeight: "60vh",
            width: "100%",
          }}
        >
          {selectedTab === 0 && (
            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                maxWidth: "400px",
                width: "100%",
                minHeight: "350px",
              }}
            >
              <TextField label="First Name" variant="outlined" fullWidth />
              <TextField label="Last Name" variant="outlined" fullWidth />
              <TextField label="Email" variant="outlined" fullWidth />
              <TextField label="Phone Number" variant="outlined" fullWidth />
              <TextField label="Address" variant="outlined" fullWidth />
              <Button variant="contained" sx={{ mt: 2 }} color="primary">
                Save
              </Button>
            </Box>
          )}

          {selectedTab === 1 && (
            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                maxWidth: "400px",
                width: "100%",
                minHeight: "350px",
              }}
            >
              <TextField
                label="Current Password"
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                variant="outlined"
                fullWidth
              />
              <TextField
                label="New Password"
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                variant="outlined"
                fullWidth
              />
              <TextField
                label="Confirm New Password"
                type="password"
                name="confirmNewPassword"
                value={passwordData.confirmNewPassword}
                onChange={handlePasswordChange}
                variant="outlined"
                fullWidth
              />
              <Button
                variant="contained"
                sx={{ mt: 2 }}
                color="primary"
                onClick={handlePasswordUpdate} // 🔥 Add this
              >
                Update Password
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
