import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { styled } from "@mui/material/styles";

// const StyledBox = styled("div")(({ theme }) => ({
//   alignSelf: "center",
//   width: "100%",
//   height: 400,
//   marginTop: theme.spacing(8),
//   borderRadius: theme.shape.borderRadius,
//   outline: "6px solid",
//   outlineColor: "hsla(220, 25%, 80%, 0.2)",
//   border: "1px solid",
//   borderColor: theme.palette.grey[200],
//   boxShadow: "0 0 12px 8px hsla(220, 25%, 80%, 0.2)",
//   backgroundImage: `url(${"/static/screenshots/material-ui/getting-started/templates/dashboard.jpg"})`,
//   backgroundSize: "cover",
//   [theme.breakpoints.up("sm")]: {
//     marginTop: theme.spacing(10),
//     height: 700,
//   },
//   ...theme.applyStyles("dark", {
//     boxShadow: "0 0 24px 12px hsla(210, 100%, 25%, 0.2)",
//     backgroundImage: `url(${"/static/screenshots/material-ui/getting-started/templates/dashboard-dark.jpg"})`,
//     outlineColor: "hsla(220, 20%, 42%, 0.1)",
//     borderColor: theme.palette.grey[700],
//   }),
// }));

export default function Hero() {
  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: "100%",
        backgroundRepeat: "no-repeat",
        backgroundImage:
          "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)",
        ...theme.applyStyles("dark", {
          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)",
        }),
      })}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack
          spacing={2}
          useFlexGap
          sx={{ alignItems: "center", width: { xs: "100%", sm: "70%" } }}
        >
          <Typography
            variant="h1"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              fontSize: "clamp(3rem, 10vw, 3.5rem)",
            }}
          >
            Our&nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={(theme) => ({
                fontSize: "inherit",
                color: "primary.main",
                ...theme.applyStyles("dark", {
                  color: "primary.light",
                }),
              })}
            >
              Mission
            </Typography>
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              color: "text.secondary",
              width: { sm: "100%", md: "80%" },
            }}
          >
            Our mission is to empower individuals by providing a secure platform
            to manage personal records and share profiles effortlessly with a
            single tap. We are committed to enhancing connectivity and
            simplifying access to essential information, making everyday
            interactions seamless and efficient.
          </Typography>

          <Typography
            variant="h1"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              fontSize: "clamp(3rem, 10vw, 3.5rem)",
              color: "primary.main",
            }}
          >
            Vision&nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={(theme) => ({
                fontSize: "inherit",
                color: "black",
                ...theme.applyStyles("dark", {
                  color: "primary.light",
                }),
              })}
            >
              Statement
            </Typography>
          </Typography>

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ textAlign: "center" }}
          >
            Our vision at Apna Card is to revolutionize the way individuals
            manage their personal information and connect with others. We aim to
            create a world where seamless access to personal records and
            effortless sharing empower individuals to take control of their
            health and relationships, fostering a more connected and informed
            society.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
