import React from "react";
import Navbar from "../components/Navbar";

const AdminRoute = ({ children }) => {
  return (
    <div className="container-fluid mx-auto">
      {/* admin */}
      <Navbar />
      {children}
    </div>
  );
};

export default AdminRoute;
