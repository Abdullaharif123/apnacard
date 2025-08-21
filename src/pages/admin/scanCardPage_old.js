import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Typography, Button, Grid, Card, CardMedia, Box } from "@mui/material";
import { updateUserDetails, getUserDetails } from "../../api-services/user";
import { updateUserPrescription } from "../../api-services/admin";
import { notification } from "../../redux/slices/authSlice";
import { apiRequestStatuses } from "../../common/constant/index";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserCategories } from "../../api-services/user";
import { category } from "../../redux/slices/authSlice";
import UserInfoGrid from "./userInfoGrid";

const ScanCardPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cardNumber } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const [updatedDetails, setUpdatedDetails] = useState({});
  const [categories, setCategories] = useState([]);
  const { orgId } = useSelector((state) => state.auth);
  const [editorContent, setEditorContent] = useState(""); // State to store editor content

  const handleEditorChange = (value) => {
    setEditorContent(value);
  };

  const fetchUserDetails = async () => {
    try {
      const res = await getUserDetails(cardNumber);
      const userData = res.payload.data.existingUser;
      setUserDetails(userData);
      setUpdatedDetails(userData);
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

  const handleUpdate = async () => {
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
        const res = await updateUserDetails(userId, updatedUserDetails);

        if (editorContent) {
          const presRes = await updateUserPrescription(userId, editorContent);
          if (presRes.metadata.status === apiRequestStatuses.SUCCESS) {
            setEditorContent("");
          }
        }
        if (res.metadata.status === apiRequestStatuses.SUCCESS) {
          fetchUserDetails();

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
  };

  if (!userDetails) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Grid
      item
      xs={12}
      md={8}
      lg={6}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 2,
        boxSizing: "border-box",
        marginTop: "6%",
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          width: "100%",
        }}
      >
        <UserInfoGrid
          userDetails={userDetails}
          updatedDetails={updatedDetails}
          handleInputChange={handleInputChange}
        />

        <Grid
          container
          spacing={2}
          sx={{ display: "flex", alignItems: "center", marginBottom: "4%" }}
        >
          <Grid item xs={12} sm={12}>
            <h1>Prescription</h1>
            <ReactQuill
              value={editorContent}
              onChange={handleEditorChange}
              style={{
                height: "300px",
                width: "100%",
                maxWidth: "100%",
                marginBottom: "2%",
              }}
            />
          </Grid>
        </Grid>

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
            const imageUrl = category.imageUrl ?? "/Profile.jpeg";
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
                    image={`${process.env.PUBLIC_URL}${imageUrl}`}
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
          <Button
            variant="contained"
            sx={{
              width: "100%",
              maxWidth: "500px",
              background: "linear-gradient(90deg, #001F54, #9B2ECA)",
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
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ScanCardPage;
