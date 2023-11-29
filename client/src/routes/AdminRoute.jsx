import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import NavtopRes from "../components/pages/admin/NavtopRes";
import { useSelector } from "react-redux";
import Page404 from "../components/Page404";
import axios from "axios";

const AdminRoute = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [check, setCheck] = useState(false);
  useEffect(() => {
    if (user && user.user.token) {
      axios
        .post(
          `${import.meta.env.VITE_URL}/current-admin`,
          {},
          {
            headers: {
              Authorization: user.user.token,
            },
          }
        )
        .then((res) => {
          setCheck(true);
        })
        .catch((err) => {
          console.log(err);
          setCheck(false);
        });
    }
  }, [user]);

  return (
    check && (
      <div>
        <NavtopRes />
        <main style={{ marginTop: "6rem" }}>
          <div>
            <Box m="20px">{children}</Box>
          </div>
        </main>
      </div>
    )
  );
};

export default AdminRoute;
