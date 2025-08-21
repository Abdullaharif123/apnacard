import { Box } from "@mui/material";
import React from "react";
import { ThemeProvider } from "../AboutUsPage/ThemeProvider";
import NavigationBarSection from "../common/NavigationBarSection";
import HeroSection from "../SolutionsPage/HeroSection";
import SolutionsOverviewSection from "./SolutionsOverviewSection";
// import ContactSection from "../AboutUsPage/ContactSection";
import FooterSection from "../common/FooterSection";

const ServicesPage = () => {
  return (
    <ThemeProvider>
      <Box sx={{ width: "100%", bgcolor: "background.default" }}>
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <NavigationBarSection />
          <HeroSection />
          <SolutionsOverviewSection />
          {/* <ContactSection /> */}
          <FooterSection />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ServicesPage;
