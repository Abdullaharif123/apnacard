import { Box } from "@mui/material";
import React from "react";
import { ThemeProvider } from "../AboutUsPage/ThemeProvider";
import NavigationBarSection from "../common/NavigationBarSection";
import FooterSection from "../common/FooterSection";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeatureSection";
// import ContactSection from "../AboutUsPage/ContactSection";
const UniqueFeaturesPage = () => {
  return (
    <ThemeProvider>
      <Box sx={{ width: "100%", bgcolor: "background.default" }}>
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <NavigationBarSection />
          <HeroSection />
          <FeaturesSection />
          {/* <ContactSection /> */}
          <FooterSection />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default UniqueFeaturesPage;
