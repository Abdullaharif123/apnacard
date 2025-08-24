import React from "react";
import { useNavigate } from "react-router-dom";
import { calculateAge } from "../../utils/common";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import { CreditCard as CreditCardIcon } from "@mui/icons-material";

const ShowFamilyMembers = ({ open, onClose, familyMembers, parentCardNo }) => {
  const navigate = useNavigate();

  const handleIconClick = (card, userId) => {
    navigate(`/scancard/${card}/${userId}`);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Family Members</DialogTitle>
      <DialogContent>
        {familyMembers && familyMembers.length > 0 ? (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="family members table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Age</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Relation</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Gender</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {familyMembers.map((member) => (
                  <TableRow key={member._id}>
                    <TableCell>{member.firstName}</TableCell>
                    <TableCell>{calculateAge(member.dob)}</TableCell>
                    <TableCell>{member.relation}</TableCell>
                    <TableCell>{member.gender}</TableCell>
                    <TableCell>
                      <CreditCardIcon
                        onClick={() =>
                          handleIconClick(parentCardNo, member._id)
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100px"
          >
            <Typography variant="h6" color="textSecondary">
              No Family Members Found.
            </Typography>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ShowFamilyMembers;
