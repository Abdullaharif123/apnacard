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
import {
  getAllServices,
  handleServiceDelete,
  handleServiceUpdate,
  handleServiceCreate,
} from "../../api-services/admin";
import { apiRequestStatuses } from "../../common/constant/index";
import { formatDateTime } from "../../utils/common";
import { useDispatch } from "react-redux";
import { notification } from "../../redux/slices/authSlice";
import { Loading } from "../../components";
import {
  Edit as EditIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Circle as CircleIcon,
} from "@mui/icons-material";

const Services = () => {
  const dispatch = useDispatch();

  const [Services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [Service, setService] = useState({ name: "", id: "", price: "" });
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [paginationn, setPagination] = useState({
    currentPage: 0,
    limit: 0, // Rows per page
    totalPages: 0,
    totalRecords: 0,
  });

  const fetchServices = async (name, page) => {
    try {
      if (!name) name = "";
      const response = await getAllServices(name, page);

      const { services, pagination } = response.payload.data;
      setServices(services);
      setPagination({
        currentPage: pagination.currentPage,
        limit: pagination.limit,
        totalRecords: pagination.totalRecords,
        totalPages: pagination.totalPages,
      });
    } catch (err) {
      console.error("Error fetching services:", err); // Log error for debugging
      setError("Error loading Organisations. Please try again later."); // Set user-friendly error message
    } finally {
      setLoading(false); // Move loading state update here
    }
  };

  // Fetch Services from the backend
  useEffect(() => {
    fetchServices();
  }, []);

  const handleClickOpen = (ser = { id: null, name: "" }) => {
    setOpen(true);
    if (ser) {
      setService({
        id: ser?._id,
        name: ser?.name,
        price: ser?.price,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setService({
      ...Service,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res;
    let message;
    if (Service.id) {
      message = "Updated";
      res = await handleServiceUpdate(Service);
    } else {
      message = "Created";
      res = await handleServiceCreate(Service.name, Service.price);
    }
    if (res.metadata.status === apiRequestStatuses.SUCCESS) {
      fetchServices();

      dispatch(
        notification({
          open: true,
          type: "success",
          message: `Service ${message} successfully!`,
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

    await fetchServices(searchTerm, newPage);
  };

  const handleSearchChange = async (event) => {
    const name = event.target.value;
    setSearchTerm(name);

    fetchServices(name);
  };

  const handleStatusUpdate = async (ser) => {
    setService((prevState) => {
      const updatedService = {
        id: ser?._id,
        name: ser?.name,
        isActive: !ser?.isActive,
      };

      handleServiceUpdate(updatedService).then((res) => {
        if (res.metadata.status === apiRequestStatuses.SUCCESS) {
          fetchServices();

          dispatch(
            notification({
              open: true,
              type: "success",
              message: "Service Updated successfully!",
            })
          );
        }
      });

      return updatedService;
    });
  };

  const handleDelete = async (id) => {
    const res = await handleServiceDelete(id);
    if (res.metadata.status === apiRequestStatuses.SUCCESS) {
      fetchServices();
      dispatch(
        notification({
          open: true,
          type: "success",
          message: "Service Deleted successfully!",
        })
      );
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Display the loading component if loading is true
  if (loading) {
    return <Loading />;
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
          Service List
        </Typography>

        <TextField
          variant="outlined"
          placeholder="Search by service name"
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
      {Services.length > 0 ? (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="organisations table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Service Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Price</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>UpdateOn</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Services.map((ser) => (
                  <TableRow key={ser?._id} hover style={{ cursor: "pointer" }}>
                    <TableCell>{ser?.name || "-"}</TableCell>
                    <TableCell>{ser?.price || "-"}</TableCell>
                    <TableCell> {formatDateTime(ser?.updatedOn)}</TableCell>
                    <TableCell>
                      {ser?.isActive ? (
                        <CircleIcon
                          sx={{ color: "#9B2ECA" }}
                          onClick={() => handleStatusUpdate(ser)}
                        />
                      ) : (
                        <CircleIcon
                          sx={{ color: "darkgray" }}
                          onClick={() => handleStatusUpdate(ser)}
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      <EditIcon onClick={() => handleClickOpen(ser)} />
                      <DeleteIcon onClick={() => handleDelete(ser?._id)} />
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
        <Typography variant="body1">No Services found.</Typography>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          sx: { width: "600px" },
        }}
      >
        <DialogTitle>Service</DialogTitle>
        <DialogContent
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Service Name"
            value={Service.name}
            onChange={handleChange}
            style={{ width: "48%" }}
            variant="standard"
          />

          <TextField
            autoFocus
            required
            margin="dense"
            id="price"
            name="price"
            label="Price"
            value={Service.price}
            onChange={handleChange}
            style={{ width: "48%" }}
            variant="standard"
          />
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

export default Services;
