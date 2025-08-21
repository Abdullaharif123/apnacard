import React from "react";
import { Box, Container, Typography, Button, Grid } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CallIcon from "@mui/icons-material/Call";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { generateWhatsAppUrl } from "../utils/common";

const CustomButton = ({ text, sx, onClick }) => (
  <Grid item xs={12} sm={6}>
    <Button
      variant="contained"
      sx={{
        background: "#fff",
        fontWeight: "bold",
        color: "black",
        width: "250px",
        padding: "10px 0",
        borderRadius: "50px",
        "&:hover": {
          background: "linear-gradient(180deg, #070808,#221859, #77296E)",
          color: "white",
        },
        ...sx,
      }}
      onClick={onClick}
    >
      {text}
    </Button>
  </Grid>
);

const OrderMedicine = () => {
  // Generate WhatsApp URL with predefined message
  const whatsappUrl = generateWhatsAppUrl(
    "923217564880",
    "Hey, I want to order medicines."
  );
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundImage: "url('/Screenshot 2024-11-25 185111.png')", // Local image in the public folder
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: { xs: "250px", sm: "300px", md: "350px" },
          borderRadius: 2,
          p: 3,
          color: "#ffffff",
          textShadow: "1px 1px 8px rgba(0, 0, 0, 0.6)",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            mb: 1,
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
          }}
        >
          Order Medicines Online
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mb: 3,
            fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" },
            lineHeight: 1.5,
          }}
        >
          Upload your prescription and get medicines at the cheapest rate.
        </Typography>

        <CustomButton
          text="Order Now"
          sx={{ marginTop: 2 }}
          onClick={() => window.open(whatsappUrl, "_blank")}
        />
      </Box>

      {/* Steps Section */}
      <Box>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            mb: 4,
            color: "#333333",
            fontSize: { xs: "1.2rem", sm: "1.4rem", md: "1.6rem" },
          }}
        >
          How you can order medicines online?
        </Typography>
        <Grid container spacing={4}>
          {/* Step 1 */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <AssignmentIcon
                sx={{
                  fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                  color: "#007bff",
                  mb: 1.5,
                  textShadow: "1px 1px 6px rgba(0, 123, 255, 0.4)",
                }}
              />
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "bold",
                  mb: 0.5,
                  fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                  color: "#444444",
                }}
              >
                Fill Form
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.9rem" },
                  color: "#666666",
                }}
              >
                Fill form, add Medicine / Prescription, send order request.
              </Typography>
            </Box>
          </Grid>
          {/* Step 2 */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <CallIcon
                sx={{
                  fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                  color: "#28a745",
                  mb: 1.5,
                  textShadow: "1px 1px 6px rgba(40, 167, 69, 0.4)",
                }}
              />
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "bold",
                  mb: 0.5,
                  fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                  color: "#444444",
                }}
              >
                Confirm Order
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.9rem" },
                  color: "#666666",
                }}
              >
                You will receive an order confirmation call. After confirmation,
                order will be dispatched.
              </Typography>
            </Box>
          </Grid>
          {/* Step 3 */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <LocalShippingIcon
                sx={{
                  fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                  color: "#ff8800",
                  mb: 1.5,
                  textShadow: "1px 1px 6px rgba(255, 136, 0, 0.4)",
                }}
              />
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "bold",
                  mb: 0.5,
                  fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                  color: "#444444",
                }}
              >
                Receive Order
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.9rem" },
                  color: "#666666",
                }}
              >
                Once your order is dispatched, you will receive your medicines
                within 24 hours.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default OrderMedicine;
