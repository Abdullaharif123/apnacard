import React, { useState, useEffect } from "react";
import { getDashboardDetails } from "../../api-services/superAdmin";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Grid,
  Paper,
  Typography,
  LinearProgress,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState({
    activeUsers: 0,
    org: 0, // Rows per page
    cat: 0,
    cards: 0,
  });

  const getDashboard = async () => {
    try {
      const response = await getDashboardDetails();
      const { activeUserCount, orgCount, loggedInUser, catCount, cardCount } =
        response.payload.data;

      setDashboard({
        activeUsers: activeUserCount,
        org: orgCount,
        user: loggedInUser,
        cat: catCount,
        cards: cardCount,
      });
    } catch (err) {
      console.error("Error fetching Organisations:", err);
    }
  };

  useEffect(() => {
    getDashboard();
  }, []);

  // Sample data for demonstration
  const overviewData = [
    { title: "Users", value: dashboard.activeUsers, change: "+235%" },
    { title: "Organisations", value: dashboard.org, change: "-25%" },
    { title: "Categories", value: dashboard.cat, change: "+35%" },
    { title: "ActiveCards", value: dashboard.cards, change: "+33%" },
  ];

  const sessionData = [
    { date: "2024-09-01", sessions: 500 },
    { date: "2024-09-02", sessions: 600 },
    { date: "2024-09-03", sessions: 800 },
    { date: "2024-09-04", sessions: 700 },
    { date: "2024-09-05", sessions: 900 },
    { date: "2024-09-06", sessions: 1100 },
    { date: "2024-09-07", sessions: 1000 },
    { date: "2024-09-08", sessions: 1200 },
    { date: "2024-09-09", sessions: 1500 },
    { date: "2024-09-10", sessions: 1400 },
    { date: "2024-09-11", sessions: 1600 },
    { date: "2024-09-12", sessions: 1700 },
    { date: "2024-09-13", sessions: 1800 },
    { date: "2024-09-14", sessions: 1900 },
    { date: "2024-09-15", sessions: 2100 },
  ];

  const pageViewsData = [
    { month: "Jan", views: 10000 },
    { month: "Feb", views: 12000 },
    { month: "Mar", views: 15000 },
    { month: "Apr", views: 18000 },
    { month: "May", views: 20000 },
    { month: "Jun", views: 19000 },
    { month: "Jul", views: 21000 },
  ];

  const detailsData = [
    {
      title: "Homepage Overview",
      status: "Online",
      users: 212423,
      eventCount: 8345,
      viewsPerUser: 18.5,
      averageTime: "2m 15s",
      dailyConversions: 15,
    },
    {
      title: "Product Details - Gadgets",
      status: "Online",
      users: 177240,
      eventCount: 5663,
      viewsPerUser: 9.7,
      averageTime: "2m 30s",
      dailyConversions: 8,
    },
    {
      title: "Checkout Process - Step 1",
      status: "Online",
      users: 58240,
      eventCount: 1652,
      viewsPerUser: 15.2,
      averageTime: "2m 5s",
      dailyConversions: 10,
    },
    // Add more rows as needed
  ];

  return (
    <Box sx={{ padding: 2, marginTop: "4%" }}>
      <Typography variant="h4" gutterBottom>
        Welcome, SuperAdministrator
        {/* {dashboard?.user?.firstName && dashboard?.user?.lastName
          ? `${dashboard.user.firstName} ${dashboard.user.lastName}`
          : null} */}
      </Typography>

      <Grid container spacing={2}>
        {/* Overview Section */}
        {overviewData.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.title}>
            <Paper elevation={3} sx={{ padding: 2, textAlign: "center" }}>
              <Typography variant="h5">{item.value}</Typography>
              <Typography variant="body2">{item.title}</Typography>
              <Typography
                variant="body2"
                color={item.change.includes("-") ? "error" : "success"}
              >
                {item.change}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={Math.abs(parseInt(item.change))}
              />
            </Paper>
          </Grid>
        ))}

        {/* Sessions Graph */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">Sessions Over Time</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={sessionData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sessions" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Page Views and Downloads */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">Page Views and Downloads</Typography>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6">Sessions over Time</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={pageViewsData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="views" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Paper>
        </Grid>

        {/* Details Section */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">Details</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Page Title</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Users</TableCell>
                    <TableCell>Event Count</TableCell>
                    <TableCell>Views per User</TableCell>
                    <TableCell>Average Time</TableCell>
                    <TableCell>Daily Conversions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {detailsData.map((row) => (
                    <TableRow key={row.title}>
                      <TableCell>{row.title}</TableCell>
                      <TableCell>{row.status}</TableCell>
                      <TableCell>{row.users}</TableCell>
                      <TableCell>{row.eventCount}</TableCell>
                      <TableCell>{row.viewsPerUser}</TableCell>
                      <TableCell>{row.averageTime}</TableCell>
                      <TableCell>{row.dailyConversions}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
