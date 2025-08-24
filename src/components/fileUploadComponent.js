import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import Dropzone from "react-dropzone";
import { notification } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadIcon from "@mui/icons-material/Upload";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { styled } from "@mui/material/styles";
import { prescriptionuploadtos3 } from "../api-services/user";

const StyledDropzone = styled("div")(({ theme }) => ({
  border: "2px dashed #cccccc",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#fafafa",
  padding: theme.spacing(3),
  textAlign: "center",
  cursor: "pointer",
  "&:hover": {
    borderColor: theme.palette.primary.main,
    backgroundColor: "#eeeeee",
  },
  "&.is-active": {
    borderColor: theme.palette.success.main,
  },
}));

const FileUploadModal = ({ onUploadSuccess }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFiles([]);
  };

  const handleDrop = (acceptedFiles) => {
    setSelectedFiles([...selectedFiles, ...acceptedFiles]);
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      dispatch(
        notification({
          open: true,
          type: "warning",
          message: "Please select files to upload.",
        })
      );
      return;
    }

    setUploading(true);
    try {
      const uploadPromises = selectedFiles.map(
        async (file) => await prescriptionuploadtos3(file, "prescriptions")
      );
      const uploadedUrls = await Promise.all(uploadPromises);

      if (onUploadSuccess) {
        onUploadSuccess(uploadedUrls);
      }

      dispatch(
        notification({
          open: true,
          type: "success",
          message: "Files uploaded successfully!",
        })
      );
      setSelectedFiles([]);
      handleCloseModal();
    } catch (error) {
      console.error("Error uploading files:", error);
      dispatch(
        notification({
          open: true,
          type: "error",
          message: "Failed to upload files. Please try again.",
        })
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box>
      <Button
        sx={{ width: "150px" }}
        onClick={handleOpenModal}
        endIcon={<UploadIcon />}
      >
        Upload
      </Button>

      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            maxHeight: "80vh", // Added max height for scroll
            overflowY: "auto", // Enable vertical scrolling
            bgcolor: "background.paper",
            border: "1px solid rgba(0, 0, 0, 0.1)",
            borderRadius: 2, // Rounded corners
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Upload Files
          </Typography>

          <Dropzone onDrop={handleDrop} disabled={uploading}>
            {({ getRootProps, getInputProps, isDragActive }) => (
              <StyledDropzone
                {...getRootProps()}
                className={isDragActive ? "is-active" : ""}
              >
                <input {...getInputProps()} />
                {uploading ? (
                  <Box
                    sx={{ display: "flex", justifyContent: "center", my: 2 }}
                  >
                    <CircularProgress />
                  </Box>
                ) : isDragActive ? (
                  <Typography variant="body1">Drop files here ...</Typography>
                ) : (
                  <Typography variant="body1">
                    Drag 'n' drop files here, or click to select files
                  </Typography>
                )}
              </StyledDropzone>
            )}
          </Dropzone>

          {selectedFiles.length > 0 && (
            <Paper elevation={2} sx={{ mt: 2, p: 2 }}>
              {" "}
              {/* Added Paper for better visual separation */}
              <Typography variant="subtitle1" gutterBottom>
                Selected Files:
              </Typography>
              <List dense>
                {" "}
                {/* Use List for better file display */}
                {selectedFiles.map((file, index) => (
                  <ListItem
                    key={file.path}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleRemoveFile(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemIcon>
                      <InsertDriveFileIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={`${file.name} - ${file.size} bytes`}
                    />
                    {/* Display file name */}
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            {" "}
            {/* Increased margin top */}
            <Button
              onClick={handleCloseModal}
              disabled={uploading}
              sx={{ width: "120px", marginRight: "10px" }}
            >
              Cancel
            </Button>
            <Button
              sx={{ width: "120px" }}
              onClick={handleUpload}
              disabled={uploading || selectedFiles.length === 0}
            >
              {uploading ? <CircularProgress size={24} /> : "Upload"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default FileUploadModal;
