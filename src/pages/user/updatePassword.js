import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  Stack,
  IconButton,
  InputAdornment,
  Grid,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { apiRequestStatuses } from "../../common/constant";
import { updatePassword } from "../../api-services/user";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";

const UpdatePasswordPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [passwordData, setPasswordData] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // State to manage password visibility
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      setError("New password and confirm password do not match");
      return;
    }
    try {
      const res = await updatePassword(
        passwordData.email,
        passwordData.oldPassword,
        passwordData.newPassword,
        passwordData.confirmNewPassword
      );

      if (res.metadata.status === apiRequestStatuses.SUCCESS) {
        setSuccess(true);
        dispatch(logout());
        setTimeout(() => {
          navigate("/login"); // Redirect to login after success
        }, 2000);
      }
    } catch (error) {
      setError("Failed to update password. Please try again.");
    }
  };

  const handleClickShowOldPassword = () => {
    setShowOldPassword((prev) => !prev);
  };

  const handleClickShowNewPassword = () => {
    setShowNewPassword((prev) => !prev);
  };

  const handleClickShowConfirmNewPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <Grid container sx={{ minHeight: "100vh" }}>
      {/* Center the content in the middle of the screen */}
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F9FAFC",
        }}
      >
        <Container component="main" maxWidth="xs">
          <Paper elevation={3} sx={{ padding: 3, width: "100%" }}>
            <Typography
              component="h1"
              variant="h5"
              sx={{ marginBottom: "20px", textAlign: "center" }}
            >
              Update Password
            </Typography>
            {error && (
              <Alert severity="error" sx={{ margin: "20px 0" }}>
                {error}
              </Alert>
            )}
            {success && (
              <Alert severity="success" sx={{ margin: "20px 0" }}>
                Password updated successfully! Redirecting to login...
              </Alert>
            )}
            <form onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Email"
                  name="email"
                  value={passwordData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Old Password"
                  name="oldPassword"
                  type={showOldPassword ? "text" : "password"}
                  value={passwordData.oldPassword}
                  onChange={handleChange}
                  placeholder="Enter your old password"
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowOldPassword}
                          onMouseDown={(e) => e.preventDefault()}
                          edge="end"
                        >
                          {showOldPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  variant="outlined"
                  fullWidth
                  label="New Password"
                  name="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={passwordData.newPassword}
                  onChange={handleChange}
                  placeholder="Enter your new password"
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowNewPassword}
                          onMouseDown={(e) => e.preventDefault()}
                          edge="end"
                        >
                          {showNewPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Confirm New Password"
                  name="confirmNewPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={passwordData.confirmNewPassword}
                  onChange={handleChange}
                  placeholder="Confirm your new password"
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowConfirmNewPassword}
                          onMouseDown={(e) => e.preventDefault()}
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    // background: "linear-gradient(90deg, #001F54, #9B2ECA)",
                    background: "linear-gradient(90deg, #20164F, #20164F)",

                    color: "#fff",
                    padding: "10px 0",
                    "&:hover": {
                      background: "linear-gradient(90deg, #001F54, #9B2ECA)",
                    },
                  }}
                >
                  Update Password
                </Button>
              </Stack>
            </form>
          </Paper>
        </Container>
      </Grid>
    </Grid>
  );
};

export default UpdatePasswordPage;
