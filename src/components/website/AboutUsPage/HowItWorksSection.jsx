import { Box, Container, Typography } from "@mui/material";
import React from "react";

const HowItWorksSection = () => {
  return (
    <Box component="section" sx={{ bgcolor: "background.default", py: 10 }}>
      <Container
        maxWidth="lg"
        sx={{ display: "flex", justifyContent: "center", position: "relative" }}
      >
        {/* Main Box to hold both image and overlapping text */}
        <Box sx={{ width: "100%", maxWidth: 1040, position: "relative" }}>
          {/* Background Image with Play Button */}
          <Box
            component="img"
            src={"websiteAssets/AboutUsVideo.png"}
            alt="How it works video"
            sx={{
              width: "100%",
              height: 450,
              objectFit: "cover",
              borderRadius: 2,
            }}
          />

          {/* Play Button */}
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "30%",
              transform: "translate(-50%, -50%)",
              width: 80,
              height: 80,
              borderRadius: "50%",
              bgcolor: "rgba(255,255,255,0.7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 2,
            }}
          >
            <Box
              component="span"
              sx={{
                width: 0,
                height: 0,
                borderLeft: "20px solid #000",
                borderTop: "12px solid transparent",
                borderBottom: "12px solid transparent",
              }}
            />
          </Box>

          {/* Overlapping Text Box */}
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              right: 0,
              transform: "translateY(-50%) translateX(20%)", // 50% overlap to the right
              bgcolor: "primary.main",
              color: "text.light",
              px: 3,
              py: 6,
              width: 479,
              boxShadow: 4,
              borderRadius: 2,
              zIndex: 3,
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontFamily: "Jost-Bold, Montserrat",
                fontWeight: 700,
                fontSize: "3rem",
                textAlign: "center",
                letterSpacing: "-3px",
                mb: 3,
              }}
            >
              HOW IT WORKS
            </Typography>

            <Typography
              sx={{
                fontFamily: "Poppins-Light, Montserrat",
                fontWeight: 300,
                fontSize: "1rem",
                textAlign: "center",
                letterSpacing: "-0.32px",
              }}
            >
              Apna Card is a seamless digital solution for instant connections.
              Share your contact details with a tap using NFC or let others scan
              your QR code—no more paper exchanges.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HowItWorksSection;
