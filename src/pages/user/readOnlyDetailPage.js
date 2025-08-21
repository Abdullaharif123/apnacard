import React, { useState, useEffect } from "react";
import {
  Typography,
  Paper,
  Avatar,
  Button,
  CardMedia,
  Box,
  Grid,
  IconButton,
} from "@mui/material";
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  // PermIdentity as PermIdentityIcon,
  CalendarToday as CalendarTodayIcon,
  Wc as WcIcon,
  // Business as BusinessIcon,
  // CreditCard as CreditCardIcon,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  CameraAlt as CameraAltIcon,
} from "@mui/icons-material";
import { scanCard } from "../../api-services/user";
import { useNavigate, useParams } from "react-router-dom";
import { Loading } from "../../components";
import { formatDate, handleSaveContact } from "../../utils/common";
import { notification } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";

const ReadOnlyDetailsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { cardNumber } = useParams();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await scanCard(cardNumber);
        const userData = res.payload.data.user;
        setUserDetails(userData);
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [cardNumber]);

  // Display the loading component if loading is true
  if (loading) {
    return <Loading />;
  }

  if (!userDetails) {
    return <Typography>Error loading user details</Typography>;
  }

  const handleCopy = (name, value) => {
    navigator.clipboard.writeText(value);

    dispatch(
      notification({
        open: true,
        type: "success",
        message: `${name} copied successfully!`,
      })
    );
  };

  const handleContactSave = () => {
    handleSaveContact(
      userDetails.firstName,
      userDetails.lastName,
      userDetails.mobileNo
    ); // Use the imported function
  };

  const renderField = (IconComponent, value, label, onClick = null) => {
    return (
      <Grid item xs={12}>
        <Box display="flex" alignItems="center">
          {IconComponent && (
            <IconButton
              onClick={onClick}
              sx={{
                opacity: 0.6,
                fontSize: 20,
                marginRight: 1,
                cursor: onClick ? "pointer" : "default",
                "&:hover": onClick ? { color: "blue" } : {},
                color: "white", // Set all icons to white
              }}
            >
              <IconComponent />
            </IconButton>
          )}
          <Typography
            variant="h6"
            component="div"
            sx={{
              color: "white", // White font color for user details
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
            }}
          >
            {value || "-"}
          </Typography>
        </Box>
      </Grid>
    );
  };

  const CustomButton = ({ onClick, text, sx, navigateTo, state }) => (
    <Grid item xs={12} sm={6}>
      <Button
        variant="contained"
        fullWidth
        sx={{
          background: "#fff",
          fontWeight: "bold",
          color: "black",
          padding: "10px 0",
          borderRadius: "50px",
          "&:hover": {
            background: "linear-gradient(180deg, #070808,#221859, #77296E)",
            color: "white",
          },
          ...sx, // Spread additional styles if provided
        }}
        onClick={navigateTo ? () => navigate(navigateTo, { state }) : onClick}
      >
        {text}
      </Button>
    </Grid>
  );

  return (
    <Grid
      container
      sx={{
        width: "100%",
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box",
        padding: "16px",
        overflow: "auto",
        position: "relative", // Add relative positioning for the gradient to float
        background: "linear-gradient(90deg, #20164F, #20164F)",
      }}
    >
      <Grid item xs={12} md={8} lg={6}>
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            maxWidth: "500px",
            backgroundColor: "#F9FAFC",
            margin: "auto",
            boxSizing: "border-box",
            borderRadius: "40px",
            position: "relative",
            overflow: "hidden",
            padding: 0, // No padding for the whole card
          }}
        >
          {/* Cover Photo */}
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "300px",
              zIndex: 1,
            }}
          >
            <CardMedia
              component="img"
              src="/ApnaLogoPrevious.png"
              alt="Cover Image"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "25%",
                background: "rgba(0, 0, 0, 0.3)",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.5)",
              }}
            />
          </Box>
          {/* Profile Picture */}
          <Box
            sx={{
              position: "absolute",
              top: "170px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 2,
              borderRadius: "30px",
              width: 120,
              height: 120,
              border: "8px solid white",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Avatar
              alt={`${userDetails.firstName} ${userDetails.lastName}`}
              src={userDetails.profilePicture}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "30px",
              }}
            />
            {/* Camera Button on Profile Picture */}
            <IconButton
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                borderRadius: "50%",
                color: "white",
                fontSize: "30px",
                padding: "6px",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                },
              }}
            >
              <CameraAltIcon />
            </IconButton>
          </Box>
          {/* User Details */}
          <Box
            sx={{
              position: "relative",
              zIndex: 1,
              background: "linear-gradient(180deg, #070808,#221859, #77296E)", // Gradient only for user details section
              borderRadius: "40px",
              padding: 3, // Padding inside the details section
              color: "white", // Set white color for text
              marginTop: "-60px", // Negative margin to remove the gap and overlap with profile picture
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              sx={{
                marginTop: "60px",
                marginBottom: "20px",
                textAlign: "center",
                fontWeight: "bold",
                color: "#fff", // White color for name
              }}
            >
              {`${userDetails.firstName} ${userDetails.lastName}`}
            </Typography>
            <form>
              <Grid container spacing={2}>
                {renderField(EmailIcon, userDetails.email, "Email", () =>
                  handleCopy("Email", userDetails.email)
                )}
                {renderField(PhoneIcon, userDetails.mobileNo, "Phone No", () =>
                  handleCopy("Phone No", userDetails.mobileNo)
                )}
                {/* {renderField(PermIdentityIcon, userDetails.cnic, "Cnic", () =>
                  handleCopy("Cnic", userDetails.cnic)
                )} */}
                {renderField(
                  CalendarTodayIcon,
                  formatDate(userDetails.dob),
                  "Date of Birth"
                )}
                {renderField(WcIcon, userDetails.gender, "Gender")}
                {/* {renderField(
                  BusinessIcon,
                  userDetails.organisationName,
                  "Organisation"
                )} */}
                {/* {renderField(
                  CreditCardIcon,
                  userDetails.cardNumber,
                  "Apna-Card No",
                  () => handleCopy("Apna-Card No", userDetails.cardNumber)
                )} */}
                {renderField(FacebookIcon, userDetails.facebookUrl, "Facebook")}
                {renderField(
                  InstagramIcon,
                  userDetails.instagramUrl,
                  "Instagram"
                )}
                {renderField(LinkedInIcon, userDetails.linkedInUrl, "LinkedIn")}
              </Grid>
              <Grid container spacing={2} sx={{ marginTop: "20px" }}>
                <CustomButton
                  text="Login"
                  fontWeight="bold"
                  navigateTo="/login"
                />

                <CustomButton text="Save Contact" onClick={handleContactSave} />
              </Grid>
            </form>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ReadOnlyDetailsPage;
