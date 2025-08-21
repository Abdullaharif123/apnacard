import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { addNewUser } from "../../api-services/user";
import {
  apiRequestStatuses,
  genderSelect,
  roleSelect,
} from "../../common/constant/index";
import { notification } from "../../redux/slices/authSlice";
import { getOrganisationNames } from "../../api-services/superAdmin";

const AddUserDialog = ({ open, onClose, fetchUsers }) => {
  const dispatch = useDispatch();
  const [organisations, setOrganisations] = useState([]);
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    cnic: "",
    mobileNo: "",
    organizationId: "",
    dob: "",
    gender: "",
    cardNumber: "",
    role: "",
  });

  const fetchDetails = async () => {
    try {
      const response = await getOrganisationNames();

      setOrganisations(response.payload.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await addNewUser(userDetails);
      if (res.metadata.status === apiRequestStatuses.SUCCESS) {
        dispatch(
          notification({
            open: true,
            type: "success",
            message: `User created successfully!`,
          })
        );
        onClose();
        fetchUsers();
      } else {
        dispatch(
          notification({
            open: true,
            type: "error",
            message: `${res.metadata.message}!`,
          })
        );
      }
    } catch (error) {
      dispatch(
        notification({
          open: true,
          type: "error",
          message: `User creation failed!`,
        })
      );
    }
  };

  const formFields = [
    {
      label: "First Name",
      name: "firstName",
      value: userDetails.firstName,
      sx: { marginTop: 2 },
      type: "text",
    },
    {
      label: "Last Name",
      name: "lastName",
      value: userDetails.lastName,
      sx: { marginTop: 2 },
      type: "text",
    },
    { label: "Email", name: "email", value: userDetails.email, type: "text" },
    { label: "CNIC", name: "cnic", value: userDetails.cnic, type: "text" },
    {
      label: "Mobile Number",
      name: "mobileNo",
      value: userDetails.mobileNo,
      type: "text",
    },
    {
      label: "Date of Birth",
      name: "dob",
      value: userDetails.dob,
      type: "date",
      InputLabelProps: { shrink: true },
    },
    {
      label: "Card Number",
      name: "cardNumber",
      value: userDetails.cardNumber,
      type: "text",
    },
  ];

  const selectFields = [
    {
      label: "Organisation",
      name: "organizationId",
      value: userDetails.organizationId || "",
      options: organisations.map((org) => ({
        value: org?._id,
        label: org?.organisationName,
      })),
    },
    {
      label: "Gender",
      name: "gender",
      value: userDetails.gender || "",
      options: genderSelect.map((gen) => ({
        value: gen?.value,
        label: gen?.label,
      })),
    },
    {
      label: "Role",
      name: "role",
      value: userDetails.role || "",
      options: roleSelect.map((rol) => ({
        value: rol?.value,
        label: rol?.label,
      })),
    },
  ];

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add New User</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {formFields.map((field, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <TextField
                fullWidth
                label={field.label}
                name={field.name}
                value={field.value}
                onChange={handleChange}
                type={field.type}
                InputLabelProps={field.InputLabelProps}
                sx={field.sx}
              />
            </Grid>
          ))}

          {selectFields.map((field, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <FormControl fullWidth>
                <InputLabel id={`${field.name}-label`}>
                  {field.label}
                </InputLabel>
                <Select
                  labelId={`${field.name}-label`}
                  label={field.label}
                  name={field.name}
                  value={field.value}
                  onChange={handleChange}
                >
                  {field.options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" sx={{ width: "150px" }}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" sx={{ width: "150px" }}>
          Add User
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUserDialog;
