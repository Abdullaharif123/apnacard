import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          background: "linear-gradient(90deg, #001F54, #9B2ECA)",
          color: "#fff",
          padding: "10px 0",
          "&:hover": {
            background: "linear-gradient(90deg, #001F54, #9B2ECA)",
          },
        },
      },
    },
  },
});

export default theme;
