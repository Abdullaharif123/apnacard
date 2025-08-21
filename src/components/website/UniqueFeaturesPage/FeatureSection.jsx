import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { whatsAppLearnMore } from "../../../utils/common";

// Feature data for mapping
const features = [
  {
    title: "Prescription Record",
    description:
      "Easily manage your prescriptions in one secure place. Our platform allows you to upload and store prescriptions from multiple healthcare providers, ensuring you have access to them whenever needed. Download your prescriptions for sharing or reference, and effortlessly track and organize them on a monthly or yearly basis for better medication management.",
    image: "/websiteAssets/UnqiueFeaturesMedicalRecords.png",
    imagePosition: "left",
  },
  {
    title: "Hospital Record",
    description:
      "Keep a complete history of your hospital visits, all in one place. Upload important documents such as admission and discharge summaries, diagnoses, treatment plans, and more. Whether you’ve had a short visit or an extended stay, our system helps you download and maintain these records in an organized manner — sorted by month or year for quick access.",
    image: "/websiteAssets/UniqueFeaturesHospRecords.png",
    imagePosition: "right",
  },
  {
    title: "Lab Record",
    description:
      "Stay on top of your health with organized lab records. Record and access essential patient information including name, ID, and medical history, along with detailed test data such as test names, lab names, and dates. Upload and store lab reports, view results with reference ranges and doctor’s interpretations, and maintain everything in a structured, time-based format. Download reports anytime you need them for consultations or second opinions.",
    image: "/websiteAssets/UniqueFeaturesLabRecords.png",
    imagePosition: "left",
  },
  {
    title: "Radiology Record",
    description:
      "Keep your imaging records organized and accessible. Upload radiology reports including X-rays, MRIs, CT scans, and ultrasounds. Each record includes the imaging type, procedure date, and detailed radiologist findings. Easily download reports when needed and maintain your radiology history in a well-organized monthly or yearly format, ensuring continuity in diagnosis and treatment planning.",
    image: "/websiteAssets/UniqueFeaturesRadiologyReports.png",
    imagePosition: "right",
  },
];

const FeaturesSection = () => {
  const handleLearnMoreClick = () => {
    whatsAppLearnMore();
  };

  return (
    <Box component="section" py={6.25} bgcolor="background.default">
      <Container maxWidth="lg">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={3.125}
        >
          <Typography
            variant="h2"
            color="primary.main"
            align="center"
            sx={{
              fontFamily: "'Jost-Bold', Montserrat",
              fontWeight: 700,
              fontSize: "64px",
              lineHeight: "50px",
              letterSpacing: "-3.84px",
            }}
          >
            OUR UNIQUE FEATURES
          </Typography>

          <Typography
            variant="body2"
            color="text.primary"
            align="center"
            sx={{
              fontFamily: "'Poppins-Light', Montserrat",
              fontWeight: 300,
              fontSize: "20px",
            }}
          >
            Our mission is to empower individuals by providing a secure platform
            to manage personal records and share profiles effortlessly with a
            single tap. We are committed to enhancing connectivity and
            simplifying access to essential information, making everyday
            interactions seamless and efficient.
          </Typography>
        </Box>

        <Box mt={6.25}>
          {features.map((feature, index) => (
            <Grid
              container
              spacing={8.5}
              alignItems="center"
              key={index}
              direction={
                feature.imagePosition === "left" ? "row" : "row-reverse"
              }
              sx={{ mb: index < features.length - 1 ? 6.25 : 0 }}
            >
              <Grid item xs={12} md={6}>
                <Box
                  component="img"
                  src={feature.image}
                  alt={feature.title}
                  sx={{
                    width: "100%",
                    height: "700px",
                    objectFit: "absolute",
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Box display="flex" flexDirection="column" gap={3.125}>
                  <Typography
                    variant="h2"
                    color="primary.main"
                    sx={{
                      fontFamily: "'Jost-Bold', Montserrat",
                      fontWeight: 700,
                      fontSize: "56px",
                      lineHeight: "normal",
                      height: "58px",
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.primary"
                    sx={{
                      fontFamily: "'Poppins-Regular', Montserrat",
                      fontSize: "18px",
                      lineHeight: "25px",
                      maxWidth: "600px",
                    }}
                  >
                    {feature.description}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      handleLearnMoreClick();
                    }}
                    sx={{
                      width: "250px",
                      height: "55px",
                      borderRadius: "10px",
                      fontFamily: "'Istok_Web-Bold', Montserrat",
                      fontWeight: 700,
                      fontSize: "16px",
                      textAlign: "center",
                    }}
                  >
                    LEARN MORE
                  </Button>
                </Box>
              </Grid>
            </Grid>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturesSection;
