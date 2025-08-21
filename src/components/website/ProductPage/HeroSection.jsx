import { Box, Stack, Typography } from "@mui/material";
import React from "react";

const HeroSection = () => {
  return (
    <Box
      sx={{
        position: "relative",
        height: "602px",
        width: "100%",
      }}
    >
      <Box
        sx={{
          height: "602px",
          width: "100%",
          backgroundImage: `url("/websiteAssets/AboutUsHeroSection.png")`,
          backgroundSize: "cover",
          backgroundPosition: "50% 50%",
          position: "relative",
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.35)",
          }}
        />
      </Box>

      <Stack
        spacing={3.25} // 50px
        sx={{
          position: "absolute",
          top: "250px",
          left: "92px",
          maxWidth: "666px",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontFamily: "Jost-Bold, Montserrat",
            fontWeight: 700,
            fontSize: "64px",
            letterSpacing: "-7.68px",
            color: "text.light",
            textShadow: "0px 4px 4px rgba(255, 255, 255, 0.25)",
            whiteSpace: "nowrap",
          }}
        >
          OUR PRODUCTS
        </Typography>

        <Typography
          sx={{
            fontFamily: "Satoshi-Medium, Montserrat",
            fontWeight: 500,
            fontSize: "16px",
            color: "text.light",
            textShadow: "0px 4px 4px rgba(255, 255, 255, 0.25)",
          }}
        >
          Our mission is to empower individuals by providing a secure platform
          to manage personal records and share profiles effortlessly with a
          single tap. We are committed to enhancing connectivity and simplifying
          access to essential information, making everyday interactions seamless
          and efficient.
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
      </Stack>
    </Box>
  );
};

export default HeroSection;
