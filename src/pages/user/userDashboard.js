import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  Box,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserCategories } from "../../api-services/user";
import { category } from "../../redux/slices/authSlice";

const UserDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orgId } = useSelector((state) => state.auth);
  // console.log("🔴 orgId in dashboard:", orgId);
// console.log("📄 Full auth state:", state.auth);
  const [categories, setCategories] = useState([]);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const fetchUserCategories = async () => {
    try {
      const res = await getUserCategories(orgId);
      setCategories(res.payload.data);
      console.log("Fetched categories:", res);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    fetchUserCategories();
  }, []);

  const handleMenuClick = (cat) => {
    dispatch(category({ category: { id: cat?._id, name: cat?.categoryName } }));
    if (cat.isGeneric && cat?.categoryName === "Prescription") {
      navigate("/prescription");
    } else {
      navigate("/files");
    }
  };

  return (
    <Container component="main" maxWidth="lg" sx={{ marginTop: "5%" }}>
      <Typography variant="h4" align="center" gutterBottom>
        User Dashboard
      </Typography>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        direction={isMobile ? "column" : "row"}
        alignItems={isMobile ? "center" : "stretch"}
      >
        {/* --- Add Promo Code Card at the Start --- */}
        <Grid item xs={12} sm={4}>
          <Card
            onClick={() => navigate("/assign-promo-code")}
            sx={{
              cursor: "pointer",
              minHeight: "140px",
              minWidth: "210px",
              position: "relative",
              overflow: "hidden",
              "&:hover": {
                transform: "scale(1.02)",
                transition: "transform 0.2s ease-in-out",
              },
            }}
          >
            <Box sx={{ position: "relative" }}>
              <CardMedia
                component="img"
                height="140"
                image="/ApnaLogoPrevious.png" // Use a relevant image for promo code
                alt="Assign Promo Code"
                sx={{ filter: "brightness(65%)" }}
              />
              <Typography
                variant="h6"
                color="white"
                align="center"
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                }}
              >
                Assign Promo Code
              </Typography>
            </Box>
          </Card>
        </Grid>

        {/* --- Dynamic Category Cards --- */}
        {categories.map((category, index) => {
          console.log(category);
          console.log(index);
          const imageUrl = category.imageUrl ?? "/Profile.jpeg";
          return (
            <Grid item xs={12} sm={4} key={index}>
              <Card
                onClick={() => handleMenuClick(category)}
                sx={{
                  cursor: "pointer",
                  minHeight: "140px",
                  minWidth: "210px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Box sx={{ position: "relative" }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={`/ApnaLogoPrevious.png`}
                    alt={category.categoryName}
                    sx={{ filter: "brightness(70%)" }}
                  />
                  <Typography
                    variant="h6"
                    color="white"
                    align="center"
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                    }}
                  >
                    {category.categoryName}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default UserDashboard;