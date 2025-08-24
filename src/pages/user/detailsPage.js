import React, { useState, useEffect } from "react";
import {
  Typography,
  Paper,
  Button,
  TextField,
  Avatar,
  IconButton,
  Grid,
  Tooltip,
  Card,
  CardMedia,
  Box,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InputAdornment from "@mui/material/InputAdornment";
import EditIcon from "@mui/icons-material/Edit";
import {
  updateUserDetails,
  getUserDetails,
  uploadtos3,
} from "../../api-services/user";
import { notification } from "../../redux/slices/authSlice";
import {
  apiRequestStatuses,
  bucketFolderNames,
} from "../../common/constant/index";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserCategories } from "../../api-services/user";
import { category } from "../../redux/slices/authSlice";

const DetailsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState(null);
  const [updatedDetails, setUpdatedDetails] = useState({});
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePreview, setProfilePreview] = useState("");
  const [categories, setCategories] = useState([]);
  const { cardNumber, orgId } = useSelector((state) => state.auth);

  const fetchUserDetails = async () => {
    try {
      // const cardNumber = localStorage.getItem("cardNumber");
      const res = await getUserDetails(cardNumber);
      const userData = res.payload.data.existingUser;
      setUserDetails(userData);
      setUpdatedDetails(userData);
      setProfilePreview(userData.profilePicture);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const fetchUserCategories = async () => {
    try {
      const res = await getUserCategories(orgId);
      setCategories(res.payload.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
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
    dispatch(category({ category: { id: cat?._id, name: cat?.categoryName } }));
    navigate("/files");
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
    setProfilePreview(URL.createObjectURL(file));
  };

  const handleUpdate = async () => {
    const userId = userDetails._id;

    let updatedUserDetails = { ...updatedDetails };

    // If a new profile picture is selected, upload it first
    if (profilePicture) {
      try {
        const profilePictureUrl = await uploadtos3(
          profilePicture,
          bucketFolderNames.profilePictures
        );
        updatedUserDetails.profilePicture = profilePictureUrl;

        // Update state for immediate UI feedback
        setUserDetails((prev) => ({
          ...prev,
          profilePicture: profilePictureUrl,
        }));
        setUpdatedDetails((prevDetails) => ({
          ...prevDetails,
          profilePicture: profilePictureUrl,
        }));
      } catch (error) {
        console.log("Error uploading profile picture:", error);
        return;
      }
    }

    try {
      const res = await updateUserDetails(userId, updatedUserDetails);

      if (res.metadata.status === apiRequestStatuses.SUCCESS) {
        setUserDetails(updatedUserDetails);

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
  };

  if (!userDetails) {
    return <Typography>Loading...</Typography>;
  }

  // Styles for read-only fields
  const readOnlyStyle = {
    opacity: 0.6,
    pointerEvents: "none",
  };

  // Styles to center the grid and improve spacing
  const gridContainerStyle = {
    justifyContent: "center", // Centers the grid items horizontally
    paddingLeft: "20px", // Adds padding to the left
    paddingRight: "20px", // Adds padding to the right
  };

  return (
    <Grid
      container
      sx={{
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: 0,
        padding: 0,
        overflow: "hidden",
        boxSizing: "border-box",
        backgroundColor: "#F9FAFC",
      }}
    >
      <Grid
        item
        xs={12}
        md={8}
        lg={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          padding: "0 16px",
          boxSizing: "border-box",
          marginTop: "4%",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 3,
            width: "100%",
            maxWidth: "500px",
            backgroundColor: "#FFFFFF",
            borderRadius: "8px",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            sx={{
              marginBottom: "20px",
              textAlign: "center",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: "200px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                borderRadius: "8px",
              }}
            >
              {/* Cover Image */}
              <CardMedia
                component="img"
                src={"/ApnaLogoPrevious.png"}
                alt="Cover Image"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 1,
                }}
              />

              {/* Profile Picture */}
              <Avatar
                alt={`${userDetails?.firstName} ${userDetails?.lastName}`}
                src={profilePreview}
                sx={{
                  width: 150,
                  height: 150,
                  position: "relative",
                  zIndex: 2,
                  border: "4px solid white",
                }}
              />

              {/* Edit Icon for Profile Picture */}
              <IconButton
                component="label"
                sx={{
                  position: "absolute",
                  bottom: 10,
                  right: "calc(50% - 75px)",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  zIndex: 3,
                }}
              >
                <EditIcon />
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                />
              </IconButton>
            </Box>
          </Typography>

          {/* User Details Form */}
          <Grid container spacing={2} sx={gridContainerStyle}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={updatedDetails?.firstName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={updatedDetails?.lastName}
                onChange={handleInputChange}
              />
            </Grid>

            {/* Tooltip and dimming for read-only fields */}
            <Grid item xs={12} sm={6}>
              <Tooltip title="This field is not editable">
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={updatedDetails?.email}
                  InputProps={{ readOnly: true }}
                  sx={readOnlyStyle}
                />
              </Tooltip>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Tooltip title="This field is not editable">
                <TextField
                  fullWidth
                  label="CNIC"
                  name="cnic"
                  value={updatedDetails?.cnic}
                  InputProps={{ readOnly: true }}
                  sx={readOnlyStyle}
                />
              </Tooltip>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Tooltip title="This field is not editable">
                <TextField
                  fullWidth
                  label="Mobile Number"
                  name="mobileNo"
                  value={updatedDetails?.mobileNo}
                  InputProps={{ readOnly: true }}
                  sx={readOnlyStyle}
                />
              </Tooltip>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Tooltip title="This field is not editable">
                <TextField
                  fullWidth
                  label="Organization"
                  name="organization"
                  value={updatedDetails?.organisationName}
                  InputProps={{ readOnly: true }}
                  sx={readOnlyStyle}
                />
              </Tooltip>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date of Birth"
                name="dob"
                value={updatedDetails?.dob.split("T")[0]}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Gender"
                name="gender"
                value={updatedDetails?.gender}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Tooltip title="This field is not editable">
                <TextField
                  fullWidth
                  label="Role"
                  name="role"
                  value={updatedDetails?.role}
                  InputProps={{ readOnly: true }}
                  sx={readOnlyStyle}
                />
              </Tooltip>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Tooltip title="This field is not editable">
                <TextField
                  fullWidth
                  label="Card Number"
                  name="cardNumber"
                  value={updatedDetails?.cardNumber}
                  InputProps={{ readOnly: true }}
                  sx={readOnlyStyle}
                />
              </Tooltip>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                label="Facebook"
                name="facebookUrl"
                value={updatedDetails?.facebookUrl}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FacebookIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                label="Instagram"
                name="instagramUrl"
                value={updatedDetails?.instagramUrl}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <InstagramIcon color="secondary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                label="LinkedIn"
                name="linkedInUrl"
                value={updatedDetails?.linkedInUrl}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LinkedInIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {categories.map((category, index) => {
              const imageUrl = "/ApnaLogoPrevious.png" ?? "/Profile.jpeg"; // Default image if none provided
              return (
                <Grid item xs={12} sm={6} key={index}>
                  <Card
                    onClick={() => handleMenuClick(category)}
                    sx={{
                      cursor: "pointer",
                      minHeight: "140px",
                      minWidth: "210px",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <Box sx={{ position: "relative" }}>
                      <CardMedia
                        component="img"
                        height="150"
                        image={`${process.env.PUBLIC_URL}${imageUrl}`}
                        alt={category.categoryName}
                        sx={{
                          filter: "brightness(70%)", // Darkens the image for better text readability
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
                </Grid>
              );
            })}
          </Grid>

          <Button
            variant="contained"
            fullWidth
            sx={{
              marginTop: 3,
              background: "linear-gradient(90deg, #20164F, #20164F)",
              color: "#fff",
              padding: "10px 0",
              "&:hover": {
                background: "linear-gradient(90deg, #001F54, #9B2ECA)",
              },
            }}
            onClick={handleUpdate}
          >
            Save Changes
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default DetailsPage;
