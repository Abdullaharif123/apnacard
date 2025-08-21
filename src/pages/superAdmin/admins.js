import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { notification } from "../../redux/slices/authSlice";
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
  TextField,
  Pagination,
  Avatar,
} from "@mui/material";
import { getAllAdmins } from "../../api-services/admin";
import { Loading } from "../../components";
import { updateUserDetailsSuperAdmin } from "../../api-services/user";
import { apiRequestStatuses } from "../../common/constant/index";
import { Circle as CircleIcon } from "@mui/icons-material";

const Admins = () => {
  const dispatch = useDispatch();

  const [Admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [paginationn, setPagination] = useState({
    currentPage: 0,
    limit: 0, // Rows per page
    totalPages: 0,
    totalRecords: 0,
  });

  const fetchAdmins = async (name, page) => {
    try {
      if (!name) name = "";
      const response = await getAllAdmins(name, page);
      const { admins, pagination } = response.payload.data;
      setAdmins(admins);
      setPagination({
        currentPage: pagination.currentPage,
        limit: pagination.limit,
        totalRecords: pagination.totalRecords,
        totalPages: pagination.totalPages,
      });
    } catch (err) {
      console.error("Error fetching Admins:", err);
      setError("Error loading Admins. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch Admins from the backend
  useEffect(() => {
    fetchAdmins();
  }, []);

  const handlePageChange = async (event, newPage) => {
    setPagination((prevState) => ({
      ...prevState,
      currentPage: newPage,
    }));

    await fetchAdmins(searchTerm, newPage);
  };

  const handleSearchChange = async (event) => {
    const name = event.target.value;
    setSearchTerm(name);

    fetchAdmins(name);
  };

  const handleStatusChange = async (userId, currentStatus) => {
    try {
      const res = await updateUserDetailsSuperAdmin(userId, {
        isActive: !currentStatus,
      });

      if (res.metadata.status === apiRequestStatuses.SUCCESS) {
        fetchAdmins();

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
          alignItems: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Admin List
        </Typography>

        <TextField
          variant="outlined"
          placeholder="Search by admin name"
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
      </Box>
      {Admins.length > 0 ? (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="organisations table">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Admin Name</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Mobile No</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Organization
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Admins.map((admn) => (
                  <TableRow key={admn?._id} hover style={{ cursor: "pointer" }}>
                    <TableCell>
                      {admn?.profilePicture ? (
                        <Avatar
                          alt={admn?.firstName}
                          src={admn?.profilePicture}
                        />
                      ) : (
                        <Avatar>{admn?.firstName?.charAt(0)}</Avatar>
                      )}
                    </TableCell>
                    <TableCell>
                      {" "}
                      {`${admn?.firstName || ""} ${
                        admn?.lastName || ""
                      }`.trim() || "-"}
                    </TableCell>
                    <TableCell>{admn?.email || "-"}</TableCell>
                    <TableCell>{admn?.mobileNo || "-"}</TableCell>
                    <TableCell>{admn?.organisationName || "-"}</TableCell>
                    <TableCell>
                      {admn?.isActive ? (
                        <CircleIcon
                          sx={{ color: "#9B2ECA" }}
                          onClick={() =>
                            handleStatusChange(admn?._id, admn?.isActive)
                          }
                        />
                      ) : (
                        <CircleIcon
                          sx={{ color: "darkgray" }}
                          onClick={() =>
                            handleStatusChange(admn?._id, admn?.isActive)
                          }
                        />
                      )}
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
        <Typography variant="body1">No Admins found.</Typography>
      )}
    </Box>
  );
};

export default Admins;
