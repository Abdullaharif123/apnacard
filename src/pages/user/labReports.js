import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import { deleteFile, uploadtos3 } from "../../api-services/user";
import { useSelector } from "react-redux";
import { apiRequestStatuses, bucketFolderNames } from "../../common/constant";
import { getUserDetails, updateUserDetails } from "../../api-services/user";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { notification } from "../../redux/slices/authSlice";

const LabReports = () => {
  const dispatch = useDispatch();

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [existingImages, setExistingImages] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const { cardNumber } = useSelector((state) => state.auth);
  const [fileName, setFileName] = useState(""); // New state for file name

  // States for modal
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const fetchUserDetails = async () => {
    try {
      const res = await getUserDetails(cardNumber);
      const userData = res.payload.data.existingUser;
      setUserDetails(userData);
      setExistingImages(userData?.labReports || []);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setFileName(acceptedFiles[0].name); // Update the file name state
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    setUploading(true);
    try {
      const labReportsUrl = await uploadtos3(
        file,
        bucketFolderNames.labReports
      );

      const userId = userDetails._id;
      const updatedUserDetails = {
        labReports: [labReportsUrl],
      };

      const res = await updateUserDetails(userId, updatedUserDetails);
      if (res.metadata.status === apiRequestStatuses.SUCCESS) {
        fetchUserDetails();

        dispatch(
          notification({
            open: true,
            type: "success",
            message: "File Uploaded successfully!",
          })
        );
      }
      setExistingImages((prevImages) => [...prevImages, labReportsUrl]);
    } catch (error) {
      console.error("Error uploading file or updating user details:", error);
      alert("Error uploading file or updating user details.");
    } finally {
      setUploading(false);
      setFile(null);
      setFileName(""); // Reset file name state after upload
    }
  };

  const handleDelete = async (labReportsUrl) => {
    try {
      const userId = userDetails._id;
      const res = await deleteFile(userId, labReportsUrl, "labReports");

      if (res.metadata.status === apiRequestStatuses.SUCCESS) {
        fetchUserDetails();
        dispatch(
          notification({
            open: true,
            type: "success",
            message: "File Deleted successfully!",
          })
        );
      }
    } catch (error) {
      console.error("Error deleting prescription:", error);
      dispatch(
        notification({
          open: true,
          type: "error",
          message: "Error Deleting File!",
        })
      );
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage("");
  };

  return (
    <Container component="main" maxWidth="lg" sx={{ marginTop: "5%" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Upload Your Lab Reports
      </Typography>

      {/* Upload Section */}
      <div
        {...getRootProps({
          style: {
            border: "2px dashed #007bff",
            borderRadius: "8px",
            padding: "20px",
            textAlign: "center",
            marginBottom: "20px",
            cursor: "pointer",
            width: "240px", // Fixed width
            height: "150px", // Fixed height to make it a square
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f5f5f5", // Light background for contrast
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)", // Optional: Add shadow
            margin: "0 auto", // Centering the square
          },
        })}
      >
        <input {...getInputProps()} />
        <Typography variant="body2">
          Drag 'n' drop a file here, or click to select one
        </Typography>
        {fileName && ( // Display the selected file name
          <Typography variant="body1" sx={{ marginTop: "10px" }}>
            Selected file: {fileName}
          </Typography>
        )}
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        disabled={uploading}
        sx={{ margin: "20px auto", display: "block", width: "250px" }} // Spacing above and below button
      >
        {uploading ? "Uploading..." : "Upload"}
      </Button>

      {/* Divider Line */}
      <div
        style={{
          height: "1px",
          backgroundColor: "rgba(0, 0, 0, 0.3)", // Dimmed but visible line
          margin: "20px 0", // Spacing around the line
        }}
      />

      {/* Existing Images Section */}
      <Grid container spacing={2} justifyContent="center">
        {existingImages.map((image, index) => (
          <Grid item xs={4} key={index}>
            <Card sx={{ position: "relative", cursor: "pointer" }}>
              <CardMedia
                component="img"
                height="140"
                image={image}
                alt={`Lab Reports ${index + 1}`}
                onClick={() => handleImageClick(image)} // Ensure this is also clickable
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary">
                  Lab Reports {index + 1}
                </Typography>
              </CardContent>

              {/* Delete Icon */}
              <IconButton
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the image click
                  handleDelete(image);
                }}
                sx={{ position: "absolute", bottom: 10, right: 10 }}
              >
                <DeleteIcon />
              </IconButton>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal for Viewing Image */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogContent sx={{ position: "relative" }}>
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", top: 10, right: 10 }}
          >
            <CloseIcon />
          </IconButton>
          <img
            src={selectedImage}
            alt="Selected Lab Reports"
            style={{ width: "100%", height: "auto" }}
          />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default LabReports;
