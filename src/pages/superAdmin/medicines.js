import React, { useEffect, useState } from "react";
import {
  Box,
  Toolbar,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Pagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { getAllMedicines } from "../../api-services/superAdmin";
import { Loading } from "../../components";
import {
  handleMedicineDelete,
  handleMedicineUpdate,
  handleMedicineCreate,
} from "../../api-services/superAdmin";
import { apiRequestStatuses } from "../../common/constant/index";
import { formatDateTime } from "../../utils/common";
import { useDispatch } from "react-redux";
import { notification } from "../../redux/slices/authSlice";
import {
  Edit as EditIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Circle as CircleIcon,
} from "@mui/icons-material";

const Medicines = () => {
  const dispatch = useDispatch();

  const [Medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [Medicine, setMedicine] = useState({
    name: "",
    id: "",
    imageUrl: "",
    isGeneric: true,
  });
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [paginationn, setPagination] = useState({
    currentPage: 0,
    limit: 0, // Rows per page
    totalPages: 0,
    totalRecords: 0,
  });

  const fetchMedicines = async (name, page) => {
    try {
      if (!name) name = "";
      const response = await getAllMedicines(name, page);

      const { medicines, pagination } = response.payload.data;
      setMedicines(medicines);
      setPagination({
        currentPage: pagination.currentPage,
        limit: pagination.limit,
        totalRecords: pagination.totalRecords,
        totalPages: pagination.totalPages,
      });
    } catch (err) {
      console.error("Error fetching Medicines:", err); // Log error for debugging
      setError("Error loading Medicines. Please try again later."); // Set user-friendly error message
    } finally {
      setLoading(false); // Move loading state update here
    }
  };

  // Fetch Medicines from the backend
  useEffect(() => {
    fetchMedicines();
  }, []);

  const handleClickOpen = (medic = { id: null, name: "" }) => {
    setOpen(true);
    if (medic) {
      setMedicine({
        id: medic?._id,
        name: medic?.medicineName,
      });
    }
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setMedicine((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res;
    let message;
    if (Medicine.id) {
      message = "Updated";
      res = await handleMedicineUpdate(Medicine);
    } else {
      message = "Created";
      res = await handleMedicineCreate(Medicine.name);
    }
    if (res.metadata.status === apiRequestStatuses.SUCCESS) {
      fetchMedicines();

      dispatch(
        notification({
          open: true,
          type: "success",
          message: `Medicine ${message} successfully!`,
        })
      );
    }

    setOpen(false);
  };

  const handlePageChange = async (event, newPage) => {
    setPagination((prevState) => ({
      ...prevState,
      currentPage: newPage,
    }));

    await fetchMedicines(searchTerm, newPage);
  };

  const handleSearchChange = async (event) => {
    const name = event.target.value;
    setSearchTerm(name);

    fetchMedicines(name);
  };

  const handleStatusUpdate = async (medic) => {
    setMedicine((prevState) => {
      const updatedMedicine = {
        id: medic?._id,
        name: medic?.medicineName,
        isActive: !medic?.isActive,
      };

      handleMedicineUpdate(updatedMedicine).then((res) => {
        if (res.metadata.status === apiRequestStatuses.SUCCESS) {
          fetchMedicines();

          dispatch(
            notification({
              open: true,
              type: "success",
              message: "Medicine Updated successfully!",
            })
          );
        }
      });

      return updatedMedicine;
    });
  };

  const handleDelete = async (id) => {
    const res = await handleMedicineDelete(id);
    if (res.metadata.status === apiRequestStatuses.SUCCESS) {
      fetchMedicines();
      dispatch(
        notification({
          open: true,
          type: "success",
          message: "Medicine Deleted successfully!",
        })
      );
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (loading) {
    return <Loading />; // Show loading spinner
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
          Medicine List
        </Typography>

        <TextField
          variant="outlined"
          placeholder="Search by Medicine name"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{
            marginBottom: "20px",
            width: "40%",
            "& .MuiOutlinedInput-root": {
              borderRadius: "20px", // Rounded corners
            },
          }}
        />

        <AddIcon
          sx={{
            color: "aliceblue",
            cursor: "pointer",
            background: "linear-gradient(90deg, #001F54, #9B2ECA)",
          }}
          onClick={() => handleClickOpen({ id: null, name: "" })}
        />
      </Box>
      {Medicines.length > 0 ? (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="organisations table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Medicine Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>UpdateOn</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Medicines.map((medic) => (
                  <TableRow
                    key={medic?._id}
                    hover
                    style={{ cursor: "pointer" }}
                  >
                    <TableCell>{medic?.medicineName || "-"}</TableCell>
                    <TableCell> {formatDateTime(medic?.updatedOn)}</TableCell>
                    <TableCell>
                      {medic?.isActive ? (
                        <CircleIcon
                          sx={{ color: "#9B2ECA" }}
                          onClick={() => handleStatusUpdate(medic)}
                        />
                      ) : (
                        <CircleIcon
                          sx={{ color: "darkgray" }}
                          onClick={() => handleStatusUpdate(medic)}
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      <EditIcon onClick={() => handleClickOpen(medic)} />
                      <DeleteIcon onClick={() => handleDelete(medic?._id)} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Pagination
            count={paginationn.totalPages} // Total number of pages
            page={paginationn.currentPage} // Current page
            onChange={handlePageChange} // Handle page change
            sx={{ mt: 2, display: "flex", justifyContent: "center" }} // Styling for pagination
          />
        </>
      ) : (
        <Typography variant="body1">No Medicines found.</Typography>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          sx: { width: "600px" },
        }}
      >
        <DialogTitle>Medicine</DialogTitle>
        <DialogContent
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="Medicine Name"
              value={Medicine.name}
              onChange={handleChange}
              style={{ width: "48%" }}
              variant="standard"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button type="submit" onClick={handleSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Medicines;
