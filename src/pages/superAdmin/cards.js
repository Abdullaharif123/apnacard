import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import { getOrganisationsWithDetails } from "../../api-services/superAdmin";
import Dialog from "@mui/material/Dialog";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";

const Cards = () => {
  const [organisations, setOrganisations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [organisation, setOrganisation] = useState({ name: "", id: "" });
  const [open, setOpen] = useState(false);

  // Fetch Organisations from the backend
  useEffect(() => {
    const fetchOrganisations = async () => {
      try {
        const response = await getOrganisationsWithDetails();

        setOrganisations(response.payload.data);
      } catch (err) {
        console.error("Error fetching Organisations:", err); // Log error for debugging
        setError("Error loading Organisations. Please try again later."); // Set user-friendly error message
      } finally {
        setLoading(false);
      }
    };

    fetchOrganisations();
  }, []);

  const handleClickOpen = (org = { id: null, name: "" }) => {
    setOpen(true);
    if (org) {
      setOrganisation({ id: org?._id, name: org?.organisationName });
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (loading) {
    return <CircularProgress />; // Show loading spinner
  }

  if (error) {
    return <Typography variant="body1">{error}</Typography>; // Show error message
  }

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
    >
      <Toolbar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Organisation Cards List
        </Typography>
        <AddIcon
          sx={{
            color: "aliceblue",
            cursor: "pointer",
            background: "linear-gradient(90deg, #001F54, #9B2ECA)",
          }}
          onClick={() => handleClickOpen({ id: null, name: "" })}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="organisations table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>No of Cards</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                Organisation Name
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>UpdateOn</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Card No's</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {organisations.map((org) => (
              <TableRow key={org?._id} hover style={{ cursor: "pointer" }}>
                <TableCell>{org?.cardCount}</TableCell>
                <TableCell>{org?.organisationName || "-"}</TableCell>
                <TableCell>{org?.updatedOn || "-"}</TableCell>
                <TableCell>{org?.cardNumbers}</TableCell>
                <TableCell>
                  <EditIcon onClick={() => handleClickOpen(org)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          sx: { width: "600px" },
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            handleClose();
          },
        }}
      >
        <DialogTitle>Assign Cards</DialogTitle>
        <DialogContent
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <TextField
            autoFocus
            required
            margin="dense"
            id="cardRangeFrom"
            name="cardRangeFrom"
            label="Card Range From"
            variant="standard"
            style={{ width: "48%" }}
          />

          <TextField
            autoFocus
            required
            margin="dense"
            id="cardRangeTo"
            name="cardRangeTo"
            label="Card Range To"
            variant="standard"
            style={{ width: "48%" }}
          />
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Cancel</Button> */}
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Cards;
