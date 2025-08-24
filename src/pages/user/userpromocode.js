import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Snackbar,
  Alert,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Autocomplete,
  Pagination,
  Box,
} from "@mui/material";
import axios from "axios";
const UserPromoCodePage = ({ role, loggedInUser }) => {
  // 🔹 State
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [organisations, setOrganisations] = useState([]);
  const [selectedOrganisationId, setSelectedOrganisationId] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [percentage, setPercentage] = useState("");
  const [billAmount, setBillAmount] = useState("");
  const [discountedAmount, setDiscountedAmount] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [tableData, setTableData] = useState(null);

  // 🔹 Pagination
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const totalPages = Math.ceil(users.length / rowsPerPage);

  // 🔹 Search
  const [searchTerm, setSearchTerm] = useState("");

  // 🔹 Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [promoMessage, setPromoMessage] = useState("");
  const [success, setSuccess] = useState(false);

  // 🔹 Debug
  useEffect(() => {
    console.log("🔄 UserPromoCodePage: role =", role, "loggedInUser =", loggedInUser);
  }, [role, loggedInUser]);

  useEffect(() => {
    console.log("🎯 role:", role, "type:", typeof role);

    if (role?.trim()?.toLowerCase() === "admin") {
      fetchUsers();
    } else if (role?.trim()?.toLowerCase() === "user") {
      if (loggedInUser && loggedInUser._id) {
        console.log("✅ Setting selectedUserId =", loggedInUser._id);
        setSelectedUserId(loggedInUser._id);
      } else {
        console.log("🟡 Skipping: loggedInUser or _id missing", loggedInUser);
      }
    }

    fetchOrganisations();
  }, [role, loggedInUser]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://161.97.76.102:5000/api/user/users");
      setUsers(res.data.payload?.data || []);
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  const fetchOrganisations = async () => {
    try {
      const res = await axios.get("http://161.97.76.102:5000/api/organisation");
      console.log("📬 Orgs Response:", res.data);
      const orgList = res.data.payload?.data || [];
      setOrganisations(orgList);
    } catch (err) {
      console.error("Error fetching organisations", err);
    }
  };

  const fetchCategories = async (orgId) => {
    try {
      const res = await axios.get(
        `http://161.97.76.102:5000/api/organisation/${orgId}/categories`
      );
      setCategories(res.data.payload?.data || []);
    } catch (err) {
      console.error("Error fetching categories", err);
    }
  };

  const fetchPercentage = async (orgId, catId) => {
    try {
      const res = await axios.get(
        `http://161.97.76.102:5000/api/organisation/${orgId}/categories/${catId}/percentage`
      );
      setPercentage(
        res.data.payload?.percentage ||
        res.data.payload?.data?.percentage ||
        ""
      );
    } catch (err) {
      console.error("Error fetching percentage", err);
    }
  };

  // -------------------------------
  // Handlers
  const handleOrganisationChange = (e) => {
    const orgId = e.target.value;
    setSelectedOrganisationId(orgId);
    setCategories([]);
    setSelectedCategoryId("");
    setPercentage("");
    if (orgId) fetchCategories(orgId);
  };

  const handleCategoryChange = (e) => {
    const catId = e.target.value;
    setSelectedCategoryId(catId);
    if (catId) fetchPercentage(selectedOrganisationId, catId);
  };

  const handleBillChange = (e) => {
    const value = e.target.value;
    setBillAmount(value);
    if (percentage && value) {
      const discounted = value - (value * percentage) / 100;
      setDiscountedAmount(discounted.toFixed(2));
    } else {
      setDiscountedAmount("");
    }
  };

  const handleGetPromoCode = async () => {
    if (
      !selectedUserId ||
      !selectedOrganisationId ||
      !selectedCategoryId ||
      !billAmount
    ) {
      setPromoMessage("All * fields are required");
      setSuccess(false);
      setSnackbarOpen(true);
      return;
    }

    try {
      const res = await axios.get(
        `http://161.97.76.102:5000/api/organisation/${selectedOrganisationId}/promo-codes/unused`
      );

      const promoCode = res.data?.payload?.data?.promoCode;

      if (promoCode) {
        setPromoCode(promoCode);
        setTableData({
          userName:
            role === "user"
              ? `${loggedInUser.firstName} ${loggedInUser.lastName}`
              : users.find((u) => u._id === selectedUserId)?.firstName +
                " " +
                users.find((u) => u._id === selectedUserId)?.lastName,
          organisation: organisations.find(
            (o) => o._id === selectedOrganisationId
          )?.organisationName,
          category: categories.find((c) => c._id === selectedCategoryId)?.name,
          percentage,
          billAmount,
          discountedAmount,
          promoCode: promoCode,
        });
        setPromoMessage("Promo code assigned successfully!");
        setSuccess(true);
        setSnackbarOpen(true);
      } else {
        setPromoMessage("No promo code available.");
        setSuccess(false);
        setSnackbarOpen(true);
      }
    } catch (err) {
      console.error("Error fetching promo code", err);
      setPromoMessage("Error fetching promo code.");
      setSuccess(false);
      setSnackbarOpen(true);
    }
  };

  const handleSave = async () => {
    try {
      const res = await axios.post("http://161.97.76.102:5000/api/user-promo-codes", {
        userId: selectedUserId,
        organisationId: selectedOrganisationId,
        categoryId: selectedCategoryId,
        promoCode,
        billAmount,
        discountedAmount,
        percentage,
      });
      if (res.status === 200) {
        setPromoMessage("Promo code saved successfully!");
        setSuccess(true);
        setSnackbarOpen(true);
        setTimeout(() => window.location.reload(), 1500);
      } else {
        setPromoMessage("Failed to save promo code.");
        setSuccess(false);
        setSnackbarOpen(true);
      }
    } catch (err) {
      console.error("Error saving promo code", err);
      setPromoMessage("Error saving promo code.");
      setSuccess(false);
      setSnackbarOpen(true);
    }
  };

  // Pagination change handler
  const handlePageChange = (event, newPage) => {
    setPage(newPage - 1); // Pagination is 1-based, page is 0-based
  };

  // Filter users by search term
  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get paginated users
  const paginatedUsers = filteredUsers.slice(
    page * rowsPerPage,
    (page + 1) * rowsPerPage
  );

  // -------------------------------
  return (
    <Container sx={{ mt: 4 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" mb={2}>
          Get Promo Code
        </Typography>

        <Stack spacing={2}>
          {/* User field (Admin only) */}
          {role === "admin" && (
            <Box>
              <Autocomplete
                options={filteredUsers}
                getOptionLabel={(user) =>
                  `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
                  "Unnamed User"
                }
                value={users.find((u) => u._id === selectedUserId) || null}
                onChange={(event, newValue) => {
                  setSelectedUserId(newValue?._id || "");
                }}
                onInputChange={(event, newInputValue) => {
                  setSearchTerm(newInputValue);
                  setPage(0); // Reset to first page when searching
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select User *"
                    variant="outlined"
                    fullWidth
                  />
                )}
                ListboxProps={{
                  style: {
                    maxHeight: "200px",
                  },
                }}
                renderListbox={(props, children) => (
                  <Box {...props} sx={{ display: "flex", flexDirection: "column", maxHeight: "200px" }}>
                    {children}
                    {totalPages > 1 && (
                      <Box sx={{ p: 1, display: "flex", justifyContent: "center" }}>
                        <Pagination
                          count={totalPages}
                          page={page + 1}
                          onChange={handlePageChange}
                          color="primary"
                          size="small"
                          sx={{ mt: 1 }}
                        />
                      </Box>
                    )}
                  </Box>
                )}
              />
            </Box>
          )}

          {/* User field (User view) */}
          {role !== "admin" && (
            <TextField
              label="User"
              value={
                loggedInUser && (loggedInUser.firstName || loggedInUser.lastName)
                  ? `${loggedInUser.firstName || ""} ${loggedInUser.lastName || ""}`.trim()
                  : "Loading user..."
              }
              InputProps={{ readOnly: true }}
              fullWidth
            />
          )}

          {/* Organisation */}
          <FormControl fullWidth variant="outlined">
            <InputLabel id="organisation-label">Organisation *</InputLabel>
            <Select
              labelId="organisation-label"
              value={selectedOrganisationId}
              onChange={handleOrganisationChange}
              label="Organisation *"
            >
              {organisations.map((org) => (
                <MenuItem key={org._id} value={org._id}>
                  {org.organisationName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Category */}
          <FormControl
            fullWidth
            disabled={!selectedOrganisationId}
            variant="outlined"
          >
            <InputLabel id="category-label">Category *</InputLabel>
            <Select
              labelId="category-label"
              value={selectedCategoryId}
              onChange={handleCategoryChange}
              label="Category *"
            >
              {categories.map((cat) => (
                <MenuItem key={cat._id} value={cat._id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Percentage */}
          <TextField
            label="Discount Percentage"
            value={percentage}
            InputProps={{ readOnly: true }}
            fullWidth
          />

          {/* Bill Amount */}
          <TextField
            label="Bill Amount *"
            type="number"
            value={billAmount}
            onChange={handleBillChange}
            fullWidth
          />

          {/* Discounted Amount */}
          {discountedAmount && (
            <TextField
              label="Discounted Amount"
              value={`RS. ${discountedAmount}`}
              InputProps={{ readOnly: true }}
              fullWidth
              sx={{ mt: 1 }}
            />
          )}

          {/* Get Promo Code */}
          <Button
            variant="contained"
            onClick={handleGetPromoCode}
            disabled={
              !selectedUserId ||
              !selectedOrganisationId ||
              !selectedCategoryId ||
              !billAmount
            }
          >
            Get Promo Code
          </Button>
        </Stack>
      </Paper>

      {/* Table */}
      {tableData && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" mb={2}>
            Promo Code Details
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Organisation</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Percentage</TableCell>
                <TableCell>Bill Amount</TableCell>
                <TableCell>Discounted Amount</TableCell>
                <TableCell>Promo Code</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{tableData.userName}</TableCell>
                <TableCell>{tableData.organisation}</TableCell>
                <TableCell>{tableData.category}</TableCell>
                <TableCell>{tableData.percentage}%</TableCell>
                <TableCell>{tableData.billAmount}</TableCell>
                <TableCell>{tableData.discountedAmount}</TableCell>
                <TableCell>{tableData.promoCode}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Button sx={{ mt: 2 }} variant="contained" onClick={handleSave}>
            Save
          </Button>
        </Paper>
      )}

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={success ? "success" : "error"}>{promoMessage}</Alert>
      </Snackbar>
    </Container>
  );
};

export default UserPromoCodePage;