import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import NfcRoundedIcon from "@mui/icons-material/NfcRounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import StyleRoundedIcon from "@mui/icons-material/StyleRounded";
import BrushRoundedIcon from "@mui/icons-material/BrushRounded";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import SpaRoundedIcon from "@mui/icons-material/SpaRounded";

const items = [
  {
    icon: <BrushRoundedIcon />,
    title: "Personalized Branding",
    description:
      "Incorporate company logos, colors, and designs unique to the user or business. Custom designs for specific industries, such as health care, education, or transportation.",
  },
  {
    icon: <CreditCardRoundedIcon />,
    title: "Metal Cards",
    description:
      "Golden, Silver, and Black premium Metal Apna Cards enhance your brand's appeal with durability, luxury, and advanced NFC for secure, efficient data sharing.",
  },
  {
    icon: <SpaRoundedIcon />,
    title: "Wooden Cards",
    description:
      "Wooden Apna Cards blend eco-friendliness, elegance, and NFC technology, offering sustainable functionality with a unique touch.",
  },
  {
    icon: <NfcRoundedIcon />,
    title: "Digital Cards",
    description:
      "A simple NFC plastic card combines the basic functionality of a plastic card with the advanced technology of Near Field Communication (NFC).",
  },
  {
    icon: <KeyRoundedIcon />,
    title: "Premium Metal NFC-Enabled QR Keychain",
    description:
      "Sleek, durable, and modern. Share contacts instantly with NFC or via the integrated QR code for effortless networking.",
  },
  {
    icon: <StyleRoundedIcon />,
    title: "Handmade Leather (Iphone Cases)",
    description:
      "Handmade iPhone cover is a wonderful way to express creativity and produce a unique, personalized accessory.",
  },
];

export default function Highlights() {
  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: "white",
        bgcolor: "grey.900",
      }}
    >
      <Container
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: "100%", md: "60%" },
            textAlign: { sm: "left", md: "center" },
          }}
        >
          <Typography component="h2" variant="h4" gutterBottom>
            Highlights
          </Typography>
          <Typography variant="body1" sx={{ color: "grey.400" }}>
            Discover premium solutions crafted for style, innovation, and
            functionality. From eco-friendly wooden cards to luxurious metal
            designs and cutting-edge NFC-enabled accessories, each product
            blends technology with personalized branding to elevate your
            experience.
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {items.map((item, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Stack
                direction="column"
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  color: "inherit",
                  p: 3,
                  height: "100%",
                  borderColor: "hsla(220, 25%, 25%, 0.3)",
                  backgroundColor: "grey.800",
                }}
              >
                <Box sx={{ opacity: "50%" }}>{item.icon}</Box>
                <div>
                  <Typography gutterBottom sx={{ fontWeight: "medium" }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "grey.400" }}>
                    {item.description}
                  </Typography>
                </div>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
