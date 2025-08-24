import React from "react";
import { Box } from "@mui/material";
import FAQsSection from "../common/FAQsSection";
import FooterSection from "../common/FooterSection";
import HeroSection from "./HeroSection";
import ProductsSection from "./ProductsSection";
import ServicesSection from "./ServicesSection";
import UniqueFeaturesSection from "./UniqueFeaturesSection";
import AboutUsSection from "./AboutUsSection";
import NavigationBarSection from "../common/NavigationBarSection";
// import ContactSession from "../AboutUsPage/ContactSection";
import { ThemeProvider } from "../AboutUsPage/ThemeProvider";
import PartnersSection from "../AboutUsPage/PartnersSection";

export default function LandingPage() {
  return (
    <ThemeProvider>
      <Box sx={{ width: "100%", bgcolor: "background.default" }}>
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <NavigationBarSection />
          <HeroSection />
          <AboutUsSection />
          <ServicesSection />
          <UniqueFeaturesSection />
          <PartnersSection />
          <ProductsSection />
          {/* <ContactSession /> */}
          <FAQsSection />
          <FooterSection />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
