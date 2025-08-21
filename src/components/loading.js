import React from "react";
import { CircularProgress, Box } from "@mui/material";

const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed", // Ensures it covers the whole viewport
        top: 0,
        left: 0,
        width: "100vw", // Full width of the viewport
        height: "100vh", // Full height of the viewport
        // backgroundColor: "rgba(255, 255, 255, 0.8)", // Optional: a subtle overlay effect
        zIndex: 9999, // Ensures it appears on top of other content
      }}
    >
      <CircularProgress sx={{ color: "#9B2ECA" }} />{" "}
    </Box>
  );
};

export default Loading;
