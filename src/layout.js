import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Box } from "@mui/material";
import { NavBar, Sidebar, Notification, AdminSidebar } from "./components";
import { useSelector } from "react-redux";
import { userRoles } from "./common/constant/index.js";
import theme from "../src/common/theme/theme";

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        {/* Navigation Bar */}
        <NavBarWrapper />

        {/* Sidebar and Main Content */}
        <Box sx={{ display: "flex", flexGrow: 1 }}>
          <SideBarWrapper />

          {/* Main Content Area */}
          <Box sx={{ flexGrow: 1, padding: 2, margin:4 }}>
            <Notification />
            {children}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

const NavBarWrapper = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  return isLoggedIn ? <NavBar /> : null;
};

const SideBarWrapper = () => {
  const { isLoggedIn, role } = useSelector((state) => state.auth);

  if (!isLoggedIn) return null;

  // Check the role and render the appropriate sidebar
  if (role === userRoles.SUPER_ADMIN) {
    return <Sidebar />;
  } else if (role === userRoles.ADMIN) {
    return <AdminSidebar />;
  }

  return null;
};

export default Layout;
