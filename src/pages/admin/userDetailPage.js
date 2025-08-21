import React, { useState, useEffect } from "react";
import { getUserDetailsById } from "../../api-services/admin";

import {
  Typography,
  Paper,
  Stack,
  Avatar,
  Grid,
  Tooltip,
  TextField,
} from "@mui/material";

const UserDetailsPage = ({ userId }) => {
  // Accept userId as a prop
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await getUserDetailsById(userId);
        const userData = res.payload.data;
        setUserDetails(userData);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  if (!userDetails) {
    return <Typography>Loading...</Typography>;
  }

  // Styles for read-only fields
  const readOnlyStyle = {
    opacity: 0.6,
    pointerEvents: "none",
  };

  // Styles to center the grid and improve spacing
  const gridContainerStyle = {
    justifyContent: "center",
    paddingRight: "20px",
  };

  const ReadOnlyField = ({ label, name, value, tooltip }) => (
    <Grid item xs={12} sm={6}>
      {tooltip ? (
        <Tooltip title="This field is not editable">
          <TextField
            fullWidth
            label={label}
            name={name}
            value={value ?? "-"}
            InputProps={{ readOnly: true }}
            sx={readOnlyStyle}
          />
        </Tooltip>
      ) : (
        <TextField
          fullWidth
          label={label}
          name={name}
          value={value ?? "-"}
          InputProps={{ readOnly: true }}
          sx={readOnlyStyle}
        />
      )}
    </Grid>
  );

  const fields = [
    { label: "First Name", name: "firstName", value: userDetails.firstName },
    { label: "Last Name", name: "lastName", value: userDetails.lastName },
    { label: "Email", name: "email", value: userDetails.email, tooltip: true },
    { label: "CNIC", name: "cnic", value: userDetails.cnic, tooltip: true },
    {
      label: "Mobile Number",
      name: "mobileNo",
      value: userDetails.mobileNo,
      tooltip: true,
    },
    {
      label: "Organization",
      name: "organization",
      value: userDetails.organisationName,
      tooltip: true,
    },
    {
      label: "Date of Birth",
      name: "dob",
      value: userDetails.dob ? userDetails.dob.split("T")[0] : "-",
    },
    { label: "Gender", name: "gender", value: userDetails.gender },
    { label: "Role", name: "role", value: userDetails.role, tooltip: true },
    {
      label: "Card Number",
      name: "cardNumber",
      value: userDetails.cardNumber,
      tooltip: true,
    },
  ];

  return (
    <Paper elevation={3} sx={{ padding: 3, width: "100%" }}>
      <Stack spacing={2} sx={{ marginBottom: 3 }}>
        {/* Profile Picture Section */}
        <div style={{ position: "relative", textAlign: "center" }}>
          <Avatar
            alt={`${userDetails.firstName} ${userDetails.lastName}`}
            src={userDetails.profilePicture}
            sx={{ width: 150, height: 150, margin: "0 auto" }}
          />
        </div>

        {/* User Details Form */}
        <Grid container spacing={2} sx={gridContainerStyle}>
          {fields.map((field, index) => (
            <ReadOnlyField
              key={index}
              label={field.label}
              name={field.name}
              value={field.value}
              tooltip={field.tooltip}
            />
          ))}
        </Grid>
      </Stack>
    </Paper>
  );
};

export default UserDetailsPage;
