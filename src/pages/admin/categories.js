import React, { useEffect, useState } from "react";
import {
  Box,
  Toolbar,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Pagination,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import {
  getAllCategories,
  handleCategoryDelete,
  handleCategoryUpdate,
  handleCategoryCreate,
} from "../../api-services/admin";
import { apiRequestStatuses } from "../../common/constant/index";
import { formatDateTime } from "../../utils/common";
import { useDispatch } from "react-redux";
import { notification } from "../../redux/slices/authSlice";
import { Loading } from "../../components";
import {
  Edit as EditIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Circle as CircleIcon,
} from "@mui/icons-material";

const Categories = () => {
  const dispatch = useDispatch();

  const [Categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [Category, setCategory] = useState({ name: "", id: "", imageUrl: "" });
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [paginationn, setPagination] = useState({
    currentPage: 0,
    limit: 0, // Rows per page
    totalPages: 0,
    totalRecords: 0,
  });

  const fetchCategories = async (name, page) => {
    try {
      if (!name) name = "";
      const response = await getAllCategories(name, page);

      const { categories, pagination } = response.payload.data;
      setCategories(categories);
      setPagination({
        currentPage: pagination.currentPage,
        limit: pagination.limit,
        totalRecords: pagination.totalRecords,
        totalPages: pagination.totalPages,
      });
    } catch (err) {
      console.error("Error fetching Organisations:", err); // Log error for debugging
      setError("Error loading Organisations. Please try again later."); // Set user-friendly error message
    } finally {
      setLoading(false); // Move loading state update here
    }
  };

  // Fetch Categories from the backend
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleClickOpen = (cat = { id: null, name: "" }) => {
    setOpen(true);
    if (cat) {
      setCategory({
        id: cat?._id,
        name: cat?.categoryName,
        imageUrl: cat?.imageUrl,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory({
      ...Category,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    let res;
    let message;
    if (Category.id) {
      message = "Updated";
      res = await handleCategoryUpdate(Category);
    } else {
      message = "Created";
      res = await handleCategoryCreate(Category.name, Category.imageUrl);
    }
    if (res.metadata.status === apiRequestStatuses.SUCCESS) {
      fetchCategories();

      dispatch(
        notification({
          open: true,
          type: "success",
          message: `Category ${message} successfully!`,
        })
      );
    }
    setLoading(false);
    setOpen(false);
  };

  const handlePageChange = async (event, newPage) => {
    setPagination((prevState) => ({
      ...prevState,
      currentPage: newPage,
    }));

    await fetchCategories(searchTerm, newPage);
  };

  const handleSearchChange = async (event) => {
    const name = event.target.value;
    setSearchTerm(name);

    fetchCategories(name);
  };

  const handleStatusUpdate = async (cat) => {
    setCategory((prevState) => {
      const updatedCategory = {
        id: cat?._id,
        name: cat?.categoryName,
        isActive: !cat?.isActive,
      };

      handleCategoryUpdate(updatedCategory).then((res) => {
        if (res.metadata.status === apiRequestStatuses.SUCCESS) {
          fetchCategories();

          dispatch(
            notification({
              open: true,
              type: "success",
              message: "Category Updated successfully!",
            })
          );
        }
      });

      return updatedCategory;
    });
  };

  const handleDelete = async (id) => {
    setLoading(true);
    const res = await handleCategoryDelete(id);
    if (res.metadata.status === apiRequestStatuses.SUCCESS) {
      fetchCategories();
      dispatch(
        notification({
          open: true,
          type: "success",
          message: "Category Deleted successfully!",
        })
      );
    }
    setLoading(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Display the loading component if loading is true
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Typography variant="body1">{error}</Typography>; // Show error message
  }

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
    >
      <Toolbar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Category List
        </Typography>

        <TextField
          variant="outlined"
          placeholder="Search by category name"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{
            marginBottom: "20px",
            width: "40%",
            "& .MuiOutlinedInput-root": {
              borderRadius: "20px", // Rounded corners
            },
          }}
        />

        <AddIcon
          sx={{
            color: "aliceblue",
            cursor: "pointer",
            background: "linear-gradient(90deg, #001F54, #9B2ECA)",
          }}
          onClick={() => handleClickOpen({ id: null, name: "" })}
        />
      </Box>
      {Categories.length > 0 ? (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="organisations table">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Category Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>UpdateOn</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Categories.map((cat) => (
                  <TableRow key={cat?._id} hover style={{ cursor: "pointer" }}>
                    <TableCell>
                      {cat?.imageUrl ? (
                        <Avatar alt={cat?.categoryName} src={cat?.imageUrl} />
                      ) : (
                        <Avatar>{cat?.categoryName?.charAt(0)}</Avatar>
                      )}
                    </TableCell>
                    <TableCell>{cat?.categoryName || "-"}</TableCell>
                    <TableCell> {formatDateTime(cat?.updatedOn)}</TableCell>
                    <TableCell>
                      {cat?.isActive ? (
                        <CircleIcon
                          sx={{ color: "#9B2ECA" }}
                          onClick={() => handleStatusUpdate(cat)}
                        />
                      ) : (
                        <CircleIcon
                          sx={{ color: "darkgray" }}
                          onClick={() => handleStatusUpdate(cat)}
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      <EditIcon onClick={() => handleClickOpen(cat)} />
                      <DeleteIcon onClick={() => handleDelete(cat?._id)} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Pagination
            count={paginationn.totalPages} // Total number of pages
            page={paginationn.currentPage} // Current page
            onChange={handlePageChange} // Handle page change
            sx={{ mt: 2, display: "flex", justifyContent: "center" }} // Styling for pagination
          />
        </>
      ) : (
        <Typography variant="body1">No Categories found.</Typography>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          sx: { width: "600px" },
        }}
      >
        <DialogTitle>Category</DialogTitle>
        <DialogContent
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Category Name"
            value={Category.name}
            onChange={handleChange}
            style={{ width: "48%" }}
            variant="standard"
          />

          <TextField
            autoFocus
            required
            margin="dense"
            id="imageUrl"
            name="imageUrl"
            label="Image Url"
            value={Category.imageUrl}
            onChange={handleChange}
            style={{ width: "48%" }}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button type="submit" onClick={handleSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Categories;
