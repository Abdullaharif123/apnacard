import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  InputAdornment,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { apiRequestStatuses } from "../../common/constant";
import { signupScanCard } from "../../api-services/user";
import { useDispatch } from "react-redux";
import { notification } from "../../redux/slices/authSlice";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Notification } from "../../components";

const SignUpPage = () => {
  const dispatch = useDispatch();

  const location = useLocation();
  const navigate = useNavigate();
  const userDetails = location.state;

  // Initial state with auto-populated values
  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    cnic: "",
    mobileNo: "",
    dob: "",
    gender: "",
    cardNumber: userDetails ? userDetails.cardNumber : "",
    organisationName: userDetails ? userDetails.organisationName : "",
    role: userDetails ? userDetails.role : "",
  });
  const [emailError, setEmailError] = useState(false); // State for email validation
  const [mobileError, setMobileError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for showing password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for showing confirm password

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Email validation
    if (name === "email") {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      setEmailError(!emailPattern.test(value)); // Update email error state
    }
    // Mobile validation
    if (name === "mobileNo") {
      const mobilePattern = /^[0-9]{11}$/; // Only numbers and exactly 11 digits
      setMobileError(value && !mobilePattern.test(value)); // Update mobile error state
    }
    // Password match validation (only when typing in confirmPassword field)
    if (name === "confirmPassword") {
      setPasswordError(value && value !== signUpData.password); // Check if passwords match
    } else if (name === "password") {
      setPasswordError(
        signUpData.confirmPassword && value !== signUpData.confirmPassword
      ); // Check if passwords match when typing in password
    }

    setSignUpData({ ...signUpData, [name]: value });
  };

  const handleGenderChange = (event) => {
    setSignUpData((prev) => ({ ...prev, gender: event.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signupScanCard(signUpData);
      if (res.metadata.status === apiRequestStatuses.SUCCESS) {
        dispatch(
          notification({
            open: true,
            type: "success",
            message: "User Created successfully!",
          })
        );
        navigate("/login");
      }
    } catch (error) {
      console.error(
        "Error occurred during sign up:",
        error.response?.data || error
      );
      dispatch(
        notification({
          open: true,
          type: "error",
          message: "Error Creating User!",
        })
      );
    }
  };

  return (
    <Grid
      container
      sx={{
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(90deg, #001F54, #9B2ECA)", // Background gradient
        overflow: "hidden",
      }}
    >
      <Grid item xs={12} md={8} lg={6}>
        {" "}
        <Paper
          elevation={3}
          sx={{
            padding: 3,
            width: "100%",
            maxWidth: "500px",
            backgroundColor: "#F9FAFC",
            margin: "auto", // Center the Paper
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            sx={{ marginBottom: "20px", textAlign: "center" }}
          >
            Let's Jump On-Board
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={signUpData.firstName}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={signUpData.lastName}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Email"
                  name="email"
                  value={signUpData.email}
                  onChange={handleChange}
                  required
                  error={emailError}
                  helperText={emailError ? "Please enter a valid email." : ""}
                  placeholder={emailError ? "abc@example.com" : ""}
                  sx={{
                    borderColor: emailError ? "red" : "inherit",
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Mobile Number"
                  name="mobileNo"
                  value={signUpData.mobileNo}
                  onChange={handleChange}
                  required
                  error={mobileError}
                  helperText={
                    mobileError ? "Mobile No. must be 11 digits." : ""
                  }
                  placeholder={mobileError ? "03000000000" : ""}
                  sx={{
                    borderColor: mobileError ? "red" : "inherit",
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={signUpData.password}
                  onChange={handleChange}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Confirm Password"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={signUpData.confirmPassword}
                  onChange={handleChange}
                  required
                  error={passwordError}
                  helperText={passwordError ? "Passwords do not match." : ""}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle confirm password visibility"
                          onClick={() =>
                            setShowConfirmPassword((prev) => !prev)
                          }
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    borderColor: passwordError ? "red" : "inherit",
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="CNIC"
                  name="cnic"
                  value={signUpData.cnic}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Date of Birth"
                  name="dob"
                  value={signUpData.dob}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    value={signUpData.gender}
                    onChange={handleGenderChange}
                    label="Gender"
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Organization"
                  name="organisationName"
                  value={signUpData.organisationName}
                  onChange={handleChange}
                  required
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Role"
                  name="role"
                  value={signUpData.role}
                  onChange={handleChange}
                  required
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Card Number"
                  name="cardNumber"
                  value={signUpData.cardNumber}
                  onChange={handleChange}
                  required
                  disabled
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                marginTop: 3,
                background: "linear-gradient(90deg, #001F54, #9B2ECA)",
                color: "#fff",
                padding: "10px 0",
                "&:hover": {
                  background: "linear-gradient(90deg, #001F54, #9B2ECA)",
                },
              }}
            >
              Sign Up
            </Button>
          </form>
        </Paper>
      </Grid>

      <Notification />
    </Grid>
  );
};

export default SignUpPage;
