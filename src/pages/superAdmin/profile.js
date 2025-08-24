

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

const Profile = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
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

      {/* Left-aligned heading */}
      <Box sx={{ width: "100%" }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: "left" }}>
          Super Admin Profile
        </Typography>
      </Box>

      {/* Tabs - Simplified (No Gradient) */}
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          aria-label="Profile Tabs"
          textColor="Black"
          indicatorColor="primary"
          TabIndicatorProps={{
            style: {
              height: "4px",
            },
          }}
          sx={{
            "& .MuiTab-root": {
              fontWeight: "bold",
              textTransform: "none",
            },
          }}
        >
          <Tab label="Account Information" />
          <Tab label="Update Password" />
        </Tabs>

        {/* Main Content Box */}
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
          {/* Account Information */}
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

          {/* Password Details */}
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
                variant="outlined"
                fullWidth
              />
              <TextField
                label="New Password"
                type="password"
                variant="outlined"
                fullWidth
              />
              <TextField
                label="Confirm New Password"
                type="password"
                variant="outlined"
                fullWidth
              />
              <Button variant="contained" sx={{ mt: 2 }} color="primary">
                Save
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
