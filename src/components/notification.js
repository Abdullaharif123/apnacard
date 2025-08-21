import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { notification } from "../redux/slices/authSlice";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
import Typography from "@mui/material/Typography";

const Notification = () => {
  const dispatch = useDispatch();
  const { open, onClose, type, message } = useSelector((state) => state.auth);

  const handleNotificationClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(
      notification({
        open: false,
      })
    );
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleNotificationClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }} // Position on top-right
    >
      <Alert
        onClose={onClose}
        severity={type} // success, error, warning, info
        sx={{ width: "100%" }}
      >
        <Typography sx={{ fontWeight: "bold" }}>{message}</Typography>
      </Alert>
    </Snackbar>
  );
};

export default Notification;
