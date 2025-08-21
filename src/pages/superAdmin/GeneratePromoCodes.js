import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Snackbar,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Stack,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const GeneratePromoCodes = () => {
  const navigate = useNavigate();

  const [organizations, setOrganizations] = useState([]);
  const [selectedOrgId, setSelectedOrgId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [generatedCodes, setGeneratedCodes] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const today = dayjs().format("YYYY-MM-DD");

  // Fetch organizations from backend
  useEffect(() => {
    
    const fetchOrganizations = async () => {
    try {
      const res = await fetch("http://161.97.76.102:5000/api/super-admin/organisation-names", {
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = await res.json();
      setOrganizations(data.payload.data);
    } catch (err) {
      console.error("Error fetching organizations", err);
    }
  };

  fetchOrganizations();

    }, []);

  const generateRandomCodes = (qty) => {
    const codes = new Set();
    while (codes.size < qty) {
      codes.add(Math.random().toString().slice(2, 10));
    }
    return Array.from(codes);
  };

  const handleGenerate = () => {
    if (!selectedOrgId) {
      alert("Please select an organization.");
      return;
    }
    if (!quantity || quantity <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }
    if (!fromDate || !toDate) {
      alert("Please select both From and To dates.");
      return;
    }
    if (dayjs(fromDate).isBefore(today)) {
      alert("From date must be today or later.");
      return;
    }
    if (dayjs(toDate).isBefore(fromDate)) {
      alert("To date must be after From date.");
      return;
    }

    const codes = generateRandomCodes(Number(quantity)).map((code) => ({
      code,
      fromDate,
      toDate,
    }));

    setGeneratedCodes(codes);
  };

  const handleSave = async () => {
    if (generatedCodes.length === 0) {
      alert("No codes to save. Please generate promo codes first.");
      return;
    }

    try {
      const res = await fetch("http://161.97.76.102:5000/api/super-admin/save-promo-codes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          partnerId: selectedOrgId,
          fromDate,
          toDate,
          codes: generatedCodes.map((c) => c.code),
        }),
      });

      if (res.ok) {
        setSnackbarOpen(true);
        setTimeout(() => navigate("/super-admin/listing-partners"), 1500);
      } else {
        alert("Failed to save promo codes.");
      }
    } catch (error) {
      console.error("Error saving promo codes:", error);
      alert("Server error while saving promo codes.");
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Stack spacing={2}>
         
          <FormControl fullWidth>
  <InputLabel id="org-select-label">Select Organization</InputLabel>
  <Select
    labelId="org-select-label"
    value={selectedOrgId}
    label="Select Organization"
    onChange={(e) => setSelectedOrgId(e.target.value)}
    inputProps={{
      style: { color: 'black' },
    }}
    sx={{ backgroundColor: 'white', color: 'black' }}  // Ensure visibility
  >
    {organizations && Array.isArray(organizations) && organizations.map((org, index) => {
      console.log(`Org ${index}:`, org); // 👈 Console log to debug data
      return (
        <MenuItem
          key={org._id}
          value={org._id}
          sx={{ color: 'black', backgroundColor: 'white' }}
        >
          {org.organisationName || 'Unnamed Organization'}
        </MenuItem>
      );
    })}
  </Select>
</FormControl>


          <TextField
            label="Quantity of Promo Codes"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            inputProps={{ min: 1 }}
            fullWidth
          />

          <TextField
            label="Valid From"
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            inputProps={{ min: today }}
            fullWidth
          />

          <TextField
            label="Valid To"
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            inputProps={{ min: fromDate || today }}
            fullWidth
          />

          <Button variant="contained" onClick={handleGenerate}>
            Generate Codes
          </Button>
        </Stack>
      </Paper>

      {generatedCodes.length > 0 && (
        <Paper sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6">Generated Promo Codes</Typography>

          <Typography variant="subtitle1">
            <strong>Valid From:</strong> {fromDate}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Valid To:</strong> {toDate}
          </Typography>

          <Table sx={{ mt: 2 }}>
            <TableHead>
              <TableRow>
                <TableCell>Promo Code</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {generatedCodes.map((codeObj, index) => (
                <TableRow key={index}>
                  <TableCell>{codeObj.code}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleSave}
          >
            Save Codes
          </Button>
        </Paper>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1500}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success">Promo codes saved successfully!</Alert>
      </Snackbar>
    </Container>
  );
};

export default GeneratePromoCodes;
