import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Select,
  MenuItem,
  Grid,
  Card,
  CardMedia,
  Autocomplete,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate, useParams } from "react-router-dom";
import {
  scanCard,
  getUserCategories,
  updateUserDetails,
} from "../../api-services/user";
import { getUserDetailsById } from "../../api-services/admin";
import { Loading } from "../../components";
import { notification, category } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { createPrescription, getAllMedicines } from "../../api-services/admin";
import { apiRequestStatuses, descriptionOptions } from "../../common/constant";
import { calculateAge } from "../../utils/common";
import FileUploadModal from "../../components/fileUploadComponent";
import UserInfoGrid from "./userInfoGrid";

const PrescriptionPage = () => {
  const { cardNumber, userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [patientDetails, setPatientDetails] = useState(null);
  const [medications, setMedications] = useState([
    { name: "", morning: 0, afternoon: 0, night: 0, days: 1, description: "" },
  ]);
  const [remarks, setRemarks] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [loading, setLoading] = useState(true);
  const [newUser, setNewUser] = useState(true);
  const [error, setError] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [updatedDetails, setUpdatedDetails] = useState({});
  const [categories, setCategories] = useState([]);
  const [medicationOptions, setMedicationOptions] = useState([]);
  const { orgId } = useSelector((state) => state.auth);
  const [s3Urls, setS3Urls] = useState([]);

  const doctor = {
    name: "Dr. Tayyab",
    qualification: "Paeds Specialist",
    // experience: "10 years",
    // specialty: "Cardiology",
  };

  const handleUploadSuccess = (urls) => {
    setS3Urls(urls);
  };

  const fetchUserCategories = async () => {
    try {
      const res = await getUserCategories(orgId);
      setCategories(res.payload.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const fetchMedicines = async () => {
    try {
      const res = await getAllMedicines();
      setMedicationOptions(res.payload.data.medicines);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const fetchUserDetails = async () => {
    try {
      // const res = await getUserDetails(cardNumber);
      const res = await getUserDetailsById(userId);
      const userData = res.payload.data;
      setUserDetails(userData);
      setUpdatedDetails(userData);
      setNewUser(
        !userData.parentUserId &&
          (!userData.mobileNo || userData.mobileNo.trim() === "")
      );

      if (userData) {
        let dobToAge = calculateAge(userData?.dob);
        setPatientDetails({
          id: userData?._id || "",
          name: userData?.firstName + " " + userData?.lastName || "",
          gender: userData?.gender || "",
          age: dobToAge || "",
        });
        setRemarks(userData?.remarks || "");
        setSpecialInstructions(userData?.specialInstructions || "");
      } else {
        dispatch(
          notification({
            open: true,
            type: "error",
            message: "User not found for the provided card number.",
          })
        );
        return;
      }
    } catch (err) {
      console.error("Error fetching user details:", err);
      setError("Failed to fetch user details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    fetchUserCategories();
    fetchMedicines();
  }, [cardNumber]);

  const handleMenuClick = (cat) => {
    dispatch(
      category({
        category: {
          id: cat?._id,
          name: cat?.categoryName,
          userID: userDetails._id,
          cardNo: cardNumber,
        },
      })
    );
    if (cat.isGeneric && cat?.categoryName === "Prescription") {
      navigate("/prescription");
    } else {
      navigate("/files");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDetails({ ...updatedDetails, [name]: value });
  };

  const handleTimingChange = (index, field, value) => {
    const updatedMeds = [...medications];
    updatedMeds[index][field] = Math.max(0, value);
    setMedications(updatedMeds);
  };

  const handleDescriptionChange = (index, value) => {
    const updatedMeds = [...medications];
    updatedMeds[index].description = value;
    setMedications(updatedMeds);
  };

  const addMedicationRow = () => {
    setMedications([
      ...medications,
      {
        name: "",
        morning: 0,
        afternoon: 0,
        night: 0,
        days: 1,
        description: "",
      },
    ]);
  };

  const deleteMedicationRow = (index) => {
    const updatedMeds = medications.filter((_, i) => i !== index);
    setMedications(updatedMeds);
  };

  const handleSubmit = async () => {
    // const userId = userId;

    let updatedUserDetails = { ...updatedDetails };

    if (newUser) {
      if (!updatedUserDetails?.firstName) {
        dispatch(
          notification({
            open: true,
            type: "error",
            message: `User FirstName Required!`,
          })
        );
      } else if (!updatedUserDetails?.lastName) {
        dispatch(
          notification({
            open: true,
            type: "error",
            message: `User LastName Required!`,
          })
        );
      } else if (!updatedUserDetails?.mobileNo) {
        dispatch(
          notification({
            open: true,
            type: "error",
            message: `User Mobile Number Required!`,
          })
        );
      } else if (!updatedUserDetails?.gender) {
        dispatch(
          notification({
            open: true,
            type: "error",
            message: `User Gender Required!`,
          })
        );
      } else {
        try {
          const res = await updateUserDetails(userId, updatedUserDetails);

          if (res.metadata.status === apiRequestStatuses.SUCCESS) {
            // fetchUserDetails();

            dispatch(
              notification({
                open: true,
                type: "success",
                message: `User details updated successfully!`,
              })
            );
          }
        } catch (error) {
          console.log("Error updating user details:", error);
        }
      }
    }

    const tablets = medications.map((med) => ({
      tabletName: med?.name,
      isMorning: med?.morning,
      isEvening: med?.afternoon,
      isNight: med?.night,
      days: med?.days,
      description: med?.description,
    }));
    const prescriptionData = {
      specialRemarks: remarks,
      specialInstructions: specialInstructions,
      images: s3Urls,
      tablets,
      cardNumber,
    };

    try {
      await scanCard(cardNumber);
      // const userData = res?.payload?.data?.user;

      const response = await createPrescription(prescriptionData, userId);

      if (response.metadata.status === apiRequestStatuses.SUCCESS) {
        setMedications([
          { name: "", morning: 0, afternoon: 0, night: 0, description: "" },
        ]);
        setRemarks("");
        setSpecialInstructions("");
        setS3Urls(null);
        fetchUserDetails();
        fetchUserCategories();
      }

      // Dispatch success notification
      dispatch(
        notification({
          open: true,
          type: "success",
          message: "Prescription saved successfully!",
        })
      );
    } catch (error) {
      console.error(
        "Error saving prescription:",
        error.response?.data || error.message
      );
      dispatch(
        notification({
          open: true,
          type: "error",
          message: "Failed to save prescription. Please try again.",
        })
      );
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Grid
      sx={{
        minHeight: "100vh",
        marginTop: "30px",
      }}
    >
      <Box
        sx={{
          padding: 2,
          minHeight: "100vh",
        }}
      >
        <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
          {newUser ? (
            <>
              {/* Left Side: Patient Information */}
              <Box sx={{ width: "65%" }}>
                <Paper elevation={3} sx={{ padding: 3, marginBottom: 4 }}>
                  <UserInfoGrid
                    userDetails={userDetails}
                    updatedDetails={updatedDetails}
                    handleInputChange={handleInputChange}
                  />
                </Paper>
              </Box>
            </>
          ) : (
            <Box sx={{ width: "65%" }}>
              <Paper elevation={3} sx={{ padding: 3, marginBottom: 4 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Patient Information
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                  <strong>Patient ID:</strong> {patientDetails?.id}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                  <strong>Patient Name:</strong> {patientDetails?.name}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                  <strong>Gender:</strong> {patientDetails?.gender}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                  <strong>Age:</strong> {patientDetails?.age}
                </Typography>
              </Paper>
            </Box>
          )}

          {/* Right Side: Doctor Qualification Card */}
          <Box sx={{ width: "35%" }}>
            <Paper elevation={3} sx={{ padding: 3, marginBottom: 4 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Doctor's Details
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                <strong>Name:</strong> {doctor.name}
              </Typography>
              <Typography variant="body1">{doctor.qualification}</Typography>
            </Paper>
          </Box>
        </Box>
        {/* Header Section */}

        <Paper elevation={3} sx={{ padding: 3, marginBottom: 4 }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            gutterBottom
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            Prescription
            <Box sx={{ ml: "auto" }}>
              {" "}
              <FileUploadModal onUploadSuccess={handleUploadSuccess} />{" "}
            </Box>{" "}
            {/* Align to right */}
          </Typography>
          <TableContainer component={Paper} sx={{ marginTop: 2 }}>
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    background: "linear-gradient(90deg, #001F54, #9B2ECA)",
                  }}
                >
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                    Medication
                  </TableCell>
                  <TableCell
                    sx={{ color: "#fff", fontWeight: "bold" }}
                    align="center"
                  >
                    Morning (صبح)
                  </TableCell>
                  <TableCell
                    sx={{ color: "#fff", fontWeight: "bold" }}
                    align="center"
                  >
                    Afternoon (دوپہر)
                  </TableCell>
                  <TableCell
                    sx={{ color: "#fff", fontWeight: "bold" }}
                    align="center"
                  >
                    Night (رات)
                  </TableCell>
                  <TableCell
                    sx={{ color: "#fff", fontWeight: "bold" }}
                    align="center"
                  >
                    Days (دن)
                  </TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                    Description
                  </TableCell>
                  <TableCell
                    sx={{ color: "#fff", fontWeight: "bold" }}
                    align="center"
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {medications.map((med, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff",
                    }}
                  >
                    <TableCell>
                      <Autocomplete
                        freeSolo
                        disableClearable
                        options={medicationOptions}
                        getOptionLabel={(option) =>
                          typeof option === "string"
                            ? option
                            : option?.medicineName || ""
                        }
                        value={med.name || ""}
                        onChange={(event, newValue) => {
                          const updatedMeds = [...medications];
                          if (typeof newValue === "string") {
                            // If user typed a custom value
                            updatedMeds[index].name = newValue;
                          } else if (newValue && typeof newValue === "object") {
                            // If user selected an option from the dropdown
                            updatedMeds[index].name = newValue.medicineName;
                          } else {
                            // If cleared
                            updatedMeds[index].name = "";
                          }
                          setMedications(updatedMeds);
                        }}
                        onInputChange={(event, newInputValue) => {
                          const updatedMeds = [...medications];
                          updatedMeds[index].name = newInputValue;
                          setMedications(updatedMeds);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Search or select medication"
                            variant="outlined"
                            size="small"
                          />
                        )}
                        fullWidth
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        type="number"
                        value={med.morning}
                        onChange={(e) =>
                          handleTimingChange(
                            index,
                            "morning",
                            parseInt(e.target.value, 10)
                          )
                        }
                        inputProps={{ min: 0 }}
                        sx={{ width: "70px" }}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        type="number"
                        value={med.afternoon}
                        onChange={(e) =>
                          handleTimingChange(
                            index,
                            "afternoon",
                            parseInt(e.target.value, 10)
                          )
                        }
                        inputProps={{ min: 0 }}
                        sx={{ width: "70px" }}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        type="number"
                        value={med.night}
                        onChange={(e) =>
                          handleTimingChange(
                            index,
                            "night",
                            parseInt(e.target.value, 10)
                          )
                        }
                        inputProps={{ min: 0 }}
                        sx={{ width: "70px" }}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        type="number"
                        value={med.days}
                        onChange={(e) =>
                          handleTimingChange(
                            index,
                            "days",
                            parseInt(e.target.value, 10)
                          )
                        }
                        inputProps={{ min: 0 }}
                        sx={{ width: "70px" }}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Select
                        fullWidth
                        value={med.description}
                        onChange={(e) =>
                          handleDescriptionChange(index, e.target.value)
                        }
                        size="small"
                      >
                        {descriptionOptions.map((option, i) => (
                          <MenuItem key={i} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="error"
                        onClick={() => deleteMedicationRow(index)}
                        sx={{
                          "&:hover": {
                            transform: "scale(1.1)",
                            transition: "transform 0.2s",
                          },
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell>
                    <IconButton
                      onClick={addMedicationRow}
                      sx={{
                        background: "linear-gradient(90deg, #001F54, #9B2ECA)",
                        "&:hover": {
                          transform: "scale(1.1)",
                          transition: "transform 0.2s",
                        },
                        marginRight: 1,
                        color: "white",
                      }}
                    >
                      <AddCircleOutlineIcon fontSize="large" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Remarks Section */}
        <Paper elevation={3} sx={{ padding: 3, marginBottom: 4 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Consultant Remarks
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="Enter consultant remarks..."
            variant="outlined"
          />
        </Paper>

        {/* Special Instructions Section */}
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Special Instructions
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
            placeholder="Enter Special Instructions..."
            variant="outlined"
          />
        </Paper>

        <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
          <Grid
            container
            sx={{
              display: "flex",
              flexWrap: "nowrap",
              overflowX: "auto",
              gap: 2,
              padding: 2,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {categories.map((category, index) => {
              return (
                <Card
                  key={index}
                  onClick={() => handleMenuClick(category)}
                  sx={{
                    cursor: "pointer",
                    minHeight: "140px",
                    minWidth: "210px",
                    position: "relative",
                    overflow: "hidden",
                    flexShrink: 0,
                  }}
                >
                  <Box sx={{ position: "relative" }}>
                    <CardMedia
                      component="img"
                      height="150"
                      image={`${process.env.PUBLIC_URL}/ApnaLogoPrevious.png`}
                      alt={category.categoryName}
                      sx={{
                        filter: "brightness(70%)",
                      }}
                    />
                    <Typography
                      variant="h6"
                      color="white"
                      align="center"
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                      }}
                    >
                      {category.categoryName}
                    </Typography>
                  </Box>
                </Card>
              );
            })}
          </Grid>
        </Paper>

        {/* Submit Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          <Button
            variant="contained"
            sx={{
              width: "250px", // Adjust width as needed
              background: "linear-gradient(90deg, #001F54, #9B2ECA)",
              color: "#fff",
              padding: "10px 0",
              "&:hover": {
                background: "linear-gradient(90deg, #001F54, #9B2ECA)",
              },
            }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Grid>
  );
};

export default PrescriptionPage;
