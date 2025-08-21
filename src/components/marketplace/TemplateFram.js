import * as React from "react";
import PropTypes from "prop-types";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import getMPTheme from "../theme/getMPTheme";

function TemplateFrame({ children }) {
  // Always use light mode
  const mode = "light";
  const MPTheme = createTheme(getMPTheme(mode));

  return (
    <ThemeProvider theme={MPTheme}>
      <Box sx={{ height: "100dvh", display: "flex", flexDirection: "column" }}>
        {/* Content Area */}
        <Box sx={{ flex: "1 1", overflow: "auto" }}>{children}</Box>
      </Box>
    </ThemeProvider>
  );
}

TemplateFrame.propTypes = {
  children: PropTypes.node,
};

export default TemplateFrame;
