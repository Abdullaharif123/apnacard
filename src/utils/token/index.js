import { jwtDecode } from "jwt-decode";

export const getRoleFromToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.role; // Extract role from the decoded token
  } catch (err) {
    console.error("Invalid token:", err);
    return null;
  }
};
