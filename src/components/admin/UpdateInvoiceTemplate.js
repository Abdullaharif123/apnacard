import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import {
  updateOrganizationInvoiceTemplate,
  getOrganisationById,
} from "../../api-services/admin";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "../../redux/slices/authSlice";
import { apiRequestStatuses } from "../../common/constant";

const UpdateInvoiceTemplate = () => {
  const dispatch = useDispatch();
  const { orgId } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    organizationName: "",
    address: "",
    phoneNumber: "",
  });
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(true); // Fetching state

  // Fetch organization details on mount
  useEffect(() => {
    const fetchOrganizationDetails = async () => {
      try {
        const res = await getOrganisationById(orgId); // Fetch details using ID
        if (
          res?.payload?.data &&
          res.metadata.status === apiRequestStatuses.SUCCESS
        ) {
          setFormData({
            organizationName:
              res.payload.data.invoiceTemplate?.organizationName || "",
            address: res.payload.data.invoiceTemplate?.address || "",
            phoneNumber: res.payload.data.invoiceTemplate?.phoneNumber || "",
          });
          // dispatch(
          //   notification({
          //     open: true,
          //     type: "success",
          //     message: "Invoice Template Found successfully!",
          //   })
          // );
        }
      } catch (error) {
        dispatch(
          notification({
            open: true,
            type: "error",
            message: "Failed to fetch organization details!",
          })
        );
      } finally {
        setFetchingData(false);
      }
    };

    if (orgId) {
      fetchOrganizationDetails();
    }
  }, [orgId, dispatch]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Check if all fields are filled
  const isFormValid =
    formData.organizationName.trim() !== "" &&
    formData.address.trim() !== "" &&
    formData.phoneNumber.trim() !== "";

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await updateOrganizationInvoiceTemplate(formData);
      if (response?.metadata?.status === "SUCCESS") {
        dispatch(
          notification({
            open: true,
            type: "success",
            message: "Invoice template updated successfully!",
          })
        );
      } else {
        throw new Error(response?.metadata?.message || "Failed to update.");
      }
    } catch (error) {
      dispatch(
        notification({
          open: true,
          type: "error",
          message: "Error updating invoice template!",
        })
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Paper
        elevation={3}
        sx={{ padding: 4, width: "100%", maxWidth: 500, textAlign: "center" }}
      >
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Update Invoice Template
        </Typography>

        {fetchingData ? (
          <CircularProgress />
        ) : (
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Organization Name"
              name="organizationName"
              value={formData.organizationName}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={!isFormValid || loading}
            >
              {loading ? <CircularProgress size={24} /> : "Update Template"}
            </Button>
          </form>
        )}
      </Paper>
    </Box>
  );
};

export default UpdateInvoiceTemplate;
