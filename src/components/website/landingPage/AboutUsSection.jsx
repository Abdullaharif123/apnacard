import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

// Note: We're assuming these images are available from the same location
// If they need to be hosted elsewhere, the paths would need to be updated

const AboutUsSection = () => {
  const navigate = useNavigate();

  const handleAboutUsClick = () => {
    navigate("/about-us"); // Replace with your actual route
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: { xs: 3, md: 12.5 },
        py: { xs: 4, md: 6.25 },
        bgcolor: "white",
      }}
    >
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <Stack spacing={3}>
            <Typography
              variant="h2"
              sx={{
                fontFamily: "'Jost-Bold', Montserrat",
                color: "#1f164f",
                fontSize: { xs: 48, md: 64 },
                fontWeight: 700,
                letterSpacing: "-3.84px",
                lineHeight: 1.1,
              }}
            >
              WHO WE ARE
            </Typography>

            <Stack spacing={2}>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "'Poppins-Regular', Montserrat",
                  color: "black",
                  fontSize: 16,
                }}
              >
                Apna Card is a seamless digital solution for instant
                connections. Share your contact details with a tap using NFC or
                let others scan your QR code—no more paper exchanges.
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  fontFamily: "'Poppins-Regular', Montserrat",
                  color: "black",
                  fontSize: 16,
                }}
              >
                Apna Card goes beyond contact sharing. Capture leads, track
                interactions, and integrate with your CRM to nurture your
                network and grow your business. Export data to Excel or CSV,
                identify potential clients, and make smarter marketing
                decisions.
              </Typography>
            </Stack>

            <Button
              onClick={handleAboutUsClick}
              variant="contained"
              endIcon={<ArrowOutwardIcon />}
              sx={{
                bgcolor: "#1f164f",
                borderRadius: "10px",
                width: 200,
                height: 55,
                textAlign: "center",
                fontFamily: "'Istok_Web-Bold', Montserrat",
                fontWeight: 700,
                fontSize: 16,
                letterSpacing: "-0.64px",
                "&:hover": {
                  bgcolor: "#2a1c6a",
                },
              }}
            >
              ABOUT US
            </Button>
          </Stack>
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          sx={{ textAlign: { xs: "center", md: "right" } }}
        >
          <Box
            component="img"
            src={"/websiteAssets/AboutUsWhoWeAre.png"} // Replace with the actual image path
            alt="Team members"
            sx={{
              width: "100%",
              maxWidth: 615,
              height: "auto",
              maxHeight: 420,
              objectFit: "cover",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AboutUsSection;
