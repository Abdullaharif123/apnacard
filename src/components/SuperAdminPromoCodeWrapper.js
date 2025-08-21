// src/components/SuperAdminPromoCodeWrapper.js

import React from "react";
import { useSelector } from "react-redux";
import UserPromoCodePage from "../pages/user/userpromocode";

const SuperAdminPromoCodeWrapper = () => {
  const { userId, role, firstName, lastName, email } = useSelector((state) => state.auth);

  const loggedInUser = {
    _id: userId,
    firstName: firstName || "",
    lastName: lastName || "",
    email: email || "",
  };

  // ✅ Treat Super Admin as "admin" for this page
  return (
    <UserPromoCodePage
      role="admin"           // 👈 Force role = admin
      loggedInUser={loggedInUser}
    />
  );
};

export default SuperAdminPromoCodeWrapper;