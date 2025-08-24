import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";

import {
  getOrganisationCategories,
  getOrgCategoryPercentages,
  saveOrgCategoryPercentages,
} from "../api-services/superAdmin";

const PercentageDialog = ({ open, onClose, org, onSave }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleChange = (id, value) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat._id === id ? { ...cat, percentage: Number(value) } : cat
      )
    );
  };

  useEffect(() => {
    if (open && org?.id) {
      const fetchData = async () => {
        try {
          setLoading(true);

          // 1️⃣ Fetch assigned categories
          const categoryRes = await getOrganisationCategories(org.id);
          const assignedCategories = categoryRes?.categories || categoryRes || [];

          // 2️⃣ Fetch stored percentages
          const percentages = await getOrgCategoryPercentages(org.id) || [];

          // 3️⃣ Merge percentages into categories
          const merged = assignedCategories.map((cat) => {
            const catIdStr = String(cat._id);
            const p = percentages.find(
              (per) => String(per.categoryId) === catIdStr
            );
            return {
              _id: catIdStr,
              categoryName: cat.categoryName,
              percentage: p ? p.percentage : 0,
            };
          });

          setCategories(merged);
        } catch (err) {
          console.error("Error fetching categories or percentages:", err);
          setCategories([]);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    } else {
      setCategories([]);
    }
  }, [open, org]);

  const handleSubmit = async () => {
    try {
      const payload = categories.map((cat) => ({
        categoryId: cat._id,
        percentage: cat.percentage,
      }));

      await saveOrgCategoryPercentages(org.id, payload);

      setSnackbar({
        open: true,
        message: "Percentages saved successfully!",
        severity: "success",
      });

      if (onSave) onSave();
      onClose();
    } catch (err) {
      console.error("Error saving percentages:", err);
      setSnackbar({
        open: true,
        message: "Failed to save percentages.",
        severity: "error",
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{org?.name} Categories Percentage</DialogTitle>
      <DialogContent>
        {loading && <Typography>Loading...</Typography>}

        {!loading && categories.length === 0 && (
          <Typography>No categories assigned to this organisation.</Typography>
        )}

        {!loading &&
          categories.map((cat) => (
            <Box
              key={cat._id}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              my={1}
            >
              <Typography>{cat.categoryName}</Typography>
              <TextField
                type="number"
                variant="outlined"
                size="small"
                value={cat.percentage}
                onChange={(e) => handleChange(cat._id, e.target.value)}
                style={{ width: "100px" }}
                inputProps={{ min: 0, max: 100 }}
              />
            </Box>
          ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={categories.length === 0 || loading}
        >
          Save
        </Button>
      </DialogActions>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

export default PercentageDialog;
