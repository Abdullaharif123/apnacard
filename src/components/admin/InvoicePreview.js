import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Divider,
  Button,
  Paper,
  CircularProgress,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import { getAllServices, getOrganisationName } from "../../api-services/admin";

const InvoicePreview = ({ familyMembers, onConfirm, onCancel }) => {
  const [organisation, setOrganisation] = useState(null);
  const [servicePrice, setServicePrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const invoiceRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orgData = await getOrganisationName();
        if (orgData?.payload?.data) {
          setOrganisation(orgData.payload.data);
        }

        const serviceResponse = await getAllServices("Family Card", 1);
        const services = serviceResponse?.payload?.data?.services;
        if (services?.length > 0) {
          setServicePrice(services[0].price);
        } else {
          console.error("No Family Card service found.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Print Function - Ensures only the invoice is printed
  const handlePrint = () => {
    if (invoiceRef.current) {
      const printWindow = window.open("", "", "width=800,height=600");
      printWindow.document.write(`
        <html>
          <head>
            <title>Invoice</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
              .invoice-container {
                width: 100%;
                max-width: 800px;
                margin: auto;
                padding: 20px;
                border: 1px solid #ddd;
              }
              .invoice-header { display: flex; justify-content: space-between; margin-bottom: 20px; }
              .invoice-title { font-size: 24px; font-weight: bold; }
              .invoice-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
              .invoice-table th, .invoice-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              .invoice-total { font-weight: bold; text-align: right; padding-top: 10px; }
              .print-hidden { display: none; }
            </style>
          </head>
          <body>
            ${invoiceRef.current.innerHTML}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="200px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!organisation) {
    return (
      <Box textAlign="center">
        <Typography color="error">
          Failed to load organization details.
        </Typography>
        <Typography
          onClick={onCancel}
          sx={{
            cursor: "pointer",
            color: "gray",
            textDecoration: "underline",
            mt: 2,
          }}
        >
          Back
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      overflow="auto"
      p={2}
    >
      <Paper
        elevation={3}
        ref={invoiceRef}
        className="invoice-container"
        sx={{
          padding: 4,
          maxWidth: 800,
          width: "100%",
          marginTop: 1,
          border: "1px solid #ddd",
          backgroundColor: "#ffffff",
        }}
      >
        {/* Print Icon at the Top Right */}
        <IconButton
          onClick={handlePrint}
          className="print-hidden"
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            color: "#333",
            "&:hover": { color: "#007bff" },
          }}
        >
          <PrintOutlinedIcon fontSize="large" />
        </IconButton>

        {/* Invoice Header */}
        <Box className="invoice-header">
          <Box>
            <Typography variant="h5" fontWeight="bold">
              {organisation.invoiceTemplate?.organizationName}
            </Typography>
            <Typography>{organisation.invoiceTemplate?.address}</Typography>
            <Typography>
              Phone: {organisation.invoiceTemplate?.phoneNumber}
            </Typography>
          </Box>
          <Box textAlign="right">
            <Typography variant="h6" fontWeight="bold" color="gray">
              INVOICE
            </Typography>

            <Typography variant="h6" fontWeight="bold" color="gray">
              Invoice # [123456]
            </Typography>

            <Typography variant="h6" fontWeight="bold" color="gray">
              Date: {new Date().toLocaleDateString()}
            </Typography>
          </Box>
        </Box>

        {/* Family Members (Description) */}
        <TableContainer>
          <Table className="invoice-table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>FAMILY MEMBERS</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>AMOUNT (PKR)</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {familyMembers.map((member, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {member.name} (Age: {member.age}, Relation:{" "}
                    {member.relation}, Gender: {member.gender})
                  </TableCell>
                  <TableCell align="right">{servicePrice}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell className="invoice-total" fontWeight="bold">
                  TOTAL
                </TableCell>
                <TableCell align="right" className="invoice-total">
                  PKR {servicePrice}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Footer */}
        <Typography sx={{ mt: 3, fontStyle: "italic", textAlign: "center" }}>
          Thank you for your business!
        </Typography>

        <Divider sx={{ mt: 2, mb: 2 }} />

        <Box display="flex" justifyContent="space-between">
          <Button variant="outlined" color="secondary" onClick={onCancel}>
            Back
          </Button>
          <Button variant="contained" color="success" onClick={onConfirm}>
            Confirm & Submit
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default InvoicePreview;
