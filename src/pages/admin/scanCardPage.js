import React, { useState, useEffect } from "react";
import { Typography, Grid, CardContent, Card } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { getUserDetails } from "../../api-services/user";
import { Loading } from "../../components";
import { notification } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { cardType } from "../../common/constant";

const PrescriptionPage = () => {
  const { cardNumber } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  const fetchUserDetails = async () => {
    try {
      const res = await getUserDetails(cardNumber);
      const userData = res.payload.data.existingUser;

      if (userData.cardType == cardType.SINGLECARD) {
        navigate(`/scancard/${cardNumber}/${userData._id}`);
      }
      setUserDetails(userData);

      if (userData) {
      } else {
        dispatch(
          notification({
            open: true,
            type: "error",
            message: "User not found for the provided card number.",
          })
        );
        return;
      }
    } catch (err) {
      console.error("Error fetching user details:", err);
      setError("Failed to fetch user details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [cardNumber]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Grid
      container
      spacing={3}
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Top row with 'Ali' card */}
      <Grid item>
        <Card
          sx={{ width: 200, cursor: "pointer", textAlign: "center" }}
          onClick={() => navigate(`/scancard/${cardNumber}/${userDetails._id}`)}
        >
          <CardContent>
            <Typography variant="h6">
              {`${userDetails.firstName} ${userDetails.lastName}`}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Card Holder
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {userDetails.familyMembers && userDetails.familyMembers?.length > 0 ? (
        <>
          {/* Title */}
          <Grid item>
            <Typography variant="h5" fontWeight="bold" align="center">
              Select a family member to add a prescription
            </Typography>
          </Grid>

          {/* Family members row */}
          <Grid item container spacing={3} justifyContent="center">
            {userDetails.familyMembers.map((member) => (
              <Grid item key={member._id}>
                <Card
                  sx={{ width: 200, cursor: "pointer", textAlign: "center" }}
                  onClick={() =>
                    navigate(`/scancard/${cardNumber}/${member._id}`)
                  }
                >
                  <CardContent>
                    <Typography variant="h6">{member.firstName}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {member.relation}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <Grid item>
          <Typography variant="h6" align="center">
            No member found
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default PrescriptionPage;
