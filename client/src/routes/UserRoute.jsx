import React from "react";
import { useSelector } from "react-redux";
import ResponsiveAppBar from "../Layout/ResponsiveAppBar";
import Page404 from "../components/Page404";

const UserRoute = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  return (
    <>
      {user && user.user.token ? (
        <>
          <ResponsiveAppBar />
          {children}
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default UserRoute;
