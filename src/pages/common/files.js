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
  TextField,
  Pagination,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  Close as CloseIcon,
  Delete as DeleteIcon,
  Download as DownloadIcon,
} from "@mui/icons-material";
import { useDropzone } from "react-dropzone";
import { uploadtos3 } from "../../api-services/user";
import { apiRequestStatuses } from "../../common/constant";
import { formatDateTime } from "../../utils/common";
import {
  getUserFiles,
  updateUserFiles,
  deleteFile,
} from "../../api-services/user";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "../../redux/slices/authSlice";
import { monthsSelect } from "../../common/constant";
import { useNavigate } from "react-router-dom";

const Files = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId, category } = useSelector((state) => state.auth);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [existingFiles, setExistingFiles] = useState([]);
  const [fileName, setFileName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [monthVal, setmonthVal] = useState("");
  const [paginationn, setPagination] = useState({
    currentPage: 0,
    limit: 0, // Rows per page
    totalPages: 0,
    totalRecords: 0,
  });
  // States for modal
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Track the index of the selected image

  const fetchUserFiles = async (fileName, month, page) => {
    try {
      if (!fileName) fileName = "";
      const res = await getUserFiles(
        category.userID,
        category.id,
        fileName,
        month,
        page
      );

      const { userFiles, pagination } = res.payload.data;
      setExistingFiles(userFiles);
      setPagination({
        currentPage: pagination.currentPage,
        limit: pagination.limit,
        totalRecords: pagination.totalRecords,
        totalPages: pagination.totalPages,
      });
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    fetchUserFiles();
  }, []);

  const onDrop = (acceptedFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  };

  const handleSearchChange = async (event) => {
    const name = event.target.value;
    setSearchTerm(name);

    fetchUserFiles(name);
  };

  const handlePageChange = async (event, newPage) => {
    setPagination((prevState) => ({
      ...prevState,
      currentPage: newPage,
    }));

    await fetchUserFiles(searchTerm, monthVal, newPage);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      dispatch(
        notification({
          open: true,
          type: "error",
          message: "Please select a file to upload!",
        })
      );
      return;
    }

    setUploading(true);
    try {
      for (let file of files) {
        const fileUrl = await uploadtos3(file, category.name);
        const res = await updateUserFiles(
          category.userID,
          fileUrl,
          file.name,
          category.id
        );
        if (res.metadata.status === apiRequestStatuses.SUCCESS) {
          dispatch(
            notification({
              open: true,
              type: "success",
              message: `${file.name} uploaded successfully!`,
            })
          );
        }
      }
      fetchUserFiles();
    } catch (error) {
      console.error("Error uploading file or updating user details:", error);
      dispatch(
        notification({
          open: true,
          type: "error",
          message: "Error Uploading File!",
        })
      );
    } finally {
      setUploading(false);
      setFiles([]);
    }
  };

  const handleDelete = async (filePath) => {
    try {
      const res = await deleteFile(category.userID, filePath, category.id);

      if (res.metadata.status === apiRequestStatuses.SUCCESS) {
        fetchUserFiles();

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
  const handleDeleteSelectedFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
  });

  const handleImageClick = (image, index) => {
    setSelectedImage(image);
    setOpen(true);
    setCurrentImageIndex(index); // Set the index of the clicked image
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage("");
  };

  const handleBackClick = () => {
    navigate(`/scanCard/${category?.cardNo}`);
  };

  const handleChange = async (e) => {
    const { value } = e.target;
    setmonthVal(value);
    await fetchUserFiles(searchTerm, value);
  };
  // Navigation handlers for modal
  const handleNextImage = () => {
    if (currentImageIndex < existingFiles.length - 1) {
      setCurrentImageIndex((prevIndex) => prevIndex + 1);
      setSelectedImage(existingFiles[currentImageIndex + 1].filePath);
    }
  };

  const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex((prevIndex) => prevIndex - 1);
      setSelectedImage(existingFiles[currentImageIndex - 1].filePath);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="lg"
      sx={{
        marginTop: { xs: "22%", md: "8%" },
        padding: { xs: "0 15px", md: "0" },
      }}
    >
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        sx={{ fontSize: { xs: "1.5rem", md: "2rem" } }}
      >
        <ArrowBackIcon onClick={handleBackClick} /> Upload Your {category?.name}
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
            width: "100%",
            maxWidth: "240px",
            height: "150px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f5f5f5",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            margin: "0 auto",
          },
        })}
      >
        <input {...getInputProps()} />
        <Typography variant="body2">
          Drag 'n' drop a file here, or click to select one
        </Typography>
        {fileName && (
          <Typography
            variant="body1"
            sx={{ marginTop: "10px", fontSize: { xs: "0.9rem", md: "1rem" } }}
          >
            Selected file: {fileName}
          </Typography>
        )}
      </div>

      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        disabled={uploading}
        sx={{
          margin: "20px auto",
          display: "block",
          width: { xs: "100%", md: "250px" },
          maxWidth: "420px",
        }}
      >
        {uploading ? "Uploading..." : "Upload"}
      </Button>

      {/* Display Selected Files with Delete Option */}
      <List sx={{ mt: 2 }}>
        {files.map((file, index) => (
          <ListItem
            key={index}
            secondaryAction={
              <IconButton
                edge="end"
                color="error"
                onClick={() => handleDeleteSelectedFile(index)}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText primary={file.name} />
          </ListItem>
        ))}
      </List>
      {/* Divider Line */}
      <div
        style={{
          height: "1px",
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          margin: "20px 0",
        }}
      />
      <Grid container spacing={2} justifyContent="space-between">
        {/* Left Side */}
        <Grid item xs={12} sm={6} md={5}>
          <TextField
            variant="outlined"
            placeholder="Search by file name"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{
              marginBottom: "20px",
              width: "100%",
              "& .MuiOutlinedInput-root": {
                borderRadius: "20px", // Rounded corners
              },
            }}
          />
        </Grid>

        {/* Right Side */}
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel id="month-select-label">Filter By Month</InputLabel>
            <Select
              labelId="month-select-label"
              id="month-select"
              label="Select month"
              name="month"
              value={monthVal}
              onChange={handleChange}
            >
              {monthsSelect.map((mon) => (
                <MenuItem key={mon?.value} value={mon?.value}>
                  {mon?.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      {/* Existing Images Section */}

      {existingFiles.length === 0 ? (
        <Typography variant="body1" color="textSecondary">
          No files found
        </Typography>
      ) : (
        <>
          <Grid container spacing={2} justifyContent="center">
            {existingFiles.map((file, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ position: "relative", cursor: "pointer" }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={file.filePath}
                    alt={`${file.fileName} ${index + 1}`}
                    onClick={() => handleImageClick(file.filePath, index)}
                  />
                  <CardContent>
                    <Typography variant="body2" color="textSecondary">
                      {file.fileName}
                    </Typography>

                    <Typography variant="body2" color="textSecondary">
                      {formatDateTime(file?.updatedOn)}
                    </Typography>
                  </CardContent>

                  {/* Delete and Download Icons */}
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(file.filePath);
                    }}
                    sx={{ color: "error.main" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                  {file.filePath && (
                    <IconButton
                      onClick={async (e) => {
                        e.stopPropagation();
                        try {
                          // Fetch the file data from the URL
                          const response = await fetch(file.filePath);
                          const blob = await response.blob();

                          // Create a temporary link element
                          const link = document.createElement("a");
                          link.href = URL.createObjectURL(blob);
                          link.download = file.fileName;

                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                          URL.revokeObjectURL(link.href);
                        } catch (error) {
                          console.error("Download failed", error);
                        }
                      }}
                      sx={{ position: "absolute", bottom: 10, right: 50 }}
                    >
                      <DownloadIcon />
                    </IconButton>
                  )}
                </Card>
              </Grid>
            ))}
          </Grid>

          <Pagination
            count={paginationn.totalPages}
            page={paginationn.currentPage}
            onChange={handlePageChange}
            sx={{ mt: 2, display: "flex", justifyContent: "center" }}
          />
        </>
      )}

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
            alt="Selected Prescription"
            style={{ width: "100%", height: "80vh", objectFit: "contain" }}
          />
          {/* Navigation Buttons */}
          <IconButton
            onClick={handlePrevImage}
            disabled={currentImageIndex === 0}
            sx={{ position: "absolute", left: 10, top: "50%" }}
          >
            <ArrowBackIcon />
          </IconButton>
          <IconButton
            onClick={handleNextImage}
            disabled={currentImageIndex === existingFiles.length - 1}
            sx={{ position: "absolute", right: 10, top: "50%" }}
          >
            <ArrowForwardIcon />
          </IconButton>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default Files;
