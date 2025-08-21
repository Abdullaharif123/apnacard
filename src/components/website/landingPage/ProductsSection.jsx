import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductsSection() {

    const navigate = useNavigate();
        const handleViewProductsClick = () => {
          navigate("/acs-products-showcase"); // Replace with your actual route
        };
  
  // Product data for mapping
  const products = [
    {
      id: 1,
      title: "Metal Cards",
      description:
        "Golden, Silver, and Black premium Metal Apna Cards enhance your brand's appeal with durability, luxury, and advanced NFC for secure, efficient data sharing.",
      image: "https://via.placeholder.com/168",
      size: "small",
    },
    {
      id: 2,
      title: "Personalized Branding",
      description:
        "Incorporate company logos, colors, and designs unique to the user or business. Custom designs for specific industries, such as health care, education, or transportation.",
      image: "https://via.placeholder.com/218",
      size: "large",
    },
    {
      id: 3,
      title: "Digital Cards",
      description:
      "A simple NFC plastic card combines the basic functionality of a plastic card with the advanced technology of Near Field Communication (NFC).",
      image: "https://via.placeholder.com/168",
      size: "small",
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
        sx={{
          color: "white",
          fontSize: "64px",
          textAlign: "center",
          fontWeight: 700,
          letterSpacing: "-5px",
          fontFamily: "'Jost-Bold', Montserrat",
        }}
      >
        OUR PRODUCTS
      </Typography>

      <Container maxWidth="xl">
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 4, md: 15 }}
          justifyContent="center"
          alignItems="center"
        >
          {products.map((product) => (
            <Box
              key={product.id}
              sx={{
                width: product.size === "large" ? 400 : 300,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Box
                component="img"
                src={"/websiteAssets/LandingPageProductImage.png"}
                alt="Product"
                sx={{
                  width: product.size === "large" ? 218 : 168,
                  height: product.size === "large" ? 218 : 168,
                  objectFit: "cover",
                  mb: -7,
                  zIndex: 1,
                }}
              />
              <Card
                sx={{
                  width: product.size === "large" ? 400 : 300,
                  height: product.size === "large" ? 350 : 250,
                  borderRadius: "25px",
                  boxShadow: "2px 2px 4px 5px rgba(217,217,217,0.35)",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <CardContent
                  sx={{
                    textAlign: "center",
                    px: product.size === "large" ? 4.75 : 3.25,
                    mt: product.size === "large" ? 8 : 6,
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: "'Istok_Web-Bold', Montserrat",
                      fontWeight: 700,
                      fontSize: product.size === "large" ? 32 : 24,
                      mb: product.size === "large" ? 2 : 1.5,
                    }}
                  >
                    {product.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "'Satoshi-Medium', Montserrat",
                      fontWeight: 500,
                      color: "rgba(97, 97, 97, 0.75)",
                      fontSize: product.size === "large" ? 20 : 15,
                    }}
                  >
                    {product.description}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Stack>
      </Container>

      <Button
        onClick={handleViewProductsClick}
        variant="contained"
        endIcon={<ArrowForwardIcon />}
        sx={{
          bgcolor: "white",
          color: "#1f164f",
          borderRadius: "10px",
          width: 250,
          height: 55,
          textTransform: "none",
          fontFamily: "'Istok_Web-Bold', Montserrat",
          fontWeight: 700,
          fontSize: 16,
          "&:hover": {
            bgcolor: "white",
          },
        }}
      >
        View All Products
      </Button>
    </Box>
  );
}
