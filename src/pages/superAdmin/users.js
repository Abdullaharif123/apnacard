import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserDetailsSuperAdmin } from "../../api-services/user";
import { notification } from "../../redux/slices/authSlice";
import { apiRequestStatuses } from "../../common/constant/index";
import { handleUserDelete, getAllUsers } from "../../api-services/superAdmin";
import UserDetailsPage from "./userDetailPage.js";
import { AddUserDialog, ChangePassDialog, Loading } from "../../components";
import {
  TextField,
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
  Avatar,
  Dialog,
  Pagination,
} from "@mui/material";

import {
  Edit as EditIcon,
  Add as AddIcon,
  Circle as CircleIcon,
  Lock as LockIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

const Users = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [paginationn, setPagination] = useState({
    currentPage: 0,
    limit: 0, // Rows per page
    totalPages: 0,
    totalRecords: 0,
  });

  const fetchUsers = async (name, page) => {
    try {
      if (!name) name = "";
      const response = await getAllUsers(name, page);
      const { users, pagination } = response.payload.data;
      setUsers(users);
      setPagination({
        currentPage: pagination.currentPage,
        limit: pagination.limit,
        totalRecords: pagination.totalRecords,
        totalPages: pagination.totalPages,
      });
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Error loading users. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleClickOpen = (userId) => {
    setOpen(true);
    setUser(userId);
  };

  const handleDialogOpen = (type, userId) => {
    setDialogType(type);
    setOpenDialog(true);
    setUser(userId);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setDialogType("");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (id) => {
    const res = await handleUserDelete(id);
    if (res.metadata.status === apiRequestStatuses.SUCCESS) {
      fetchUsers();
      dispatch(
        notification({
          open: true,
          type: "success",
          message: "User Deleted successfully!",
        })
      );
    }
  };

  const handlePageChange = async (event, newPage) => {
    setPagination((prevState) => ({
      ...prevState,
      currentPage: newPage,
    }));

    await fetchUsers(searchTerm, newPage);
  };

  const handleSearchChange = async (event) => {
    const name = event.target.value;
    setSearchTerm(name);

    fetchUsers(name);
  };

  const handleStatusChange = async (userId, currentStatus) => {
    try {
      const res = await updateUserDetailsSuperAdmin(userId, {
        isActive: !currentStatus,
      });

      if (res.metadata.status === apiRequestStatuses.SUCCESS) {
        fetchUsers();

        dispatch(
          notification({
            open: true,
            type: "success",
            message: `User ${
              !currentStatus ? "Activated" : "Deactivated"
            } successfully!`,
          })
        );
      }
    } catch (err) {
      console.error("Error updating status:", err);
      setError("Failed to update status. Please try again.");
    }
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
          marginBottom: 2,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Users List
        </Typography>

        <TextField
          variant="outlined"
          placeholder="Search by User name"
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
          variant="h4"
          sx={{
            marginTop: "7px",
            color: "aliceblue",
            cursor: "pointer",
            background: "linear-gradient(90deg, #001F54, #9B2ECA)",
          }}
          onClick={() => handleDialogOpen("addUser")}
        />
      </Box>

      {openDialog && dialogType === "addUser" && (
        <AddUserDialog
          open={openDialog}
          onClose={handleDialogClose}
          fetchUsers={fetchUsers}
        />
      )}
      {openDialog && dialogType === "changePass" && (
        <ChangePassDialog
          open={openDialog}
          onClose={handleDialogClose}
          userId={user}
        />
      )}

      {users.length > 0 ? (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="users table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}></TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Mobile No</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Organization
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>CardNo</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Role</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user?._id} hover style={{ cursor: "pointer" }}>
                    <TableCell>
                      {user?.profilePicture ? (
                        <Avatar
                          alt={user?.firstName}
                          src={user?.profilePicture}
                        />
                      ) : (
                        <Avatar>{user?.firstName?.charAt(0)}</Avatar>
                      )}
                    </TableCell>
                    <TableCell>
                      {`${user?.firstName || ""} ${
                        user?.lastName || ""
                      }`.trim() || "-"}
                    </TableCell>
                    <TableCell>{user?.email || "-"}</TableCell>
                    <TableCell>{user?.mobileNo || "-"}</TableCell>
                    <TableCell>{user?.organisationName || "-"}</TableCell>
                    <TableCell>{user?.cardNumber || "-"}</TableCell>
                    <TableCell>{user?.role || "-"}</TableCell>
                    <TableCell>
                      {user?.isActive ? (
                        <CircleIcon
                          sx={{ color: "#9B2ECA" }}
                          onClick={() =>
                            handleStatusChange(user?._id, user?.isActive)
                          }
                        />
                      ) : (
                        <CircleIcon
                          sx={{ color: "darkgray" }}
                          onClick={() =>
                            handleStatusChange(user?._id, user?.isActive)
                          }
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      <EditIcon onClick={() => handleClickOpen(user?._id)} />
                      <LockIcon
                        onClick={() =>
                          handleDialogOpen("changePass", user?._id)
                        }
                      />
                      <DeleteIcon onClick={() => handleDelete(user?._id)} />
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
        <Typography variant="body1">No users found.</Typography>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <UserDetailsPage userId={user} />
      </Dialog>
    </Box>
  );
};

export default Users;
