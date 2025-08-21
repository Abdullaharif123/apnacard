import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  Paper,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogContent,
  Pagination,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardMedia,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  ArrowBack as ArrowBackIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import { calculateAge, formatDateTime } from "../../utils/common";
import {
  getPrescriptionById,
  getUserAllPrescriptions,
} from "../../api-services/user";
import { useSelector } from "react-redux";
import { apiRequestStatuses, monthsSelect } from "../../common/constant";
import { useNavigate } from "react-router-dom";

const Prescription = () => {
  const navigate = useNavigate();
  const { category, userId } = useSelector((state) => state.auth);
  const [prescriptions, setPrescriptions] = useState([]);
  const [monthVal, setmonthVal] = useState("");
  const [paginationn, setPagination] = useState({
    currentPage: 0,
    limit: 0,
    totalPages: 0,
    totalRecords: 0,
  });
  const [open, setOpen] = useState(false);
  const [prescriptionDetails, setPrescriptionDetails] = useState(null);
  const [openImage, setOpenImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchUserPrescriptions = async (month, page) => {
    try {
      const res = await getUserAllPrescriptions(userId, { month, page });
      const { prescriptions, pagination } = res.payload.data;
      setPrescriptions(prescriptions);
      setPagination({
        currentPage: pagination.currentPage,
        limit: pagination.limit,
        totalRecords: pagination.totalRecords,
        totalPages: pagination.totalPages,
      });
    } catch (error) {
      console.error("Error fetching user prescriptions:", error);
    }
  };

  useEffect(() => {
    fetchUserPrescriptions(monthVal, 1);
  }, []);

  const handlePageChange = async (event, newPage) => {
    setPagination((prevState) => ({
      ...prevState,
      currentPage: newPage,
    }));

    // Pass the new page and current month filter
    await fetchUserPrescriptions(monthVal, newPage);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBackClick = () => {
    navigate(`/dashboard`);
  };

  const handleDialogOpen = async (pres) => {
    const res = await getPrescriptionById(pres._id);
    if (res.metadata.status === apiRequestStatuses.SUCCESS) {
      setPrescriptionDetails(res.payload.data);
      setOpen(true);
    }
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setOpenImage(true);
  };

  const handleCloseDialog = () => {
    setOpenImage(false);
    setSelectedImage(null);
  };

  const handleChange = async (e) => {
    const { value } = e.target;
    setmonthVal(value);
    await fetchUserPrescriptions(value);
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
        <ArrowBackIcon onClick={handleBackClick} /> {category?.name}
      </Typography>

      <Grid container spacing={2} justifyContent="flex-end" marginBottom={"2%"}>
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

      {prescriptions.length === 0 ? (
        <Typography variant="body1" color="textSecondary">
          No prescriptions found
        </Typography>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="users table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Added By</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Patient Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Age</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Created On</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>View</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {prescriptions.map((pres, index) => (
                  <TableRow key={pres?._id} hover style={{ cursor: "pointer" }}>
                    <TableCell>{pres?.addedBy}</TableCell>
                    <TableCell>{pres?.userId?.firstName}</TableCell>
                    <TableCell>{calculateAge(pres?.userId?.dob)}</TableCell>
                    <TableCell>{formatDateTime(pres?.createdOn)}</TableCell>
                    <TableCell>
                      <VisibilityIcon onClick={() => handleDialogOpen(pres)} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Pagination
            count={paginationn.totalPages}
            page={paginationn.currentPage}
            onChange={handlePageChange}
            sx={{ mt: 2, display: "flex", justifyContent: "center" }}
          />
        </>
      )}

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogContent sx={{ position: "relative" }}>
          {prescriptionDetails && (
            <>
              <Paper elevation={3} sx={{ padding: 3, marginBottom: 4 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Patient Information
                </Typography>

                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                  <strong>Patient ID:</strong>{" "}
                  {prescriptionDetails?.userId?._id}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                  <strong>Patient Name:</strong>{" "}
                  {prescriptionDetails?.userId?.firstName}{" "}
                  {prescriptionDetails?.userId?.lastName}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                  <strong>Age:</strong>{" "}
                  {calculateAge(prescriptionDetails?.userId?.dob)}
                </Typography>
              </Paper>

              <Paper elevation={3} sx={{ padding: 3, marginBottom: 4 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Prescription
                </Typography>
                <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                  <Table>
                    <TableHead>
                      <TableRow
                        sx={{
                          background:
                            "linear-gradient(90deg, #001F54, #9B2ECA)",
                        }}
                      >
                        <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                          Tablets
                        </TableCell>
                        <TableCell
                          sx={{ color: "#fff", fontWeight: "bold" }}
                          align="center"
                        >
                          Morning (صبح)
                        </TableCell>
                        <TableCell
                          sx={{ color: "#fff", fontWeight: "bold" }}
                          align="center"
                        >
                          Afternoon (دوپہر)
                        </TableCell>
                        <TableCell
                          sx={{ color: "#fff", fontWeight: "bold" }}
                          align="center"
                        >
                          Night (رات)
                        </TableCell>
                        <TableCell
                          sx={{ color: "#fff", fontWeight: "bold" }}
                          align="center"
                        >
                          Days (دن)
                        </TableCell>
                        <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                          Description
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {prescriptionDetails?.tablets?.map((med, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            backgroundColor:
                              index % 2 === 0 ? "#f9f9f9" : "#fff",
                          }}
                        >
                          <TableCell>{med.tabletName}</TableCell>
                          <TableCell align="center">{med.isMorning}</TableCell>
                          <TableCell align="center">{med.isEvening}</TableCell>
                          <TableCell align="center">{med.isNight}</TableCell>
                          <TableCell align="center">{med.days}</TableCell>
                          <TableCell>{med.description}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
              <Paper elevation={3} sx={{ padding: 3, marginBottom: 4 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Consultant Remarks
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  value={prescriptionDetails?.specialRemarks}
                  placeholder="Enter consultant remarks..."
                  variant="outlined"
                  disabled
                />
              </Paper>

              {/* Images Accordion */}
              {prescriptionDetails?.imageUrls?.length > 0 && (
                <Accordion sx={{ marginTop: 4 }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6" fontWeight="bold">
                      Attached Prescriptions
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      {prescriptionDetails.imageUrls.map((image) => (
                        <Grid item xs={12} sm={6} md={4} key={image._id}>
                          <Card
                            onClick={() => handleImageClick(image.s3Url)}
                            sx={{ cursor: "pointer" }}
                          >
                            <CardMedia
                              component="img"
                              height="200"
                              image={image.s3Url}
                              alt={image.name}
                            />
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              )}
              {/* Image Dialog */}
              <Dialog
                open={openImage}
                onClose={handleCloseDialog}
                maxWidth="md"
              >
                <DialogContent>
                  <img
                    src={selectedImage}
                    alt="Prescription"
                    style={{ width: "100%", height: "auto" }}
                  />
                </DialogContent>
              </Dialog>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default Prescription;
