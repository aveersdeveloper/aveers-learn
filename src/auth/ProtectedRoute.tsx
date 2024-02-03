import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./ProtectedRoute.css";
import Stars from "../components/Stars";

export const ProtectedRoute: React.FC<{ element: React.ReactElement }> = ({
  element,
}) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      /* <div className="spinner-container">
        <Spin indicator={antIcon} />
      </div> */
      /*  <div className="spinner-container">
        <div className="planet-loader">
          <div className="orbiting-satellite"></div>
          <div className="orbiting-satellite satellite2"></div>
        </div>
      </div> */
      <div className="spinner-container">
        <Stars />
        <h1 className="noauthtitle">🚀</h1>
        <span className="subtitle">Launching into the orbit...</span>
        {/* <div className="planet-loader">
          <div className="orbiting-satellite"></div>
          <div className="orbiting-satellite satellite2"></div>
        </div> */}
      </div>
    );
  }

  if (isAuthenticated) {
    return element;
  }

  // Redirect to sign-in page and remember the location they tried to access
  return <Navigate to={`/signin?from=${location.pathname}`} replace />;
};
