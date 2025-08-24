import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
  Box,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, loginFailure } from "../../redux/slices/authSlice";
import { getRoleFromToken } from "../../utils/token/index";
import { userRoles } from "../../common/constant";
import { handleUserLogin } from "../../api-services/user";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);

  const [credentials, setCredentials] = useState({
    identifier: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await handleUserLogin(credentials);

      if (response.metadata.status === "FAILURE") {
        dispatch(loginFailure(response.metadata.message));
        return;
      }

      let roleExtractedFromToken = await getRoleFromToken(
        response.payload.data.accessToken
      );

      localStorage.setItem("token", response.payload.data.accessToken);

      if (
        roleExtractedFromToken === userRoles.SUPER_ADMIN ||
        roleExtractedFromToken === userRoles.ADMIN
      ) {
        navigate("/dashboard");
      } else if (roleExtractedFromToken === userRoles.USER) {
        navigate("/details");
      }

      dispatch(
        loginSuccess({
          accessToken: response.payload.data.accessToken,
          cardNumber: response.payload.data.cardNumber,
          role: roleExtractedFromToken,
          isLoggedIn: true,
          orgId: response.payload.data.orgId,
          userId: response.payload.data.userId,
          email: response.payload.data.email,
          firstName: response.payload.data.firstName,
          lastName: response.payload.data.lastName,
        })
      );
    } catch (error) {
      dispatch(loginFailure("An unexpected error occurred"));
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
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

          {/* ONLY FORM AREA REFINED BELOW */}
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
            <form onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Phone number, email, or CNIC"
                  name="identifier"
                  value={credentials.identifier}
                  onChange={handleChange}
                  placeholder="Enter your identifier"
                  required
                  sx={{ borderRadius: 2 }}
                />
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={credentials.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={(e) => e.preventDefault()}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ borderRadius: 2 }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    background: "#20164F",
                    color: "#fff",
                    fontWeight: "bold",
                    borderRadius: "25px",
                    padding: "10px 0",
                    textTransform: "none",
                    fontSize: "15px",
                    "&:hover": {
                      background: "linear-gradient(90deg, #001F54, #9B2ECA)",
                    },
                  }}
                >
                  LOGIN
                </Button>
                <Typography
                  variant="body2"
                  align="center"
                  sx={{ color: "#444", mt: 1 }}
                >
                  By signing in, you agree to Apna Card's{" "}
                  <Link
                    to="/login"
                    style={{ textDecoration: "underline", color: "#20164F" }}
                  >
                    User Agreement
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/login"
                    style={{ textDecoration: "underline", color: "#20164F" }}
                  >
                    Privacy Policy
                  </Link>
                  .
                </Typography>
              </Stack>
            </form>
            <Box sx={{ textAlign: "center", mt: 3 }}>
              <Link
                to="/forget-password"
                style={{ textDecoration: "underline", color: "#20164F" }}
              >
                Forgot Password?
              </Link>
            </Box>
          </Paper>
        </Container>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
