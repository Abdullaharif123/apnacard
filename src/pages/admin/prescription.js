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
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate, useParams } from "react-router-dom";
import {
  getUserDetails,
  scanCard,
  updateUserDetails,
  getUserCategories,
} from "../../api-services/user";
import { Loading } from "../../components";
import { notification, category } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { createPrescription } from "../../api-services/admin";
import { apiRequestStatuses, descriptionOptions } from "../../common/constant";
import { calculateAge } from "../../utils/common";
import FileUploadModal from "../../components/fileUploadComponent";
import UserInfoGrid from "./userInfoGrid";

const PrescriptionPage = () => {
  const { cardNumber } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [patientDetails, setPatientDetails] = useState(null);
  const [medications, setMedications] = useState([
    { name: "", morning: 0, afternoon: 0, night: 0, days: 1, description: "" },
  ]);
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [updatedDetails, setUpdatedDetails] = useState({});
  const [categories, setCategories] = useState([]);
  const { orgId } = useSelector((state) => state.auth);
  const [s3Urls, setS3Urls] = useState([]);

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

  const fetchUserDetails = async () => {
    try {
      const res = await getUserDetails(cardNumber);
      const userData = res.payload.data.existingUser;
      setUserDetails(userData);
      setUpdatedDetails(userData);

      if (userData) {
        let dobToAge = calculateAge(userData?.dob);
        setPatientDetails({
          id: userData?._id || "",
          name: userData?.firstName + " " + userData?.lastName || "",
          gender: userData?.gender || "",
          age: dobToAge || "",
        });
        setRemarks(userData?.remarks || "");
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
  }, [cardNumber]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDetails({ ...updatedDetails, [name]: value });
  };

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
      images: s3Urls,
      tablets,
    };

    const userId = userDetails._id;

    let updatedUserDetails = { ...updatedDetails };

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
        const updateUser = await updateUserDetails(userId, updatedUserDetails);

        if (updateUser.metadata.status === apiRequestStatuses.SUCCESS) {
          fetchUserDetails();

          dispatch(
            notification({
              open: true,
              type: "success",
              message: `User details updated successfully!`,
            })
          );
        }
        //Scan the card and Create Prescription.
        const res = await scanCard(cardNumber);
        const userData = res?.payload?.data?.user;

        const response = await createPrescription(
          prescriptionData,
          userData?._id
        );

        if (response.metadata.status === apiRequestStatuses.SUCCESS) {
          setMedications([
            { name: "", morning: 0, afternoon: 0, night: 0, description: "" },
          ]);
          setRemarks("");
          setS3Urls(null);
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
          "Error saving prescription or Error updating user details:",
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
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box
      sx={{
        padding: 4,
        // backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        marginTop: "30px",
      }}
    >
      {/* Header Section */}

      <Paper elevation={3} sx={{ padding: 3, marginBottom: 4 }}>
        <UserInfoGrid
          userDetails={userDetails}
          updatedDetails={updatedDetails}
          handleInputChange={handleInputChange}
        />
      </Paper>

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
                sx={{ background: "linear-gradient(90deg, #001F54, #9B2ECA)" }}
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
                  sx={{ backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff" }}
                >
                  <TableCell>
                    <TextField
                      fullWidth
                      value={med.name}
                      onChange={(e) => {
                        const updatedMeds = [...medications];
                        updatedMeds[index].name = e.target.value;
                        setMedications(updatedMeds);
                      }}
                      placeholder="Enter medication name"
                      variant="outlined"
                      size="small"
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
      <Paper elevation={3} sx={{ padding: 3 }}>
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
                    image={`${process.env.PUBLIC_URL}/logo.png`}
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
          Submit Prescription
        </Button>
      </Box>
    </Box>
  );
};

export default PrescriptionPage;
