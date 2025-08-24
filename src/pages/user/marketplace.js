import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import AppAppBar from "../../components/marketplace/AppAppBar";
import Hero from "../../components/marketplace/Hero";
import Highlights from "../../components/marketplace/Highlights";
import Features from "../../components/marketplace/Features";
import FAQ from "../../components/marketplace/FAQ";
import Footer from "../../components/marketplace/Footer";
import getMPTheme from "../../components/theme/getMPTheme";
import TemplateFrame from "../../components/marketplace/TemplateFram";
import ApnaCardInfo from "../../components/marketplace/ApnaCardInfo";
import { useSelector } from "react-redux";
export default function MarketingPage() {
  const [mode, setMode] = React.useState("light");
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const MPTheme = createTheme(getMPTheme(mode));
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); // Access Redux state
  const defaultTheme = createTheme({ palette: { mode } });

  // This code only runs on the client side, to determine the system color preference
  React.useEffect(() => {
    // Check if there is a preferred mode in localStorage
    const savedMode = localStorage.getItem("themeMode");
    if (savedMode) {
      setMode(savedMode);
    } else {
      // Force the mode to "light" no matter what
      setMode("light");
    }
  }, []);
  const toggleColorMode = () => {
    const newMode = mode === "dark" ? "light" : "dark";
    setMode(newMode);
    localStorage.setItem("themeMode", newMode); // Save the selected mode to localStorage
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  return (
    <TemplateFrame
      toggleCustomTheme={toggleCustomTheme}
      showCustomTheme={showCustomTheme}
      mode={mode}
      toggleColorMode={toggleColorMode}
    >
      <ThemeProvider theme={showCustomTheme ? MPTheme : defaultTheme}>
        <CssBaseline enableColorScheme />
        {/* <AppAppBar /> */}
        {!isLoggedIn && <AppAppBar />} {/* Conditionally render AppAppBar */}
        <Hero />
        <div>
          <Divider />
          <ApnaCardInfo />
          {/* <LogoCollection />
          <Divider /> */}
          <Features />
          <Highlights />
          {/* <Divider /> */}
          {/* <Pricing /> */}
          <Divider />
          <FAQ />
          <Divider />
          <Footer />
        </div>
        {/* <div style={{ position: "fixed", bottom: 20, right: 20 }}>
          <Button
            variant="contained"
            color="success"
            startIcon={<WhatsAppIcon />}
            href="https://wa.me/923354537279?text=Hello!%20I%20want%20to%20place%20an%20order."
            target="_blank"
            style={{ backgroundColor: "#25D366", color: "#fff" }}
          >
            Place Your Orders!
          </Button>
        </div> */}
      </ThemeProvider>
    </TemplateFrame>
  );
}
