// import React from "react";
// import {
//   Grid,
//   Typography,
//   TextField,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
// } from "@mui/material";

// const UserInfoGrid = ({ userDetails, updatedDetails, handleInputChange }) => {
//   let genderReadOnly = false;
//   if (userDetails?.gender) genderReadOnly = true;

//   const renderTextField = (label, name, isRequired = false) => {
//     let isReadOnly = false;
//     if (name === "email" && userDetails?.email) isReadOnly = true;
//     if (name === "cnic" && userDetails?.cnic) isReadOnly = true;
//     if (name === "mobileNo" && userDetails?.mobileNo) isReadOnly = true;

//     return (
//       <Grid item xs={12} sm={3}>
//         <TextField
//           fullWidth
//           label={label}
//           name={name}
//           value={updatedDetails[name] || ""}
//           onChange={handleInputChange}
//           required={isRequired}
//           InputProps={{ readOnly: isReadOnly }}
//         />
//       </Grid>
//     );
//   };

//   return (
//     <>
//       <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
//         Patient Information
//       </Typography>

//       <Grid container spacing={2} alignItems="center">
//         {renderTextField("First Name", "firstName", true)}
//         {renderTextField("Last Name", "lastName", true)}
//         {renderTextField("Email", "email")}
//         {renderTextField("CNIC", "cnic")}
//         {renderTextField("Mobile Number", "mobileNo", true)}

//         <Grid item xs={12} sm={3}>
//           <FormControl fullWidth required>
//             <InputLabel>Gender</InputLabel>
//             <Select
//               name="gender"
//               value={updatedDetails.gender || ""}
//               onChange={handleInputChange}
//               label="Gender"
//               disabled={genderReadOnly}
//             >
//               <MenuItem value="Male">Male</MenuItem>
//               <MenuItem value="Female">Female</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>
//       </Grid>
//     </>
//   );
// };

// export default UserInfoGrid;

import React from "react";
import {
  Grid,
  Typography,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

const UserInfoGrid = ({ userDetails, updatedDetails, handleInputChange }) => {
  let genderReadOnly = !!userDetails?.gender;

  const renderTextField = (label, name, type = "text", isRequired = false) => {
    let isReadOnly = false;
    if (
      ["email", "cnic", "mobileNo", "dob"].includes(name) &&
      userDetails?.[name]
    ) {
      isReadOnly = true;
    }

    return (
      <Grid item xs={12} sm={3}>
        <TextField
          fullWidth
          label={label}
          name={name}
          type={type}
          value={updatedDetails[name] || ""}
          onChange={handleInputChange}
          required={isRequired}
          InputProps={{ readOnly: isReadOnly }}
          InputLabelProps={type === "date" ? { shrink: true } : {}}
        />
      </Grid>
    );
  };

  return (
    <>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
        Patient Information
      </Typography>

      <Grid container spacing={2} alignItems="center">
        {renderTextField("First Name", "firstName", "text", true)}
        {renderTextField("Last Name", "lastName", "text", true)}
        {renderTextField("Email", "email")}
        {renderTextField("CNIC", "cnic")}
        {renderTextField("Mobile Number", "mobileNo", "text", true)}
        {renderTextField("Date of Birth", "dob", "date", true)}

        <Grid item xs={12} sm={3}>
          <FormControl fullWidth required>
            <InputLabel>Gender</InputLabel>
            <Select
              name="gender"
              value={updatedDetails.gender || ""}
              onChange={handleInputChange}
              label="Gender"
              disabled={genderReadOnly}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
};

export default UserInfoGrid;
