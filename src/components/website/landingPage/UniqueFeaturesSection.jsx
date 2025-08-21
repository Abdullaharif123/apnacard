import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const featureData = [
  {
    id: 1,
    title: "PRESCRIPTION RECORD",
    backgroundImage: "/websiteAssets/LandingPagePrescriptionRecord.png",
  },
  {
    id: 2,
    title: "HOSPITAL RECORDS",
    backgroundImage: "/websiteAssets/LandingPageHospitalRocord.png",
  },
];

const UniqueFeaturesSection = () => {
  const navigate = useNavigate();
  const handleViewUniqueFeaturesClick = () => {
    navigate("/acs-unqiue-features"); // Replace with your actual route
  };

  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "50px",
        py: 6.25,
        px: { xs: 2, md: 12.5 },
        bgcolor: "white",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontFamily: "'Jost-Bold', Montserrat",
          color: "#1f164f",
          fontSize: { xs: 48, md: 64 },
          textAlign: "center",
          letterSpacing: "-5px",
          fontWeight: 700,
          lineHeight: "normal",
        }}
      >
        OUR UNIQUE FEATURES
      </Typography>

      <Container maxWidth="lg" sx={{ p: 0 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 3, md: 3.75 },
            width: "100%",
          }}
        >
          {featureData.map((feature) => (
            <Card
              key={feature.id}
              sx={{
                width: "100%",
                height: 295,
                position: "relative",
                borderRadius: 0,
                boxShadow: "none",
              }}
            >
              <CardMedia
                component="div"
                sx={{
                  backgroundImage: `url(${feature.backgroundImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "100%",
                  width: "100%",
                }}
              >
                <CardContent
                  sx={{
                    position: "relative",
                    height: "100%",
                    p: 4,
                    "&:last-child": { pb: 4 },
                  }}
                >
                  <Typography
                    variant="h2"
                    sx={{
                      fontFamily: "'Jost-Bold', Montserrat",
                      fontWeight: 700,
                      color: "white",
                      fontSize: { xs: 32, md: 44 },
                      lineHeight: "normal",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {feature.title}
                  </Typography>

                  {/* <Box
                    sx={{
                      position: "absolute",
                      bottom: 32,
                      left: 32,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "'Poppins-Regular', Helvetica",
                        fontWeight: 400,
                        color: "white",
                        fontSize: "1.25rem",
                      }}
                    >
                      Learn more
                    </Typography>
                    <ArrowOutwardIcon
                      sx={{
                        ml: 1,
                        fontSize: "1.1rem",
                        color: "white",
                      }}
                    />
                  </Box> */}
                </CardContent>
              </CardMedia>
            </Card>
          ))}
        </Box>
      </Container>

      <Button
        onClick={handleViewUniqueFeaturesClick}
        variant="contained"
        endIcon={<ArrowOutwardIcon />}
        sx={{
          bgcolor: "#1f164f",
          borderRadius: "10px",
          textTransform: "none",
          px: 4,
          py: 1.5,
          fontFamily: "'Istok_Web-Bold', Montserrat",
          fontWeight: 700,
          fontSize: "1rem",
          "&:hover": {
            bgcolor: "#2a1c6a",
          },
        }}
      >
        View All Features
      </Button>
    </Box>
  );
};

export default UniqueFeaturesSection;
