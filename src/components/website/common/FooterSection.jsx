import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom"; // ✅ import
import { SnackbarProvider, useSnackbar } from "notistack";

const FooterContent = () => {
  // Footer links data for reusability

  const { enqueueSnackbar } = useSnackbar();

  const handleSubscribe = () => {
    enqueueSnackbar("Thank you for subscribing!", {
      variant: "success",
      style: {
        backgroundColor: "#1f164f",
        color: "white",
        fontWeight: "bold",
        fontSize: "16px",
      },
    });
  };
  const footerLinks = [
    { label: "About Us", path: "/about-us" },
    { label: "Solutions", path: "/acs-services" },
    { label: "Features", path: "/acs-unqiue-features" },
    { label: "Products", path: "/acs-products-showcase" },
    { label: "Contact", path: "/acs-contact-us" },
  ];

  return (
    <Box sx={{ bgcolor: "#1f164f", py: 10, width: "100%" }}>
      <Container maxWidth="lg">
        <Stack spacing={4} alignItems="center">
          {/* Newsletter Section */}
          <Stack spacing={2} alignItems="center">
            <Typography
              variant="h2"
              component="h2"
              color="white"
              fontWeight="bold"
              fontFamily={"'Jost-Bold', Montserrat"}
              fontSize={64}
              textAlign="center"
              sx={{ letterSpacing: "-0.58px" }}
            >
              Join The Newsletter
            </Typography>

            <Typography
              color="#b3b3b3"
              fontSize={24}
              fontFamily={"Open_Sans-Medium, Montserrat"}
              textAlign="center"
              sx={{ maxWidth: 840, letterSpacing: "-0.46px" }}
            >
              Be the first one to know about discounts, offers and events weekly
              in your mailbox. Unsubscribe whenever you like with one click.
            </Typography>

            <Box
              sx={{
                bgcolor: "#b3b3b3",
                borderRadius: "5px",
                width: "100%",
                maxWidth: 840,
                height: 75,
                position: "relative",
                display: "flex",
                alignItems: "center",
                px: 1,
              }}
            >
              <TextField
                fullWidth
                placeholder="Enter Your Email.."
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon
                        sx={{ color: "#1f164f", width: 35, height: 35 }}
                      />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiInputBase-input": {
                    color: "#1f164f",
                    fontSize: "20px",
                    ml: 2,
                    fontFamily: "'Montserrat', sans-serif",
                    "&::placeholder": {
                      fontFamily: "'Montserrat', sans-serif",
                      color: "#1f164f",
                      opacity: 0.7,
                    },
                  },
                }}
              />
              <Button
                onClick={handleSubscribe}
                sx={{
                  bgcolor: "#1f164f",
                  color: "white",
                  borderRadius: "5px",
                  width: 150,
                  height: 65,
                  fontWeight: "bold",
                  fontSize: 20,
                  fontFamily: "'Montserrat', Open_Sans-Medium",
                  letterSpacing: "1px",
                  "&:hover": {
                    bgcolor: "#2a1c6a",
                  },
                }}
              >
                Subscribe
              </Button>
            </Box>
          </Stack>

          {/* Footer Content */}
          <Box sx={{ width: "100%" }}>
            <Divider sx={{ borderColor: "#ffffff", borderWidth: 2.5, mb: 5 }} />

            <Grid container spacing={2} sx={{ mb: 5 }} alignItems="flex-start">
              {/* Company Info */}
              <Grid item xs={12} md={5}>
                <Stack spacing={3}>
                  <Box
                    sx={{
                      width: 200,
                      height: 60,
                      backgroundImage: 'url("/logo.png")',
                      backgroundSize: "100% 100%",
                    }}
                  />
                  <Typography
                    color="#b3b3b3"
                    fontFamily={"Open_Sans-Medium, Montserrat"}
                    fontSize={16}
                  >
                    Apna Card empowers teams and enterprises with a paperless
                    solution for medical records, and seamless collaboration,
                    driving business growth and stronger connections.
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <FacebookIcon sx={{ color: "#b3b3b3" }} />
                    <TwitterIcon sx={{ color: "#b3b3b3" }} />
                    <InstagramIcon sx={{ color: "#b3b3b3" }} />
                    <LinkedInIcon sx={{ color: "#b3b3b3" }} />
                  </Stack>
                </Stack>
              </Grid>

              {/* Vertical Divider */}
              <Divider
                orientation="vertical"
                flexItem
                sx={{
                  borderColor: "#b3b3b3",
                  mx: 2,
                  display: { xs: "none", md: "block" },
                }}
              />

              {/* Footer Links Columns */}
              {/* Single Footer Links Column */}
              <Grid
                item
                xs={12}
                md={6}
                display="flex"
                justifyContent="flex-end"
              >
                <Stack spacing={2} alignItems="flex-end">
                  <Typography
                    color="white"
                    fontSize={24}
                    fontWeight="bold"
                    fontFamily={"Open_Sans-Medium, Montserrat"}
                  >
                    ApnaCard
                  </Typography>
                  <Stack spacing={1.5}>
                    {footerLinks.map((link, i) => (
                      <Typography
                        key={i}
                        fontFamily={"Jost-Bold, Montserrat"}
                        component={RouterLink}
                        to={link.path}
                        color="#b3b3b3"
                        fontSize={16}
                        sx={{
                          textDecoration: "underline",
                          cursor: "pointer",
                          "&:hover": { color: "white" },
                        }}
                      >
                        {link.label}
                      </Typography>
                    ))}
                  </Stack>
                </Stack>
              </Grid>
            </Grid>

            <Divider sx={{ borderColor: "#b3b3b3", mb: 3 }} />
          </Box>

          {/* Copyright */}
          <Typography
            color="#b3b3b3"
            fontSize={20}
            textAlign="center"
            fontFamily={"Open_Sans-Medium, Montserrat"}
            lineHeight="10px"
          >
            Copyright ©. All Rights Reserved by ApnaCard
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

// 🔄 Local Provider wrapper
const FooterSection = () => (
  <SnackbarProvider
    maxSnack={1}
    anchorOrigin={{ vertical: "top", horizontal: "center" }}
  >
    <FooterContent />
  </SnackbarProvider>
);

export default FooterSection;
