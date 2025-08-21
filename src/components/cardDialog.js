import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { handleOrganisationCardUpdate } from "../api-services/superAdmin";
import { apiRequestStatuses } from "../common/constant/index";
import { notification } from "../redux/slices/authSlice";

const CardDialog = ({ open, onClose, org, fetchOrganisations }) => {
  const dispatch = useDispatch();
  const [cardStart, setStart] = useState(0);
  const [cardEnd, setEnd] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let str;
    if (cardEnd === 0) {
      str = cardStart;
    } else {
      str = cardStart + "-" + cardEnd;
    }
    try {
      const res = await handleOrganisationCardUpdate(org?.id, str);
      if (res.metadata.status === apiRequestStatuses.SUCCESS) {
        dispatch(
          notification({
            open: true,
            type: "success",
            message: "Cards Updated successfully!",
          })
        );
        onClose();
        fetchOrganisations();
      }
    } catch (err) {
      dispatch(
        notification({
          open: true,
          type: "error",
          message: "Cards Update failed!",
        })
      );
    }
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
      <DialogTitle>Assign Cards to {org?.name}</DialogTitle>
      <DialogContent
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <TextField
          autoFocus
          required
          margin="dense"
          id="cardRangeFrom"
          name="cardRangeFrom"
          label="Card Range From"
          variant="standard"
          value={cardStart}
          onChange={(e) => setStart(parseInt(e.target.value, 10) || 0)}
          style={{ width: "48%" }}
        />

        <TextField
          autoFocus
          required
          margin="dense"
          id="cardRangeTo"
          name="cardRangeTo"
          label="Card Range To"
          value={cardEnd}
          onChange={(e) => setEnd(parseInt(e.target.value, 10) || 0)}
          variant="standard"
          style={{ width: "48%" }}
        />
      </DialogContent>
      <DialogActions>
        {/* <Button onClick={handleClose}>Cancel</Button> */}
        <Button type="submit" onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CardDialog;
