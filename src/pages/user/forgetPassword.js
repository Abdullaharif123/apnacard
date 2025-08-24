import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Paper,
  Alert,
  Stack,
  Box,
  Grid,
} from "@mui/material";
import { apiRequestStatuses } from "../../common/constant";
import { forgetPassword } from "../../api-services/user";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cnic: "",
    mobileNo: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await forgetPassword(formData.cnic, formData.mobileNo);

      if (res.metadata.status === apiRequestStatuses.SUCCESS) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      setError("Failed to send temporary password. Please try again.");
    }
  };

  return (
    <Grid
      container
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(90deg, #20164F, #20164F)",
        margin: 0,
        padding: 0,
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container
          component="main"
          maxWidth="none"
          sx={{
            width: "100%",
            maxWidth: "400px",
            padding: 0,
            boxSizing: "border-box",
          }}
        >
          <Box
            sx={{
              background: "transparent",
              textAlign: "center",
              mb: 2,
            }}
          >
            <img
              src="/logo.png"
              alt="App Logo"
              style={{ maxWidth: "160px", height: "auto" }}
            />
          </Box>
          <Paper
            elevation={6}
            sx={{
              padding: 4,
              borderRadius: 3,
              backgroundColor: "#fff",
              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                Temporary password sent successfully! Redirecting to login...
              </Alert>
            )}
            <form onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="CNIC"
                  name="cnic"
                  value={formData.cnic}
                  onChange={handleChange}
                  placeholder="xxxxx-xxxxxxx-x"
                  required
                  inputProps={{
                    pattern: "[0-9]{5}-[0-9]{7}-[0-9]{1}",
                  }}
                />
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Phone Number"
                  name="mobileNo"
                  value={formData.mobileNo}
                  onChange={handleChange}
                  placeholder="03000000000"
                  required
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    background: "#20164F",
                    color: "#fff",
                    padding: "12px 0",
                    borderRadius: "25px",
                    fontWeight: "bold",
                    fontSize: "15px",
                    textTransform: "none",
                    "&:hover": {
                      background: "linear-gradient(90deg, #001F54, #9B2ECA)",
                    },
                  }}
                >
                  Send Temporary Password
                </Button>
              </Stack>
            </form>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: 3,
                alignItems: "center",
              }}
            >
              <Link
                to="/login"
                style={{
                  textDecoration: "underline",
                  color: "#20164F",
                }}
              >
                Back to Login Page
              </Link>
            </Box>
          </Paper>
        </Container>
      </Grid>
    </Grid>
  );
};

export default ForgotPasswordPage;
