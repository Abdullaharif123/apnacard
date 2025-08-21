import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

const ServicesSection = () => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      marginTop={1.25}
      marginBottom={6.25}
      width={"100%"}
      // py={6.25} // 50px
      px={12.5} // 100px
      bgcolor="background.default"
      gap={4}
    >
      <Box
        component="img"
        src={"/websiteAssets/AboutUsWhatWeDo.png"}
        alt="Element"
        sx={{
          width: "615px",
          height: "420px",
          objectFit: "cover",
        }}
      />

      <Stack spacing={3.125} width="550px">
        <Typography
          variant="h2"
          color="primary.main"
          sx={{
            fontFamily: "Jost-Bold, Montserrat",
            fontWeight: 700,
            fontSize: "64px",
            letterSpacing: "-3.84px",
            lineHeight: "normal",
            whiteSpace: "nowrap",
          }}
        >
          WHAT WE DO
        </Typography>

        <Typography
          variant="body1"
          color="text.primary"
          sx={{
            fontFamily: "Poppins-Regular, Montserrat",
            fontSize: "16px",
            width: "550px",
          }}
        >
          Apna Card empowers teams and enterprises with a paperless solution for
          slead capture, employee management, medical records, and seamless
          collaboration, driving business growth and stronger connections.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          endIcon={<ArrowOutwardIcon />}
          sx={{
            width: "200px",
            height: "55px",
            borderRadius: "10px",
            textTransform: "none",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Istok_Web-Bold, Montserrat",
              fontWeight: 700,
              fontSize: "16px",
              letterSpacing: "-0.64px",
            }}
          >
            Contact Us
          </Typography>
        </Button>
      </Stack>
    </Box>
  );
};

export default ServicesSection;
