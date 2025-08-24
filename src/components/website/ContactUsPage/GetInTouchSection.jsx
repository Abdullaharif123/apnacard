import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import { Box, Card, Stack, Typography } from "@mui/material";
import React from "react";

const contactData = [
  {
    icon: <PhoneIcon sx={{ width: 100, height: 100, color: "white" }} />,
    backgroundColor: "success.main",
    title: "We are just a call away",
    info: "+923217564880",
  },
  {
    icon: <EmailIcon sx={{ width: 100, height: 100, color: "white" }} />,
    backgroundColor: "warning.main",
    title: "Get in touch with us online",
    info: "umar.shakeel@apna-card.com",
  },
  {
    icon: <LocationOnIcon sx={{ width: 100, height: 100, color: "white" }} />,
    backgroundColor: "error.main",
    title: "275 Y-Block, DHA Phase III, Lahore 54000, Pakistan.",
    singleLine: true,
  },
];

const GetInTouchSection = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "50px",
        px: "100px",
        py: "50px",
        bgcolor: "primary.main",
      }}
    >
      <Typography
        variant="h2"
        color="secondary.main"
        align="center"
        sx={{
          width: "100%",
          fontFamily: "Jost-Bold, Montserrat",
          fontWeight: 700,
          fontSize: "64px",
        }}
      >
        GET IN TOUCH
      </Typography>

      <Stack direction="row" justifyContent="space-between" width="100%">
        {contactData.map((item, index) => (
          <Box key={index} sx={{ width: 304 }}>
            <Card
              sx={{
                width: 300,
                height: 150,
                bgcolor: item.backgroundColor,
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
              }}
            >
              {item.icon}
            </Card>

            <Typography
              color="secondary.main"
              fontSize="20px"
              align="center"
              sx={{
                width: 300,
                height: item.singleLine ? 60 : 30,
                fontFamily: "Poppins-Regular, Montserrat",
                letterSpacing: "-0.32px",
              }}
            >
              {item.title}
            </Typography>

            {!item.singleLine && (
              <Typography
                color="secondary.main"
                fontSize="20px"
                align="center"
                sx={{
                  width: 300,
                  height: 30,
                  fontFamily: "Poppins-Regular, Montserrat",
                  letterSpacing: "-0.32px",
                }}
              >
                {item.info}
              </Typography>
            )}
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default GetInTouchSection;
