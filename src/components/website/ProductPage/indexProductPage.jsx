import { Box } from "@mui/material";
import React from "react";
import { ThemeProvider } from "../AboutUsPage/ThemeProvider";
import NavigationBarSection from "../common/NavigationBarSection";
import HeroSection from "./HeroSection";
// import ContactSection from "../AboutUsPage/ContactSection";
import FooterSection from "../common/FooterSection";
import ProductShowcaseSection from "./ProductShowcaseSection";

const ProductsPage = () => {
  return (
    <ThemeProvider>
      <Box sx={{ bgcolor: "background.default" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <NavigationBarSection />
          <HeroSection />
          <ProductShowcaseSection />
          {/* <ContactSection /> */}
          <FooterSection />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ProductsPage;
