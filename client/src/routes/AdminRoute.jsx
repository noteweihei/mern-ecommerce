import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import NavtopRes from "../components/NavtopRes";
import { useSelector } from "react-redux";
import Page404 from "../components/Page404";

const AdminRoute = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [check, setCheck] = useState(false);
  useEffect(() => {
    if (user.user.role === "admin" && user.user.token) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  }, [user]);

  return check ? (
    <div>
      <NavtopRes />
      <main style={{ marginTop: "6rem" }}>
        <div>
          <Box m="20px">{children}</Box>
        </div>
      </main>
    </div>
  ) : (
    <Page404 />
  );
};

export default AdminRoute;
