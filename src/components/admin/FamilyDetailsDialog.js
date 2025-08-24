import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import InvoicePreview from "./InvoicePreview";

const FamilyDetailsDialog = ({ open, onClose, onSubmit, userId }) => {
  const [familyMembers, setFamilyMembers] = useState([
    { name: "", age: "", relation: "", gender: "" },
  ]);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [showInvoice, setShowInvoice] = useState(false);

  useEffect(() => {
    const allFieldsFilled = familyMembers.every(
      (member) =>
        member.name.trim() !== "" &&
        member.age.trim() !== "" &&
        Number(member.age) > 0 &&
        member.relation.trim() !== "" &&
        member.gender.trim() !== ""
    );
    setIsSubmitDisabled(!allFieldsFilled);
  }, [familyMembers]);

  const handleCancel = () => {
    setFamilyMembers([{ name: "", age: "", relation: "", gender: "" }]);
    setShowInvoice(false);
    onClose();
  };

  const handleAddMember = () => {
    if (familyMembers.length < 10) {
      setFamilyMembers([
        ...familyMembers,
        { name: "", age: "", relation: "", gender: "" },
      ]);
    }
  };

  const handleRemoveMember = (index) => {
    const updatedMembers = familyMembers.filter((_, i) => i !== index);
    setFamilyMembers(updatedMembers);
  };

  const handleInputChange = (index, field, value) => {
    const updatedMembers = [...familyMembers];

    if (field === "age") {
      if (!/^\d*$/.test(value)) return;
      if (Number(value) < 0) return;
    }

    updatedMembers[index][field] = value;
    setFamilyMembers(updatedMembers);
  };

  const handleGenerateInvoice = () => {
    setShowInvoice(true);
  };

  const handleConfirmInvoice = () => {
    onSubmit(userId, familyMembers);
    handleCancel();
  };

  return (
    <Dialog open={open} onClose={handleCancel} fullWidth maxWidth="md">
      <DialogTitle>
        {showInvoice ? "Invoice Preview" : "Enter Family Member Details"}
      </DialogTitle>
      <DialogContent>
        {showInvoice ? (
          <InvoicePreview
            familyMembers={familyMembers}
            onConfirm={handleConfirmInvoice}
            onCancel={() => setShowInvoice(false)}
          />
        ) : (
          <>
            {familyMembers.map((member, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  gap: "10px",
                  marginBottom: "10px",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <TextField
                  label="Name"
                  value={member.name}
                  onChange={(e) =>
                    handleInputChange(index, "name", e.target.value)
                  }
                  required
                  fullWidth
                />
                <TextField
                  label="Age"
                  type="number"
                  value={member.age}
                  onChange={(e) =>
                    handleInputChange(index, "age", e.target.value)
                  }
                  required
                  fullWidth
                />
                <TextField
                  label="Relation"
                  value={member.relation}
                  onChange={(e) =>
                    handleInputChange(index, "relation", e.target.value)
                  }
                  required
                  fullWidth
                />
                <TextField
                  select
                  label="Gender"
                  value={member.gender}
                  onChange={(e) =>
                    handleInputChange(index, "gender", e.target.value)
                  }
                  required
                  fullWidth
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </TextField>
                {familyMembers.length > 1 && (
                  <IconButton onClick={() => handleRemoveMember(index)}>
                    <CloseIcon />
                  </IconButton>
                )}
              </div>
            ))}
            {familyMembers.length < 10 && (
              <IconButton onClick={handleAddMember}>
                <AddIcon />
              </IconButton>
            )}
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="secondary">
          Cancel
        </Button>
        {!showInvoice ? (
          <Button
            onClick={handleGenerateInvoice}
            color="primary"
            variant="contained"
            disabled={isSubmitDisabled}
          >
            Generate Invoice
          </Button>
        ) : null}
      </DialogActions>
    </Dialog>
  );
};

export default FamilyDetailsDialog;
