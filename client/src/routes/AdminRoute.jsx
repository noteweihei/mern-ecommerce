import React from "react";
import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import NavtopRes from "../components/NavtopRes";

const AdminRoute = ({ children }) => {
  return (
    <div>
      <NavtopRes />
      <main style={{ marginTop: "6rem" }}>
        <div>
          <Box m="20px">{children}</Box>
        </div>
      </main>
    </div>
  );
};

export default AdminRoute;
