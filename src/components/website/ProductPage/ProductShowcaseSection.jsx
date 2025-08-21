import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";

const productCards = [
  {
    id: 1,
    image: "/websiteAssets/LandingPageProductImage.png",
    title: "Personalized Branding",
    desc: "Incorporate company logos, colors, and designs unique to the user or business. Custom designs for specific industries, such as health care, education, or transportation.",
  },
  {
    id: 2,
    image: "/websiteAssets/LandingPageProductImage.png",
    title: "Metal Cards",
    desc: "Golden, Silver, and Black premium Metal Apna Cards enhance your brand's appeal with durability, luxury, and advanced NFC for secure, efficient data sharing.",
  },
  {
    id: 3,
    image: "/websiteAssets/LandingPageProductImage.png",
    title: "Wooden Cards",
    desc: "Wooden Apna Cards blend eco-friendliness, elegance, and NFC technology, offering sustainable functionality with a unique touch.",
  },
  {
    id: 4,
    image: "/websiteAssets/LandingPageProductImage.png",
    title: "Digital Cards",
    desc: "A simple NFC plastic card combines the basic functionality of a plastic card with the advanced technology of Near Field Communication (NFC).",
  },
  {
    id: 5,
    image: "/websiteAssets/LandingPageProductImage.png",
    title: "Premium Metal NFC-Enabled QR Keychain",
    desc: "Sleek, durable, and modern. Share contacts instantly with NFC or via the integrated QR code for effortless networking.",
  },
  {
    id: 6,
    image: "/websiteAssets/LandingPageProductImage.png",
    title: "Handmade Leather (Iphone Cases)",
    desc: "Handmade iPhone cover is a wonderful way to express creativity and produce a unique, personalized accessory. It is a great gift for anyone who loves to stand out.",
  },
];

const ProductShowcaseSection = () => {
  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 6.25,
        px: { xs: 2, md: 12.5 },
        bgcolor: "background.default",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 3.125,
          width: "100%",
          bgcolor: "background.default",
        }}
      >
        <Typography
          variant="h1"
          color="primary"
          sx={{
            fontFamily: "'Jost-Bold', Montserrat",
            fontWeight: 700,
            fontSize: "64px",
            letterSpacing: "-3.84px",
            lineHeight: "50px",
          }}
        >
          OUR PRODUCTS
        </Typography>

        <Typography
          variant="body1"
          color="common.black"
          align="center"
          sx={{
            fontFamily: "'Poppins-Light', Montserrat",
            fontWeight: 300,
            fontSize: "20px",
            letterSpacing: "-0.32px",
            maxWidth: "1240px",
          }}
        >
          Our mission is to empower individuals by providing a secure platform
          to manage personal records and share profiles effortlessly with a
          single tap. We are committed to enhancing connectivity and simplifying
          access to essential information, making everyday interactions seamless
          and efficient.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 10,
          py: 6.25,
          bgcolor: "background.default",
        }}
      >
        <Grid container spacing={10}>
          {productCards.map((card) => (
            <Grid item xs={12} md={6} key={card.id}>
              <Card
                sx={{
                  bgcolor: "primary.main",
                  borderRadius: "10px",
                  height: "646px",
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 3.125,
                    p: 3.125,
                    height: "100%",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={card.image}
                    alt="Product image"
                    sx={{
                      height: "350px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />

                  <Divider
                    sx={{
                      bgcolor: "common.white",
                      height: "3px",
                      width: "100%",
                    }}
                  />

                  <CardContent
                    sx={{
                      p: 0,
                      position: "relative",
                      width: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <Typography
                        variant="h2"
                        color="common.white"
                        sx={{
                          fontFamily: "'Jost-ExtraBold', Montserrat",
                          fontWeight: 800,
                          fontSize: "40px",
                        }}
                      >
                        {card.title}
                      </Typography>
                    </Box>

                    <Typography
                      variant="body2"
                      color="secondary.light"
                      sx={{
                        fontFamily: "'Satoshi-Medium', Montserrat",
                        fontWeight: 500,
                        fontSize: "20px",
                        lineHeight: "20px",
                        mt: 2,
                      }}
                    >
                      {card.desc}
                    </Typography>
                  </CardContent>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ProductShowcaseSection;
