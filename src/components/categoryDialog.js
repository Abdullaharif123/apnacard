import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Dialog, DialogTitle, DialogContent, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import {
  handleOrganisationCategoryUpdate,
  getOrganisationById,
} from "../api-services/superAdmin";
import { getActiveCategories } from "../api-services/superAdmin";
import { apiRequestStatuses } from "../common/constant/index";
import { notification } from "../redux/slices/authSlice";

const CategoryDialog = ({ open, onClose, org }) => {
  const dispatch = useDispatch();
  const [catId, setCatId] = useState([]);
  const [categories, setCategories] = useState([]);
  const [organisation, setOrganisation] = useState({
    name: "",
    id: "",
    isActive: "",
    categories: [],
  });

  const fetchOrganisation = async () => {
    try {
      const organ = await getOrganisationById(org?.id);

      setOrganisation({
        id: organ.payload.data._id,
        name: organ.payload.data.organisationName,
        isActive: organ.payload.data.isActive,
        categories: organ.payload.data.categories,
      });
    } catch (err) {
      console.error("Error fetching Categories:", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const catResponse = await getActiveCategories();

      setCategories(catResponse.payload.data);
    } catch (err) {
      console.error("Error fetching Categories:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchOrganisation(org?.id);
  }, []);

  const handleSwitchChange = async (e, catid) => {
    if (e.target.checked) {
      setCatId([...catId, catid]);
    } else {
      setCatId(catId.filter((item) => item !== catid));
    }

    const res = await handleOrganisationCategoryUpdate(
      org?.id,
      catid,
      e.target.checked
    );

    if (res.metadata.status === apiRequestStatuses.SUCCESS) {
      fetchCategories();
      fetchOrganisation(org?.id);

      dispatch(
        notification({
          open: true,
          type: "success",
          message: "Category Updated successfully!",
        })
      );
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        component: "form",
        sx: { width: "300px" },
      }}
    >
      <DialogTitle sx={{ fontWeight: "bold" }}>
        {org?.name} Categories
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        {categories.map((category, index) => {
          let checked =
            catId.includes(category._id) ||
            organisation.categories.includes(category._id);

          return (
            <Box
              key={index}
              sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}
            >
              <Switch
                sx={{ marginRight: 2 }}
                checked={checked}
                onChange={(e) => handleSwitchChange(e, category._id)}
              />
              <TextField
                autoFocus
                margin="dense"
                id={`categoryName-${index}`}
                name={`categoryName-${index}`}
                value={category.categoryName}
                variant="standard"
                sx={{
                  width: "100%",
                  "& .MuiInputBase-input.Mui-disabled": {
                    color: "rgba(0, 0, 0, 0.87)",
                    WebkitTextFillColor: "rgba(0, 0, 0, 0.87)",
                  },
                }}
                disabled
              />
            </Box>
          );
        })}
      </DialogContent>
      {/* <DialogActions>
          <Button type="submit">Save</Button>
        </DialogActions> */}
    </Dialog>
  );
};

export default CategoryDialog;
