import {
    CssBaseline,
    ThemeProvider as MuiThemeProvider,
    createTheme,
  } from "@mui/material";
  import React from "react";
  
  const appTheme = createTheme({
    palette: {
      primary: {
        main: "#1f164f", // Dark blue from the UI
        light: "#201756", // Slightly lighter blue used in navigation
        dark: "#122f46",
      },
      secondary: {
        main: "#f8f7f3", // Light beige/cream color used in mission section
      },
      background: {
        default: "#ffffff",
        paper: "#ffffff",
        dark: "#1f164f",
      },
      text: {
        primary: "#000000",
        secondary: "#1f164f",
        light: "#ffffff",
        gray: "#a7a7a7",
        lightGray: "#b3b3b3",
      },
      action: {
        active: "#ffffff",
        hover: "#201756",
      },
      error: {
        main: "#dc1b24",
      },
    },
    typography: {
      fontFamily: [
        "Poppins",
        "Jost",
        "Satoshi",
        "Istok Web",
        "Helvetica",
        "Montserrat",
        "Arial",
        "sans-serif",
      ].join(","),
      h1: {
        fontFamily: "Jost-Bold, Montserrat",
        fontWeight: 700,
        fontSize: "128px",
        letterSpacing: "-7.68px",
        lineHeight: "normal",
      },
      h2: {
        fontFamily: "Jost-Bold, Montserrat",
        fontWeight: 700,
        fontSize: "64px",
        letterSpacing: "-3.84px",
        lineHeight: "normal",
      },
      h3: {
        fontFamily: "Satoshi-Bold, Montserrat",
        fontWeight: 700,
        fontSize: "32px",
        letterSpacing: "-1.92px",
        lineHeight: "normal",
      },
      h4: {
        fontFamily: "Satoshi-Medium, Montserrat",
        fontWeight: 500,
        fontSize: "32px",
        letterSpacing: "-1.92px",
        lineHeight: "normal",
      },
      h5: {
        fontFamily: "Istok_Web-Bold, Montserrat",
        fontWeight: 700,
        fontSize: "24px",
        letterSpacing: "0",
        lineHeight: "normal",
      },
      h6: {
        fontFamily: "Istok_Web-Bold, Montserrat",
        fontWeight: 700,
        fontSize: "20px",
        letterSpacing: "-0.32px",
        lineHeight: "normal",
      },
      subtitle1: {
        fontFamily: "Satoshi-Medium, Montserrat",
        fontWeight: 500,
        fontSize: "20px",
        letterSpacing: "-0.32px",
        lineHeight: "normal",
      },
      subtitle2: {
        fontFamily: "Satoshi-Medium, Montserrat",
        fontWeight: 500,
        fontSize: "16px",
        letterSpacing: "0",
        lineHeight: "normal",
      },
      body1: {
        fontFamily: "Poppins-Regular, Montserrat",
        fontWeight: 400,
        fontSize: "16px",
        letterSpacing: "0",
        lineHeight: "normal",
      },
      body2: {
        fontFamily: "Poppins-Light, Montserrat",
        fontWeight: 300,
        fontSize: "16px",
        letterSpacing: "-0.32px",
        lineHeight: "normal",
      },
      button: {
        fontFamily: "Istok_Web-Bold, Montserrat",
        fontWeight: 700,
        fontSize: "16px",
        letterSpacing: "-0.64px",
        lineHeight: "normal",
        textTransform: "none",
      },
      caption: {
        fontFamily: "Poppins-Regular, Montserrat",
        fontWeight: 400,
        fontSize: "14px",
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
              backgroundColor: "#f8f7f3",
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: "5px",
              borderColor: "#1f164f",
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
            ...theme.typography.subtitle1,
            color: theme.palette.text.secondary,
          }),
          body: ({ theme }) => ({
            ...theme.typography.body1,
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
  