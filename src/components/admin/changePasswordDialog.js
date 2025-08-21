import React, { useState } from "react";
import { apiRequestStatuses } from "../../common/constant/index";
import { useDispatch } from "react-redux";
import { notification } from "../../redux/slices/authSlice";
import { handlePasswordChange } from "../../api-services/admin";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

const ChangePasswordDialog = ({ open, onClose, userId }) => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState({
    password: "",
    confirmPassword: "",
  });

  const [pass, setPass] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassword({
      ...password,
      [name]: value,
    });

    if (password.password === password.confirmPassword) {
      setPass(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.password === password.confirmPassword) {
      const res = await handlePasswordChange(userId, password.password);

      if (res.metadata.status === apiRequestStatuses.SUCCESS) {
        dispatch(
          notification({
            open: true,
            type: "success",
            message: `Password changed successfully!`,
          })
        );
      }
    } else {
      setPass(false);

      dispatch(
        notification({
          open: true,
          type: "error",
          message: `Password and Confirm Password doesnot match!`,
        })
      );
    }

    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        component: "form",
        sx: { width: "600px" },
      }}
    >
      <DialogTitle sx={{ fontWeight: "bold" }}>Change Password</DialogTitle>
      <DialogContent
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <TextField
          autoFocus
          required
          margin="dense"
          id="password"
          name="password"
          label="Password"
          variant="standard"
          onChange={handleChange}
          style={{ width: "48%" }}
        />

        <TextField
          autoFocus
          required
          margin="dense"
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          variant="standard"
          onChange={handleChange}
          style={{ width: "48%" }}
        />
      </DialogContent>
      <DialogActions>
        <Button disabled={pass} type="submit" onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangePasswordDialog;
