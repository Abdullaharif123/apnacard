import { Box, Button, Container, Stack, Typography } from "@mui/material";
import React from "react";
import { whatsAppConsultancy } from "../../../utils/common";

const solutionsData = [
  {
    title: "ONLINE DOCTOR CONSULTATION",
    description:
      "Skip the waiting rooms! Connect with experienced doctors from the comfort of your home. Our online doctor consultations are quick, secure, and designed to give you expert medical advice when you need it most.",
    buttonText: "BOOK CONSULTATION",
    image: "/websiteAssets/LandingPageDoctorConsultant.png",
    imagePosition: "right",
  },
  {
    title: "HOME NURSING",
    description:
      "Professional nursing care brought to your doorstep. Whether it’s post-surgical care, elderly support, or chronic condition management, our licensed nurses provide compassionate, high-quality care in the comfort of your home.",
    buttonText: "BOOK CONSULTATION",
    image: "/websiteAssets/LandingPageHomeNursing.png",
    imagePosition: "left",
  },
  {
    title: "ONLINE MEDICAL CONSULTATION",
    description:
      "Talk to certified specialists without stepping out. Get personalized medical advice, prescriptions, and follow-ups through our secure online platform – accessible anytime, anywhere.",
    buttonText: "BOOK CONSULTATION",
    image: "/websiteAssets/SolutionOverviewImage.png",
    imagePosition: "right",
  },
  {
    title: "ONLINE MEDICINE DELIVERY",
    description:
      "Get your medicines delivered fast and hassle-free. Order online and receive genuine, prescribed medications at your doorstep, ensuring you never miss a dose.",
    buttonText: "BOOK CONSULTATION",
    image: "/websiteAssets/LandingPageMedicineDelivery.png",
    imagePosition: "left",
  },
];

const SolutionCard = ({
  title,
  description,
  buttonText,
  image,
  imagePosition,
}) => {
  const handleConsultancyClick = () => {
    whatsAppConsultancy();
  };

  const content = (
    <Stack width="450px" spacing={3}>
      <Typography
        variant="h2"
        sx={{
          fontFamily: "'Jost-Bold', Montserrat",
          fontSize: "48px",
          fontWeight: 700,
          lineHeight: "50px",
          color: "primary.main",
        }}
      >
        {title}
      </Typography>

      <Typography
        sx={{
          fontFamily: "'Satoshi-Medium', Montserrat",
          fontSize: "16px",
          fontWeight: 500,
          color: "#191d23",
          pr: title === "ONLINE DOCTOR CONSULTATION" ? "48px" : 0,
        }}
      >
        {description}
      </Typography>

      <Button
        variant="contained"
        onClick={() => {
          handleConsultancyClick();
        }}
        sx={{
          width: "250px",
          height: "55px",
          borderRadius: "10px",
          backgroundColor: "primary.main",
          fontFamily: "'Istok_Web-Bold', Montserrat",
          fontWeight: 700,
          fontSize: "16px",
          textAlign: "center",
        }}
      >
        {title === "ONLINE DOCTOR CONSULTATION" ||
        title === "ONLINE MEDICAL CONSULTATION"
          ? "BOOK CONSULTATION"
          : title === "ONLINE MEDICINE DELIVERY"
          ? "ORDER NOW"
          : title === "HOME NURSING"
          ? "GET IN TOUCH"
          : "LEARN MORE"}
      </Button>
    </Stack>
  );

  const imageElement = (
    <Box
      component="img"
      src={image}
      alt={title}
      sx={{
        width: "700px",
        height: "450px",
        objectFit: "cover",
      }}
    />
  );

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      spacing={6} // 👈 This adds spacing between image and content
    >
      {imagePosition === "left" ? imageElement : content}
      {imagePosition === "left" ? content : imageElement}
    </Stack>
  );
};

const SolutionsOverviewSection = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: "50px",
        bgcolor: "background.paper",
        position: "relative",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "25px",
          mb: "50px",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontFamily: "'Jost-Bold', Montserrat",
            fontSize: "64px",
            fontWeight: 700,
            lineHeight: "50px",
            color: "primary.main",
            textAlign: "center",
          }}
        >
          OUR SOLUTIONS
        </Typography>

        <Typography
          sx={{
            fontFamily: "'Poppins-Light', Montserrat",
            fontSize: "20px",
            fontWeight: 300,
            letterSpacing: "-0.32px",
            textAlign: "center",
            color: "black",
          }}
        >
          Our mission is to empower individuals by providing a secure platform
          to manage personal records and share profiles effortlessly with a
          single tap. We are committed to enhancing connectivity and simplifying
          access to essential information, making everyday interactions seamless
          and efficient.
        </Typography>
      </Container>

      <Box sx={{ position: "relative", width: "100%" }}>
        <Box
          sx={{
            position: "absolute",
            width: "300px",
            height: "2050px",
            left: "50%",
            transform: "translateX(-50%)",
            bgcolor: "primary.main",
            borderRadius: "10px",
            zIndex: 0,
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Stack spacing={6} py={6}>
            {solutionsData.map((solution, index) => (
              <SolutionCard
                key={index}
                title={solution.title}
                description={solution.description}
                buttonText={solution.buttonText}
                image={solution.image}
                imagePosition={solution.imagePosition}
              />
            ))}
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default SolutionsOverviewSection;
