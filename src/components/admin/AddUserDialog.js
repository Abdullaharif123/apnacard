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
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  IconButton,
  Typography,
  Collapse,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { addNewUser, getOrganisationName } from "../../api-services/admin";
import {
  apiRequestStatuses,
  cardTypeSelect,
  genderSelect,
} from "../../common/constant/index";
import { notification } from "../../redux/slices/authSlice";
import InvoicePreview from "./InvoicePreview"; // ✅ Import the InvoicePreview Component

const AddUserDialog = ({ open, onClose, fetchUsers }) => {
  const dispatch = useDispatch();
  const [organisation, setOrganisation] = useState([]);
  const [showInvoicePreview, setShowInvoicePreview] = useState(false); // ✅ State for Invoice Preview
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    cnic: "",
    mobileNo: "",
    organizationId: "",
    dob: "",
    gender: "",
    cardType: "",
    cardNumber: "",
    role: "User",
    familyMembers: [],
  });

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await getOrganisationName();
        if (response?.payload?.data) {
          setOrganisation(response.payload.data);

          setUserDetails((prevDetails) => ({
            ...prevDetails,
            organizationId: response.payload.data.organisationName, // Set org name
          }));
        }
      } catch (err) {
        console.error("Error fetching organization:", err);
      }
    };

    fetchDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserDetails((prevDetails) => {
      let updatedDetails = { ...prevDetails, [name]: value };

      if (name === "cardType") {
        if (value === cardTypeSelect[1].value) {
          updatedDetails.familyMembers =
            updatedDetails.familyMembers.length > 0
              ? updatedDetails.familyMembers
              : [{ name: "", age: "", relation: "", gender: "" }];
        } else {
          updatedDetails.familyMembers = [];
        }
      }

      return { ...updatedDetails };
    });
  };

  const handleFamilyMemberChange = (index, field, value) => {
    setUserDetails((prevDetails) => {
      const updatedMembers = [...prevDetails.familyMembers];
      updatedMembers[index] = { ...updatedMembers[index], [field]: value }; // ✅ Ensure all fields update

      return { ...prevDetails, familyMembers: updatedMembers };
    });
  };

  const handleAddFamilyMember = () => {
    if (userDetails.familyMembers.length < 10) {
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        familyMembers: [
          ...prevDetails.familyMembers,
          { name: "", age: "", relation: "", gender: "" },
        ],
      }));
    }
  };

  const handleRemoveFamilyMember = (index) => {
    setUserDetails((prevDetails) => {
      const updatedMembers = prevDetails.familyMembers.filter(
        (_, i) => i !== index
      );
      return { ...prevDetails, familyMembers: updatedMembers };
    });
  };

  const handleSubmit = async () => {
    try {
      const res = await addNewUser(userDetails);
      if (res.metadata.status === apiRequestStatuses.SUCCESS) {
        dispatch(
          notification({
            open: true,
            type: "success",
            message: "User created successfully!",
          })
        );
      } else {
        dispatch(
          notification({
            open: true,
            type: "error",
            message: res.metadata.message || "User creation failed!",
          })
        );
      }
      onClose();
      fetchUsers();
    } catch (error) {
      dispatch(
        notification({
          open: true,
          type: "error",
          message: "User creation failed!",
        })
      );
    }
  };

  const handleGenerateInvoice = () => {
    setShowInvoicePreview(true);
  };

  const handleInvoiceConfirm = async () => {
    setShowInvoicePreview(false);
    await handleSubmit(); // ✅ Submit user after confirming invoice
  };

  const handleInvoiceCancel = () => {
    setShowInvoicePreview(false);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        {showInvoicePreview ? "Invoice Preview" : "Add New User"}
      </DialogTitle>

      {/* ✅ Make content scrollable when there are too many fields */}
      {/* <DialogContent sx={{ maxHeight: "70vh", overflowY: "auto" }}> */}
      <DialogContent sx={{ maxHeight: "70vh", overflowY: "auto" }}>
        {showInvoicePreview ? (
          <InvoicePreview
            familyMembers={userDetails.familyMembers}
            onConfirm={handleInvoiceConfirm}
            onCancel={handleInvoiceCancel}
          />
        ) : (
          <Grid container spacing={2}>
            {[
              { label: "First Name", name: "firstName" },
              { label: "Last Name", name: "lastName" },
              { label: "Email", name: "email" },
              { label: "CNIC", name: "cnic" },
              { label: "Mobile Number", name: "mobileNo" },
              { label: "Date of Birth", name: "dob", type: "date" },
              { label: "Card Number", name: "cardNumber" },
              { label: "Organisation", name: "organizationId", disabled: true },
              { label: "Role", name: "role", disabled: true },
            ].map((field, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <TextField
                  fullWidth
                  label={field.label}
                  name={field.name}
                  value={userDetails[field.name] || ""}
                  onChange={handleChange}
                  type={field.type || "text"}
                  disabled={field.disabled}
                  InputLabelProps={field.name === "dob" ? { shrink: true } : {}}
                />
              </Grid>
            ))}

            {/* Gender Selection */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select
                  name="gender"
                  value={userDetails.gender}
                  onChange={handleChange}
                >
                  {genderSelect.map((gen) => (
                    <MenuItem key={gen.value} value={gen.value}>
                      {gen.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Card Type Selection */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Card Type</InputLabel>
                <Select
                  name="cardType"
                  value={userDetails.cardType}
                  onChange={handleChange}
                >
                  {cardTypeSelect.map((card) => (
                    <MenuItem key={card.value} value={card.value}>
                      {card.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Collapse
              in={userDetails.cardType === cardTypeSelect[1].value}
              sx={{ width: "100%" }}
            >
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Family Members
                </Typography>
              </Grid>

              {userDetails.familyMembers.map((member, index) => (
                <Grid container spacing={2} key={index} alignItems="center">
                  <Grid item xs={3}>
                    <TextField
                      fullWidth
                      required
                      label="Name"
                      value={member.name}
                      onChange={(e) =>
                        handleFamilyMemberChange(index, "name", e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      fullWidth
                      required
                      label="Age"
                      type="number"
                      value={member.age}
                      onChange={(e) =>
                        handleFamilyMemberChange(index, "age", e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      fullWidth
                      label="Relation"
                      value={member.relation}
                      required
                      onChange={(e) =>
                        handleFamilyMemberChange(
                          index,
                          "relation",
                          e.target.value
                        )
                      }
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <FormControl fullWidth>
                      <InputLabel>Gender</InputLabel>
                      <Select
                        value={member.gender}
                        onChange={(e) =>
                          handleFamilyMemberChange(
                            index,
                            "gender",
                            e.target.value
                          )
                        }
                      >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton onClick={() => handleRemoveFamilyMember(index)}>
                      <CloseIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}

              <Grid item xs={12}>
                <IconButton onClick={handleAddFamilyMember}>
                  <AddIcon />
                </IconButton>
              </Grid>
            </Collapse>
          </Grid>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        {!showInvoicePreview && (
          <Button
            onClick={
              userDetails.cardType === cardTypeSelect[1].value &&
              userDetails.familyMembers.length > 0
                ? handleGenerateInvoice
                : handleSubmit
            }
            color="primary"
          >
            {userDetails.cardType === cardTypeSelect[1].value &&
            userDetails.familyMembers.length > 0
              ? "Generate Invoice"
              : "Add User"}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default AddUserDialog;
