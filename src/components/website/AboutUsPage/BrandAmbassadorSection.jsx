import { Box, Grid, Stack, Typography } from "@mui/material";
import React from "react";

const BrandAmbassadorSection = () => {
  return (
    <Box
      sx={{
        py: 6.25,
        px: { xs: 2, md: 12.5 },
        bgcolor: "background.default",
      }}
    >
      <Stack spacing={6.25}>
        <Typography
          variant="h2"
          color="text.secondary"
          textAlign="center"
          sx={{
            fontFamily: "Jost-Bold, Montserrat",
            fontWeight: 700,
            fontSize: "64px",
            letterSpacing: "-3.84px",
          }}
        >
          OUR BRAND AMBASSADOR
        </Typography>

        <Grid container spacing={8.5} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="AbuBakarTalha.png"
              alt="Brand Ambassador"
              sx={{
                width: "100%",
                maxWidth: 572.51,
                height: "auto",
                maxHeight: 700,
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack spacing={6.4}>
              <Box>
                <Typography
                  variant="h2"
                  color="text.secondary"
                  sx={{
                    fontFamily: "Jost-Bold, Montserrat",
                    fontWeight: 700,
                    fontSize: "64px",
                    letterSpacing: "-3.84px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Abu Bakar Talha
                </Typography>
                <Typography
                  variant="h4"
                  color="text.secondary"
                  sx={{
                    fontFamily: "Satoshi-Medium, Montserrat",
                    fontWeight: 500,
                    fontSize: "32px",
                    letterSpacing: "-1.92px",
                  }}
                >
                  National Tennis Champion, Pakistan
                </Typography>
              </Box>

              <Typography
                variant="body1"
                color="text.primary"
                sx={{
                  fontFamily: "Poppins-Regular, Montserrat",
                  fontSize: "20px",
                }}
              >
                Abu Bakar Talha is one of Pakistan's most accomplished tennis
                players, dominating the junior categories and representing the
                country on international platforms. His dedication and skill
                inspire the next generation of athletes.
              </Typography>

              <Box>
                <Typography
                  variant="h3"
                  color="text.secondary"
                  sx={{
                    fontFamily: "Satoshi-Bold, Montserrat",
                    fontWeight: 700,
                    fontSize: "32px",
                    letterSpacing: "-1.92px",
                    mb: 2,
                  }}
                >
                  Career Highlights
                </Typography>
                <Typography
                  variant="body1"
                  color="text.primary"
                  sx={{
                    fontFamily: "Poppins-Regular, Montserrat",
                    fontSize: "20px",
                  }}
                >
                  🏆 U-10, U-12, U-14, U-16, U-18 National Champion
                  <br />
                  🌍 Pakistan Junior Davis Cup Player
                  <br />
                  🎾 Winner of multiple Asia-ranking tennis championships in the
                  junior category
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
};

export default BrandAmbassadorSection;
