import React from "react";
import { Link } from "react-router-dom";
import RedeemIcon from '@mui/icons-material/Redeem'; // gift/redeem icon

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
  Inventory as InventoryIcon,
  Category as CategoryIcon,
  AdminPanelSettings as AdminPanelSettingsIcon,
  AccountCircle as AccountCircleIcon,
  Healing as HealingIcon,
} from "@mui/icons-material";
import { sideBarPages } from "../common/constant";

const menuItems = [
  {
    name: sideBarPages.DASHBOARD,
    path: "/dashboard",
    icon: <DashboardIcon />,
  },
  {
    name: sideBarPages.USERS,
    path: "/users",
    icon: <GroupIcon />,
  },
  {
    name: sideBarPages.ORGANISATIONS,
    path: "/organisations",
    icon: <InventoryIcon />,
  },
  {
    name: sideBarPages.CATEGORIES,
    path: "/categories",
    icon: <CategoryIcon />,
  },
  {
    name: sideBarPages.ADMINS,
    path: "/admins",
    icon: <AdminPanelSettingsIcon />,
  },
  {
    name: sideBarPages.PROFILE,
    path: "/profile",
    icon: <AccountCircleIcon />,
  },
  {
    name: sideBarPages.MEDICINES,
    path: "/medicines",
    icon: <HealingIcon />,
  },
  {
    name: "Generate Promo Codes",
    path: "/super-admin/generate-promo-codes",
    icon: <RedeemIcon />,
  },
  {
    name: "Assign Promo Code",
    path: "/assign-promo-code",
    icon: <RedeemIcon />,
  }

];

const SideBar = () => (
  <Box sx={{ display: "flex" }}>
    <CssBaseline />
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
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

export default SideBar;
