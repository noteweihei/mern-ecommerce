import React from "react";
import { useSelector } from "react-redux";
import ResponsiveAppBar from "../Layout/ResponsiveAppBar";
import { Box } from "@mui/material";

const UserRoute = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  return (
    <>
      {user && user.user.token ? (
        <div>
          <ResponsiveAppBar />
          <main style={{ marginTop: "6rem" }}>
            <div>
              <Box m="20px">{children}</Box>
            </div>
          </main>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default UserRoute;
