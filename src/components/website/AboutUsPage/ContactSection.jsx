import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import React from "react";

const ContactSection = () => {
  // Form field data for mapping
  const formFields = [
    {
      id: "name",
      placeholder: "Enter Your Name..",
      type: "text",
      multiline: false,
    },
    {
      id: "email",
      placeholder: "Enter Your Email..",
      type: "email",
      multiline: false,
    },
    {
      id: "phone",
      placeholder: "Enter Your Phone Number..",
      type: "tel",
      multiline: false,
    },
    {
      id: "message",
      placeholder: "Your Message..",
      type: "text",
      multiline: true,
      rows: 8,
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "50px",
        px: "100px",
        py: "50px",
        bgcolor: "background.paper",
      }}
    >
      <Box>
        <Typography
          variant="h2"
          color="primary"
          align="center"
          sx={{
            fontFamily: "Jost-Bold, Montserrat",
            fontWeight: 700,
            fontSize: "64px",
          }}
        >
          LET&apos;S TALK
        </Typography>
        <Typography
          variant="h4"
          color="primary"
          align="center"
          sx={{
            fontFamily: "Satoshi-Medium, Montserrat",
            fontWeight: 500,
            fontSize: "32px",
            mt: 2,
          }}
        >
          Leave us your info and we will get back to you.
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="space-between">
        <Grid item xs={12} md={6}>
          <Stack spacing={2.5}>
            {formFields.map((field) => (
              <TextField
                key={field.id}
                id={field.id}
                type={field.type}
                placeholder={field.placeholder}
                multiline={field.multiline}
                rows={field.rows}
                fullWidth
                InputProps={{
                  sx: {
                    height: field.multiline ? "250px" : "100px",
                    borderRadius: "5px",
                    border: "1px solid",
                    borderColor: "primary.main",
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                    "& input, & textarea": {
                      fontFamily: "Poppins-Regular, Montserrat",
                      fontSize: "20px",
                      color: "text.gray",
                      paddingLeft: "20px",
                    },
                    "& textarea": {
                      paddingTop: "34px",
                    },
                  },
                }}
                variant="outlined"
              />
            ))}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                height: "100px",
                borderRadius: "5px",
                fontFamily: "Poppins-SemiBold, Montserrat",
                fontWeight: 600,
                fontSize: "24px",
              }}
            >
              Submit
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src="websiteAssets/WorldMap.png" // Replace with the actual image path
            alt="World map"
            sx={{
              width: "100%",
              height: "730px",
              objectFit: "absolute",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactSection;
