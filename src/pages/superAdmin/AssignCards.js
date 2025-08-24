import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  TextField,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
  Select,
  MenuItem,
  InputLabel,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Snackbar,
  Alert,
  Stack,
  Checkbox
} from "@mui/material";

const AssignCards = () => {
  const [partners, setPartners] = useState([]);
  const [selectedPartner, setSelectedPartner] = useState("");
  const [mode, setMode] = useState("specific");
  const [specificNumbers, setSpecificNumbers] = useState("");
  const [specificNumbersError, setSpecificNumbersError] = useState("");
  const [rangeStart, setRangeStart] = useState("");
  const [rangeEnd, setRangeEnd] = useState("");
  const [assignedNumbers, setAssignedNumbers] = useState([]);
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    setPartners([
      { id: 1, name: "Partner A" },
      { id: 2, name: "Partner B" },
      { id: 3, name: "Partner C" }
    ]);
  }, []);

  const cleanSpecificNumbers = (input) => {
    return input
      .split(/[\s,]+/)
      .map(num => num.trim())
      .filter(num => {
        const n = Number(num);
        return num !== "" && !isNaN(n) && n > 0;
      });
  };

  const handleAssign = () => {
    if (!selectedPartner) {
      alert("Please select a partner.");
      return;
    }

    let numbers = [];

    if (mode === "specific") {
      if (!specificNumbers.trim()) {
        alert("Please enter at least one card number.");
        return;
      }

      numbers = cleanSpecificNumbers(specificNumbers);

      if (numbers.length === 0) {
        alert("Only positive numbers are allowed. Please correct your input.");
        return;
      }
    } else if (mode === "range") {
      if (!rangeStart || !rangeEnd) {
        alert("Please enter both start and end of the range.");
        return;
      }

      const start = parseInt(rangeStart);
      const end = parseInt(rangeEnd);

      if (start <= 0 || end <= 0) {
        alert("Only positive numbers are allowed in the range.");
        return;
      }

      if (start > end) {
        alert("Start number should be less than or equal to end number.");
        return;
      }

      for (let i = start; i <= end; i++) {
        numbers.push(i.toString());
      }
    }

    setAssignedNumbers(numbers);
    setSelectedNumbers(numbers); // by default, all selected after generation
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedNumbers(assignedNumbers);
    } else {
      setSelectedNumbers([]);
    }
  };

  const handleSelectNumber = (num) => {
    setSelectedNumbers((prev) =>
      prev.includes(num) ? prev.filter((n) => n !== num) : [...prev, num]
    );
  };

  const handleSave = () => {
    if (selectedNumbers.length === 0) {
      alert("No numbers selected. Please select numbers to save.");
      return;
    }

    const payload = {
      partnerId: selectedPartner,
      numbers: selectedNumbers
    };

    console.log("Saving assigned numbers:", payload);
    // TODO: Send to backend

    setSnackbarOpen(true);

    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  const handleSpecificNumbersChange = (e) => {
    const input = e.target.value;
    setSpecificNumbers(input);

    const hasNegative = input
      .split(/[\s,]+/)
      .some(num => num.trim() !== "" && Number(num) < 0);

    if (hasNegative) {
      setSpecificNumbersError("Negative numbers are not allowed.");
    } else {
      setSpecificNumbersError("");
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Assign Card Numbers to Partner
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Stack spacing={2}>
          <FormControl fullWidth>
            <InputLabel>Select Partner</InputLabel>
            <Select
              value={selectedPartner}
              onChange={(e) => setSelectedPartner(e.target.value)}
              label="Select Partner"
            >
              {partners.map((partner) => (
                <MenuItem key={partner.id} value={partner.id}>
                  {partner.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <RadioGroup
              row
              value={mode}
              onChange={(e) => setMode(e.target.value)}
            >
              <FormControlLabel
                value="specific"
                control={<Radio />}
                label="Specific Card Numbers"
              />
              <FormControlLabel
                value="range"
                control={<Radio />}
                label="Card Number Range"
              />
            </RadioGroup>
          </FormControl>

          {mode === "specific" && (
            <TextField
              label="Enter Card Numbers (comma, space, or line-separated)"
              multiline
              rows={3}
              value={specificNumbers}
              onChange={handleSpecificNumbersChange}
              error={!!specificNumbersError}
              helperText={specificNumbersError}
              fullWidth
            />
          )}

          {mode === "range" && (
            <Stack direction="row" spacing={2}>
              <TextField
                label="From Number"
                type="number"
                value={rangeStart}
                onChange={(e) => setRangeStart(e.target.value)}
                inputProps={{ min: 1 }}
              />
              <TextField
                label="To Number"
                type="number"
                value={rangeEnd}
                onChange={(e) => setRangeEnd(e.target.value)}
                inputProps={{ min: 1 }}
              />
            </Stack>
          )}

          <Button
            variant="contained"
            onClick={handleAssign}
            disabled={specificNumbersError !== ""}
          >
            Assign Numbers
          </Button>
        </Stack>
      </Paper>

      {assignedNumbers.length > 0 && (
        <Paper sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Assigned Card Numbers Preview
          </Typography>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedNumbers.length === assignedNumbers.length}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Card Number</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {assignedNumbers.map((num, index) => (
                <TableRow key={index}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedNumbers.includes(num)}
                      onChange={() => handleSelectNumber(num)}
                    />
                  </TableCell>
                  <TableCell>{num}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleSave}
            disabled={selectedNumbers.length === 0}
          >
            Save Assigned Numbers
          </Button>
        </Paper>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1500}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success">Assigned card numbers saved successfully!</Alert>
      </Snackbar>
    </Container>
  );
};

export default AssignCards;
