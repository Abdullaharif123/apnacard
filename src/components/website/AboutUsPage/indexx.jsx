import { Box } from "@mui/material";
import React from "react";
import BrandAmbassadorSection from "./BrandAmbassadorSection";
// import ContactSection from "./ContactSection";
import FooterSection from "../common/FooterSection";
import HeroSection from "./HeroSection";
import MissionVisionSection from "./MissionVisionSection";
import NavigationBarSection from "../common/NavigationBarSection";
import PartnersSection from "./PartnersSection";
import ServicesSection from "./ServicesSection";
import AboutUsSectionMain from "./AboutUsSectionMain";
import HowItWorksSection from "./HowItWorksSection";
import { ThemeProvider } from "./ThemeProvider";

const Frame = () => {
  return (
    <ThemeProvider>
      <Box sx={{ width: "100%", bgcolor: "background.default" }}>
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <NavigationBarSection />
          <HeroSection />
          <AboutUsSectionMain />
          <ServicesSection />
          <MissionVisionSection />
          <HowItWorksSection />
          <PartnersSection />
          <BrandAmbassadorSection />
          {/* <ContactSection /> */}
          <FooterSection />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Frame;
