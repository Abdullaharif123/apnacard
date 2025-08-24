import React from "react";
import {
  Container,
  Typography,
  Paper,
  Divider,
  Box,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  Avatar,
  Stack,
  ListItemAvatar,
} from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ReceiptIcon from "@mui/icons-material/Receipt";

const WalletDetailsPage = () => {
  // Dummy data for wallet and transaction history
  const walletData = {
    balance: "1,250.00",
    lastUpdated: "December 8, 2024",
  };

  const transactionHistory = [
    { id: 1, amount: "200.00", date: "December 5, 2024", status: "Completed" },
    {
      id: 2,
      amount: "500.00",
      date: "November 30, 2024",
      status: "Completed",
    },
    { id: 3, amount: "100.00", date: "November 25, 2024", status: "Refunded" },
    {
      id: 4,
      amount: "300.00",
      date: "November 20, 2024",
      status: "Completed",
    },
  ];

  return (
    <Container
      maxWidth="lg"
      sx={{
        padding: 4,
        backgroundColor: "#F9FAFC",
        marginTop: "10vh",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          padding: 4,
          borderRadius: 2,
        }}
      >
        {/* Wallet Info */}
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            marginBottom: 3,
            color: "#001F54",
          }}
        >
          Wallet Details
        </Typography>
        <Card
          sx={{
            background: "linear-gradient(90deg, #001F54, #9B2ECA)",
            color: "#fff",
            borderRadius: 2,
            padding: 2,
            marginBottom: 3,
          }}
        >
          <CardContent>
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{ justifyContent: "space-between" }}
            >
              <Avatar
                sx={{
                  backgroundColor: "#fff",
                  color: "#001F54",
                  width: 56,
                  height: 56,
                }}
              >
                <AccountBalanceWalletIcon fontSize="large" />
              </Avatar>
              <Box sx={{ textAlign: "right" }}>
                <Typography variant="h5" fontWeight="bold">
                  {walletData.balance}
                </Typography>
                <Typography variant="body2">
                  Last Updated: {walletData.lastUpdated}
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* Divider Above Transaction History */}
        <Divider sx={{ marginY: 3 }} />

        {/* Transaction History */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "#001F54",
            marginBottom: 2,
          }}
        >
          Transaction History
        </Typography>
        <List sx={{ width: "100%", backgroundColor: "#fff", borderRadius: 2 }}>
          {transactionHistory.map((transaction, index) => (
            <Box key={transaction.id}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      backgroundColor:
                        transaction.status === "Refunded"
                          ? "#FFC107"
                          : "#4CAF50",
                      color: "#fff",
                    }}
                  >
                    <ReceiptIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`Amount: ${transaction.amount}`}
                  secondary={`Date: ${transaction.date} | Status: ${transaction.status}`}
                />
              </ListItem>
              {index < transactionHistory.length - 1 && <Divider />}
            </Box>
          ))}
        </List>

        {/* Divider Above Additional Section */}
        <Divider sx={{ marginY: 3 }} />

        {/* Additional Section */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "#001F54",
            marginBottom: 2,
          }}
        >
          Additional Information
        </Typography>
        <Box
          sx={{
            padding: 2,
            borderRadius: 2,
            backgroundColor: "#F0F4F8",
          }}
        >
          <Typography variant="body1" sx={{ color: "#555" }}>
            Here you can add any additional information or functionality, such
            as payment methods, recent activity, or other relevant details.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default WalletDetailsPage;
