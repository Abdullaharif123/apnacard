import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const ServiceCard = ({ title, imagePath, gradient }) => (
  <Card sx={{ position: "relative", height: "100%", borderRadius: 1 }}>
    <CardMedia
      component="img"
      image={imagePath}
      alt={title}
      sx={{ height: "100%" }}
    />
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: gradient,
        borderRadius: 0,
      }}
    />
    <CardContent
      sx={{
        position: "absolute",
        bottom: 0, // Aligns the content at the bottom
        left: 0, // Aligns the content at the left
        width: "100%",
        height: "100%",
        p: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end", // Ensures any content is aligned at the bottom
        textAlign: "left", // Aligns text to the left
      }}
    >
      <Typography
        variant="h4"
        component="h3"
        fontFamily="'Jost-Bold', Montserrat"
        fontWeight="bold"
        color="white"
        fontSize="44px"
      >
        {title}
      </Typography>
      {/* <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
        <Typography
          fontFamily="'Poppins-Regular', Helvetica"
          color="white"
          fontSize="20px"
        >
          Learn more
        </Typography>
        <Box
          component="img"
          src={learnMoreIcon}
          alt="Arrow"
          sx={{ ml: 1, width: "15px", height: "17px" }}
        />
      </Box> */}
    </CardContent>
  </Card>
);

const ServicesSection = () => {
  const navigate = useNavigate();
  const handleViewServicesClick = () => {
    navigate("/acs-services"); // Replace with your actual route
  };
  const services = [
    {
      id: 1,
      title: "DOCTOR CONSULTATION",
      imagePath: "/websiteAssets/LandingPageDoctorConsultant.png",
      gradient:
        "linear-gradient(180deg, rgba(217,217,217,0) 0%, rgba(4,4,4,0.8) 100%)",
    },
    {
      id: 2,
      title: "HOME NURSING",
      imagePath: "/websiteAssets/LandingPageHomeNursing.png",
      gradient:
        "linear-gradient(360deg, rgba(99,96,96,0) 0%, rgba(4,4,4,0.8) 100%)",
    },
    {
      id: 3,
      title: "MEDICINE DELIVERY",
      imagePath: "/websiteAssets/LandingPageMedicineDelivery.png",
      gradient:
        "linear-gradient(0deg, rgba(99,96,96,0) 0%, rgba(4,4,4,0.8) 100%)",
    },
  ];

  return (
    <Box
      sx={{
        bgcolor: "#1f164f",
        py: 6.25,
        px: { xs: 2, md: 12.5 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6.25,
      }}
    >
      <Typography
        variant="h1"
        fontFamily="'Jost-Bold', Montserrat"
        fontWeight="bold"
        color="white"
        fontSize="64px"
        letterSpacing="-5px"
        align="center"
        sx={{ width: "100%" }}
      >
        OUR SERVICES
      </Typography>

      <Grid container spacing={2.5} sx={{ maxWidth: "1240px" }}>
        <Grid item xs={12} md={6} sx={{ height: { md: "504px" } }}>
          <ServiceCard {...services[0]} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack spacing={2.5} sx={{ height: "100%" }}>
            <Box sx={{ height: "232px" }}>
              <ServiceCard {...services[1]} />
            </Box>
            <Box sx={{ height: "232px" }}>
              <ServiceCard {...services[2]} />
            </Box>
          </Stack>
        </Grid>
      </Grid>

      <Button
        variant="contained"
        color="primary"
        onClick={handleViewServicesClick}
        endIcon={<ArrowOutwardIcon />}
        sx={{
          bgcolor: "white",
          color: "#1f164f",
          borderRadius: "10px",
          px: 3,
          py: 1.5,
          textTransform: "none",
          fontFamily: "'Istok_Web-Bold', Montserrat",
          fontWeight: "bold",
          fontSize: "16px",
          "&:hover": {
            bgcolor: "white",
          },
        }}
      >
        View All Services
      </Button>
    </Box>
  );
};

export default ServicesSection;
