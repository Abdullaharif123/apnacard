import {
    CssBaseline,
    ThemeProvider as MuiThemeProvider,
    createTheme,
  } from "@mui/material";
  import React from "react";
  
  const appTheme = createTheme({
    palette: {
      primary: {
        main: "#1f164f", // Dark blue from the design
      },
      secondary: {
        main: "#ffffff", // White color used in buttons on dark background
      },
      error: {
        main: "#ff0000", // Standard error color
      },
      background: {
        default: "#ffffff",
        paper: "#ffffff",
      },
      text: {
        primary: "#000000",
        secondary: "#616161bf", // Used in product descriptions
        disabled: "#b3b3b3", // Light gray text in footer
      },
      action: {
        active: "#1f164f",
        hover: "#201756", // Slightly darker blue for hover states
      },
      common: {
        white: "#ffffff",
        black: "#000000",
      },
      // Custom colors
      darkBlue: {
        main: "#1f164f",
        dark: "#201756",
        light: "#1f164f40", // Used for overlay
      },
      gray: {
        main: "#909090", // Border color
        light: "#b3b3b3", // Footer text
        dark: "#616161bf", // Product description text
      },
    },
    typography: {
      fontFamily: [
        "Jost",
        "Satoshi",
        "Poppins",
        "Istok Web",
        "Open Sans",
        "sans-serif",
      ].join(","),
      h1: {
        fontFamily: "Jost-Bold, Montserrat",
        fontSize: "128px",
        fontWeight: 700,
        letterSpacing: "-7.68px",
        lineHeight: "normal",
      },
      h2: {
        fontFamily: "Jost-Bold, Montserrat",
        fontSize: "64px",
        fontWeight: 700,
        letterSpacing: "-5.00px",
        lineHeight: "normal",
      },
      h3: {
        fontFamily: "Jost-Bold, Montserrat",
        fontSize: "44px",
        fontWeight: 700,
        lineHeight: "normal",
      },
      h4: {
        fontFamily: "Istok_Web-Bold, Montserrat",
        fontSize: "32px",
        fontWeight: 700,
        lineHeight: "normal",
      },
      h5: {
        fontFamily: "Istok_Web-Bold, Montserrat",
        fontSize: "24px",
        fontWeight: 700,
        lineHeight: "normal",
      },
      h6: {
        fontFamily: "Istok_Web-Bold, Montserrat",
        fontSize: "20px",
        fontWeight: 700,
        lineHeight: "normal",
      },
      subtitle1: {
        fontFamily: "Satoshi-Medium, Montserrat",
        fontSize: "20px",
        fontWeight: 500,
        letterSpacing: "-1.00px",
        lineHeight: "normal",
      },
      subtitle2: {
        fontFamily: "Open_Sans-Medium, Montserrat",
        fontSize: "24px",
        fontWeight: 500,
        letterSpacing: "-0.32px",
        lineHeight: "normal",
      },
      body1: {
        fontFamily: "Poppins-Regular, Montserrat",
        fontSize: "16px",
        fontWeight: 400,
        lineHeight: "normal",
      },
      body2: {
        fontFamily: "Satoshi-Medium, Montserrat",
        fontSize: "15px",
        fontWeight: 500,
        lineHeight: "normal",
      },
      button: {
        fontFamily: "Istok_Web-Bold, Montserrat",
        fontSize: "16px",
        fontWeight: 700,
        textTransform: "none",
        letterSpacing: "0",
        lineHeight: "normal",
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: "10px",
            padding: "16px 24px",
          },
          containedPrimary: {
            backgroundColor: "#1f164f",
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "#201756",
            },
          },
          containedSecondary: {
            backgroundColor: "#ffffff",
            color: "#1f164f",
            "&:hover": {
              backgroundColor: "#f5f5f5",
            },
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: ({ theme }) => ({
            ...theme.typography.body1,
          }),
          head: ({ theme }) => ({
            ...theme.typography.subtitle2,
            fontWeight: 700,
          }),
        },
      },
      MuiListItemText: {
        styleOverrides: {
          primary: ({ theme }) => ({
            ...theme.typography.subtitle1,
          }),
          secondary: ({ theme }) => ({
            ...theme.typography.body1,
            color: theme.palette.text.secondary,
          }),
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: "#ffffff",
            margin: 0,
            padding: 0,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: "25px",
            boxShadow: "2px 2px 4px 5px #d9d9d959",
          },
        },
      },
      MuiAccordion: {
        styleOverrides: {
          root: {
            border: "1px solid #909090",
            borderRadius: "15px",
            "&:before": {
              display: "none",
            },
          },
        },
      },
      MuiAccordionSummary: {
        styleOverrides: {
          root: ({ theme }) => ({
            ...theme.typography.subtitle2,
          }),
        },
      },
    },
  });
  
  export const ThemeProvider = ({ children }) => {
    return (
      <MuiThemeProvider theme={appTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    );
  };
  