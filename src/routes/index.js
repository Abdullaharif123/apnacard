import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import {
  privateRoutes,
  publicRoutes,
  superAdminRoutes,
  adminRoutes,
  userRoutes,
} from "./elements";
import { userRoles } from "../common/constant/index.js";
import Layout from "../layout.js";

const RoutesComponent = () => {
  const { token, role } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      // Additional logic if necessary
    }
  }, [token]);

  const renderRoutes = (routes, enableSideBar) =>
    routes?.map(({ path, element }, index) =>
      enableSideBar ? (
        <Route
          key={`${path}_${index}`}
          path={path}
          element={<Layout>{element}</Layout>}
        />
      ) : (
        <Route key={`${path}_${index}`} path={path} element={element} />
      )
    );

  const getRoleBasedRoutes = () => {
    switch (role) {
      case userRoles.SUPER_ADMIN:
        return renderRoutes(superAdminRoutes, true);
      case userRoles.ADMIN:
        return renderRoutes(adminRoutes, true);
      case userRoles.USER:
        return renderRoutes(userRoutes, true);
      default:
        return null;
    }
  };

  return (
    <Routes>
      {/* Public Routes */}
      {!token ? (
        <>
          <Route path="*" element={<Navigate to="/marketplace" replace />} />
          {renderRoutes(publicRoutes, false)}
          {/* <Route path="*" element={<Navigate to="/lost" replace />} /> */}
        </>
      ) : (
        <>
          {/* Role-Based Routes */}
          {getRoleBasedRoutes()}

          {/* Private Routes */}
          {renderRoutes(privateRoutes)}

          {/* Default Fallback */}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </>
      )}
    </Routes>
  );
};

export default RoutesComponent;
