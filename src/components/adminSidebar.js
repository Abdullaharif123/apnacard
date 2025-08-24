import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CssBaseline,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Group as GroupIcon,
  Category as CategoryIcon,
  AccountTree as AccountTreeIcon,
  AccountCircle as AccountCircleIcon,
  AccountBalanceWallet as AccountBalanceWalletIcon,
  Description as DescriptionIcon,
} from "@mui/icons-material";
import { sideBarPages } from "../common/constant";

const menuItems = [
  { name: sideBarPages.DASHBOARD, path: "/dashboard", icon: <DashboardIcon /> },
  { name: sideBarPages.USERS, path: "/users", icon: <GroupIcon /> },
  {
    name: sideBarPages.CATEGORIES,
    path: "/categories",
    icon: <CategoryIcon />,
  },
  { name: sideBarPages.SERVICES, path: "/services", icon: <AccountTreeIcon /> },
  { name: sideBarPages.PROFILE, path: "/profile", icon: <AccountCircleIcon /> },
  {
    name: sideBarPages.WALLET,
    path: "/walletDetails",
    icon: <AccountBalanceWalletIcon />,
  },
  {
    name: sideBarPages.INVOICETEMPLATE,
    path: "/invoiceTemplate",
    icon: <DescriptionIcon />,
  },
];

const AdminSidebar = () => (
  <Box sx={{ display: "flex" }}>
    <CssBaseline />
    <Drawer
      sx={{
        width: 280,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 280,
          boxSizing: "border-box",
          background: "linear-gradient(90deg, #20164F, #20164F)",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <List>
        {menuItems.map(({ name, path, icon }, index) => (
          <ListItem button key={index} sx={{ color: "aliceblue" }}>
            <ListItemIcon sx={{ color: "inherit" }}>{icon}</ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="h6" sx={{ cursor: "pointer" }}>
                  <Link
                    to={path}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    {name}
                  </Link>
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  </Box>
);

export default AdminSidebar;
