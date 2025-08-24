import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const HollowButton = styled(Button)(({ theme }) => ({
  border: "2px solid black",
  backgroundColor: "transparent",
  color: "black",
  padding: "10px 20px",
  fontSize: "1rem",
  fontWeight: "bold",
  borderRadius: "4px",
  cursor: "pointer",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "black",
    color: "white",
  },
  "&:focus": {
    outline: "none",
    boxShadow: "0 0 0 3px rgba(0, 0, 0, 0.2)",
  },
}));

export default HollowButton;
