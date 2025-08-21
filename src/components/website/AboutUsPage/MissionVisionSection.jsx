import { Box, Container, Typography } from "@mui/material";
import React from "react";

const MissionVisionSection = () => {
  return (
    <Box>
      <Box sx={{ bgcolor: "background.dark" }}>
        <Container maxWidth="lg" sx={{ py: 3 }}>
          <Typography
            variant="h2"
            component="h2"
            align="center"
            color="text.light"
            sx={{
              fontFamily: "Jost-Bold, Montserrat",
              fontWeight: 700,
              fontSize: "64px",
              letterSpacing: "-5px",
              mt: 3,
            }}
          >
            OUR VISION
          </Typography>

          <Typography
            variant="body2"
            align="center"
            color="text.light"
            sx={{
              fontFamily: "Poppins-Light, Montserrat",
              fontSize: "20px",
              letterSpacing: "-0.32px",
              mt: 4,
              mb: 3,
            }}
          >
            Our vision at Apna Card is to revolutionize the way individuals
            manage their personal information and connect with others. We aim to
            create a world where seamless access to personal records and
            effortless sharing empower individuals to take control of their
            health and relationships, fostering a more connected and informed
            society.
          </Typography>
        </Container>
      </Box>

      <Box sx={{ bgcolor: "secondary.main" }}>
        <Container maxWidth="lg" sx={{ py: 3 }}>
          <Typography
            variant="h2"
            component="h2"
            align="center"
            color="text.secondary"
            sx={{
              fontFamily: "Jost-Bold, Montserrat",
              fontWeight: 700,
              fontSize: "64px",
              letterSpacing: "-5px",
              mt: 3,
            }}
          >
            OUR MISSION
          </Typography>

          <Typography
            variant="body2"
            align="center"
            color="text.primary"
            sx={{
              fontFamily: "Poppins-Light, Montserrat",
              fontSize: "20px",
              letterSpacing: "-0.32px",
              mt: 4,
              mb: 3,
            }}
          >
            Our mission is to empower individuals by providing a secure platform
            to manage personal records and share profiles effortlessly with a
            single tap. We are committed to enhancing connectivity and
            simplifying access to essential information, making everyday
            interactions seamless and efficient.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default MissionVisionSection;
