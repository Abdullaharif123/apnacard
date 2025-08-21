import React, { useEffect, useState } from "react";
import { getOrganisations } from "../../api-services/superAdmin";
import { apiRequestStatuses } from "../../common/constant/index";
import { CategoryDialog, CardDialog } from "../../components";
import { formatCardNumbers } from "../../extension/index.js";
import {
  handleOrganisationCreate,
  handleOrganisationUpdate,
  handleOrganisationDelete,
  getUsersByOrganisationById,
} from "../../api-services/superAdmin";
import { useDispatch } from "react-redux";
import { notification } from "../../redux/slices/authSlice";
import { formatDateTime } from "../../utils/common";
import { Loading } from "../../components";
import PercentageDialog from "../../components/PercentageDialog"; // adjust the path if needed
import PercentIcon from "@mui/icons-material/Percent";

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
  Dialog,
  Button,
  TextField,
  DialogActions,
  DialogContent,
  DialogTitle,
  Pagination,
} from "@mui/material";

import {
  Edit as EditIcon,
  Add as AddIcon,
  Group as GroupIcon,
  Delete as DeleteIcon,
  Circle as CircleIcon,
  Category as CategoryIcon,
  CreditCard as CreditCardIcon,
} from "@mui/icons-material";

const Organisations = () => {
  const dispatch = useDispatch();
  const [organisations, setOrganisations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState("");
  const [open, setOpen] = useState(false);
  const [openUserDialog, setOpenUserDialog] = useState(false);
  const [users, setUsers] = useState([]);
  const [organisation, setOrganisation] = useState({
    name: "",
    id: "",
    isActive: "",
    categories: [],
  });
  const [paginationn, setPagination] = useState({
    currentPage: 0,
    limit: 0, // Rows per page
    totalPages: 0,
    totalRecords: 0,
  });

  const fetchOrganisations = async (name, page) => {
    try {
      if (!name) name = "";
      const response = await getOrganisations(name, page);

      const { organisations, pagination } = response.payload.data;
      setOrganisations(organisations);
      setPagination({
        currentPage: pagination.currentPage,
        limit: pagination.limit,
        totalRecords: pagination.totalRecords,
        totalPages: pagination.totalPages,
      });
    } catch (err) {
      console.error("Error fetching Organisations:", err);
      setError("Error loading Organisations. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganisations();
  }, []);

  const handleUserDialogOpen = async (orgId) => {
    try {
      const res = await getUsersByOrganisationById(orgId); // Fetch users by organisation ID
      setUsers(res.payload.data); // Store users
      setOpenUserDialog(true);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const handleUserDialogClose = () => {
    setOpenUserDialog(false);
    setUsers([]); // Reset user list when closing the dialog
  };

  const handleClickOpen = (org = { id: null, name: "", isActive: false }) => {
    setOpen(true);
    if (org) {
      setOrganisation({
        id: org?._id,
        name: org?.organisationName,
        isActive: org?.isActive,
      });
    }
  };

  const handleDelete = async (id) => {
    const users = await getUsersByOrganisationById(id);

    if (users.payload.data.length === 0) {
      const res = await handleOrganisationDelete(id);
      if (res.metadata.status === apiRequestStatuses.SUCCESS) {
        fetchOrganisations();
        dispatch(
          notification({
            open: true,
            type: "success",
            message: "Organisation Deleted successfully!",
          })
        );
      }
    } else {
      dispatch(
        notification({
          open: true,
          type: "error",
          message: "Organisation can't be Deleted. Active users exists!",
        })
      );
    }
  };

  const handlePageChange = async (event, newPage) => {
    setPagination((prevState) => ({
      ...prevState,
      currentPage: newPage,
    }));

    await fetchOrganisations(searchTerm, newPage);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrganisation({
      ...organisation,
      [name]: value,
    });
  };

  const handleStatusUpdate = async (org) => {
    setOrganisation((prevState) => {
      const updatedOrganisation = {
        id: org?._id,
        name: org?.organisationName,
        isActive: !org?.isActive,
      };

      handleOrganisationUpdate(updatedOrganisation).then((res) => {
        if (res.metadata.status === apiRequestStatuses.SUCCESS) {
          fetchOrganisations();

          dispatch(
            notification({
              open: true,
              type: "success",
              message: "Organisation Updated successfully!",
            })
          );
        }
      });

      return updatedOrganisation;
    });
  };

  const handleSearchChange = async (event) => {
    const name = event.target.value;
    setSearchTerm(name);

    fetchOrganisations(name);
  };

  const handleDialogOpen = (type, org) => {
    setDialogType(type);
    setOpenDialog(true);

    setOrganisation({
      id: org?._id,
      name: org?.organisationName,
      isActive: org?.isActive,
      categories: org?.categories,
    });
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setDialogType("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res;
    let message;
    if (organisation.id) {
      message = "Updated";
      res = await handleOrganisationUpdate(organisation);
    } else {
      message = "Created";
      res = await handleOrganisationCreate(organisation.name);
    }
    if (res.metadata.status === apiRequestStatuses.SUCCESS) {
      fetchOrganisations();

      dispatch(
        notification({
          open: true,
          type: "success",
          message: `Organisation ${message} successfully!`,
        })
      );
    }

    setOpen(false);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Typography variant="body1">{error}</Typography>;
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
          Organisation List
        </Typography>
        <TextField
          variant="outlined"
          placeholder="Search by organisation name"
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

      {openDialog && dialogType === "category" && (
        <CategoryDialog
          open={openDialog}
          onClose={handleDialogClose}
          org={organisation}
        />
      )}

      {openDialog && dialogType === "card" && (
        <CardDialog
          open={openDialog}
          onClose={handleDialogClose}
          org={organisation}
          fetchOrganisations={fetchOrganisations}
        />
      )}
      {openDialog && dialogType === "percentage" && (
        <PercentageDialog
          open={openDialog}
          onClose={handleDialogClose}
          org={organisation}
        />
      )}

      {organisations.length > 0 ? (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="organisations table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Organisation Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>UpdateOn</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Card Range</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {organisations.map((org) => (
                  <TableRow key={org?._id} hover style={{ cursor: "pointer" }}>
                    <TableCell>{org?.organisationName || "-"}</TableCell>
                    <TableCell> {formatDateTime(org?.updatedOn)}</TableCell>
                    <TableCell>{formatCardNumbers(org?.cardNumbers)}</TableCell>
                    <TableCell>
                      {org?.isActive ? (
                        <CircleIcon
                          sx={{ color: "#9B2ECA" }}
                          onClick={() => handleStatusUpdate(org)}
                        />
                      ) : (
                        <CircleIcon
                          sx={{ color: "darkgray" }}
                          onClick={() => handleStatusUpdate(org)}
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      <EditIcon onClick={() => handleClickOpen(org)} />
                      <GroupIcon
                        onClick={() => handleUserDialogOpen(org?._id)}
                      />
                      <CategoryIcon
                        onClick={() => handleDialogOpen("category", org)}
                      />
                      <CreditCardIcon
                        onClick={() => handleDialogOpen("card", org)}
                      />
                      <DeleteIcon onClick={() => handleDelete(org?._id)} />
                      <PercentIcon
                        onClick={() => handleDialogOpen("percentage", org)}
                        sx={{ cursor: "pointer" }}
                      />

                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Dialog
            open={openUserDialog}
            onClose={handleUserDialogClose}
            fullWidth
            maxWidth="sm"
          >
            <DialogTitle>Active Users of the Organisation</DialogTitle>
            <DialogContent sx={{ maxHeight: "400px", overflowY: "auto" }}>
              {users.length > 0 ? (
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Role</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user._id}>
                        <TableCell>{user?.firstName}</TableCell>
                        <TableCell>{user?.email}</TableCell>
                        <TableCell>{user?.role}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <Typography variant="body1">
                  No users found for this organisation.
                </Typography>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleUserDialogClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>

          <Pagination
            count={paginationn.totalPages} // Total number of pages
            page={paginationn.currentPage} // Current page
            onChange={handlePageChange} // Handle page change
            sx={{ mt: 2, display: "flex", justifyContent: "center" }} // Styling for pagination
          />
        </>
      ) : (
        <Typography variant="body1">No Organisations found.</Typography>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          sx: { width: "600px" },
        }}
      >
        <DialogTitle>Organisation</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="id"
            name="name"
            label="Organisation Name"
            value={organisation.name}
            onChange={handleChange}
            fullWidth
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

export default Organisations;


