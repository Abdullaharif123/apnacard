import { Box, Button, Stack, Typography } from "@mui/material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import React from "react";

const AboutUsSectionMain = () => {
  // Content paragraphs data
  const paragraphs = [
    "Apna Card is a seamless digital solution for instant connections. Share your contact details with a tap using NFC or let others scan your QR code—no more paper exchanges.",
    "Apna Card goes beyond contact sharing. Capture leads, track interactions, and integrate with your CRM to nurture your network and grow your business. Export data to Excel or CSV, identify potential clients, and make smarter marketing decisions.",
  ];

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        py={6.25} // 50px
        px={12.5} // 100px
        bgcolor="background.paper"
        gap={4} // 👈 Add this
      >
        <Stack spacing={3.125} width="100%">
          <Typography
            variant="h2"
            color="primary.main"
            sx={{
              fontFamily: "'Jost-Bold', Montserrat",
              mt: -0.125, // -1px
            }}
          >
            WHO WE ARE
          </Typography>

          <Stack spacing={2.5}>
            {paragraphs.map((paragraph, index) => (
              <Typography key={index} variant="body1" color="text.primary">
                {paragraph}
              </Typography>
            ))}
          </Stack>

          <Button
            variant="contained"
            color="primary"
            sx={{
              width: "200px",
              height: "55px",
              borderRadius: "10px",
              textTransform: "none",
            }}
            endIcon={<ArrowOutwardIcon />}
          >
            Contact Us
          </Button>
        </Stack>

        <Box
          component="img"
          src={"websiteAssets/AboutUsWhoWeAre.png"} // Replace with the actual image path
          alt="Team members"
          sx={{
            width: "615px",
            height: "420px",
            objectFit: "cover",
          }}
        />
      </Box>
    </>
  );
};

export default AboutUsSectionMain;
