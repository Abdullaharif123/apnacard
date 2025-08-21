import { Box, Container, Typography } from "@mui/material";
import React from "react";

const HeroSection = () => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "700px",
      }}
    >
      <Box
        sx={{
          position: "relative",
          height: "700px",
          width: "100%",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "700px",
            top: 0,
            left: 0,
            backgroundImage: `url("/websiteAssets/LandingPageHeroSection.png")`,
            backgroundSize: "cover",
            backgroundPosition: "top",
          }}
        >
          <Box
            sx={{
              height: "700px",
              backgroundColor: "rgba(31, 22, 79, 0.25)",
            }}
          />
        </Box>

        <Container>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "666px",
              gap: "20px",
              position: "relative",
              pt: "127px",
              pl: { xs: 0, md: "100px" },
              ml: { xs: 0, md: "-100px" },
            }}
          >
            <Typography
              variant="h1"
              sx={{
                color: "white",
                whiteSpace: "nowrap",
                fontFamily: "'Jost-Bold', Montserrat",
                fontWeight: 700,
                fontSize: "60px",
                lineHeight: "110%",
                letterSpacing: "-1px",
                textShadow: "0px 2px 6px rgba(0,0,0,0.3)",
              }}
            >
              APNA CARD
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 500,
                fontSize: "18px",
                color: "white",
                textShadow: "0px 4px 4px rgba(255, 255, 255, 0.25)",
              }}
            >
              Apna Card empowers teams and enterprises with a paperless solution
              for lead capture, employee management, medical records, and
              seamless collaboration, driving business growth and stronger
              connections.
            </Typography>

            {/* <Button
              variant="contained"
              sx={{
                width: "208px",
                height: "63px",
                mb: "-8px",
                backgroundColor: "#3f51b5",
                color: "white",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#1f164f",
                },
                textTransform: "uppercase",
              }}
            >
              Learn More
            </Button> */}
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HeroSection;
