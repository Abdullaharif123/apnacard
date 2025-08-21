// src/components/PromoCodeWrapper.js

import React from "react";
import { useSelector } from "react-redux";

import UserPromoCode from "../pages/user/userpromocode"; // adjust path if needed

const PromoCodeWrapper = () => {
  const { userId, role, firstName, lastName, email } = useSelector((state) => state.auth);

  // ✅ Build full user object
  const loggedInUser = {
    _id: userId,
    firstName: firstName || "",
    lastName: lastName || "",
    email: email || "",
  };

  return (
    <UserPromoCode
      role={role || "user"}
      loggedInUser={loggedInUser}
    />
  );
};

export default PromoCodeWrapper;