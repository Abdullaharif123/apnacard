import { Box, Container, Typography } from "@mui/material";
import React from "react";
import Slider from "react-slick";

const partnerLogos = [
  // { id: 1, src: "/websiteAssets/1.png", alt: "Partner Logo 1" },
  { id: 2, src: "/websiteAssets/2.png", alt: "Partner Logo 2" },
  {
    id: 3,
    src: "/websiteAssets/3.png",
    alt: "Partner Logo 3",
  },
  {
    id: 4,
    src: "/websiteAssets/4.png",
    alt: "Partner Logo 4",
  },
  {
    id: 5,
    src: "/websiteAssets/5.png",
    alt: "Partner Logo 5",
  },
  {
    id: 6,
    src: "/websiteAssets/6.png",
    alt: "Partner Logo 6",
  },
  {
    id: 7,
    src: "/websiteAssets/7.png",
    alt: "Partner Logo 7",
  },
  {
    id: 8,
    src: "/websiteAssets/8.png",
    alt: "Partner Logo 8",
  },
  {
    id: 9,
    src: "/websiteAssets/9.png",
    alt: "Partner Logo 9",
  },
  {
    id: 10,
    src: "/websiteAssets/10.png",
    alt: "Partner Logo 10",
  },
  {
    id: 11,
    src: "/websiteAssets/11.png",
    alt: "Partner Logo 11",
  },
  {
    id: 12,
    src: "/websiteAssets/12.png",
    alt: "Partner Logo 12",
  },
  {
    id: 13,
    src: "/websiteAssets/13.png",
    alt: "Partner Logo 13",
  },
  {
    id: 14,
    src: "/websiteAssets/14.png",
    alt: "Partner Logo 14",
  },
  {
    id: 15,
    src: "/websiteAssets/15.png",
    alt: "Partner Logo 15",
  },
  {
    id: 16,
    src: "/websiteAssets/16.png",
    alt: "Partner Logo 16",
  },
  {
    id: 17,
    src: "/websiteAssets/17.png",
    alt: "Partner Logo 17",
  },
  {
    id: 18,
    src: "/websiteAssets/18-1.png",
    alt: "Partner Logo 18",
  },
  {
    id: 19,
    src: "/websiteAssets/19-2.png",
    alt: "Partner Logo 19",
  },
  {
    id: 20,
    src: "/websiteAssets/20.jpeg",
    alt: "Partner Logo 20",
  },
  {
    id: 21,
    src: "/websiteAssets/21.png",
    alt: "Partner Logo 21",
  },
  {
    id: 22,
    src: "/websiteAssets/22.png",
    alt: "Partner Logo 22",
  },
];

const PartnersSection = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 900,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 400,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <Box
      sx={{
        bgcolor: "background.dark",
        py: 6.25,
        px: { xs: 2, md: 12.5 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6.25,
      }}
    >
      <Typography
        variant="h2"
        color="text.light"
        sx={{
          fontFamily: "Jost-Bold, Montserrat",
          fontWeight: 700,
          fontSize: "64px",
          letterSpacing: "-5px",
          width: "100%",
          textAlign: "center",
        }}
      >
        OUR PARTNERS
      </Typography>

      <Container maxWidth="lg">
        <Slider {...settings}>
          {partnerLogos.map((logo) => (
            <Box
              key={logo.id}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                px: 2,
              }}
            >
              <Box
                component="img"
                src={logo.src}
                alt={logo.alt}
                sx={{
                  width: 155,
                  height: 143,
                  objectFit: "cover",
                }}
              />
            </Box>
          ))}
        </Slider>
      </Container>
    </Box>
  );
};

export default PartnersSection;
