import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
// Redux/toolkit
import { useDispatch } from "react-redux";
// public
import HomeComponent from "./components/HomeComponent";
// login && Register
import Register from "./components/pages/authen/Register";
import Login from "./components/pages/authen/Login";
// user
import HomePageUser from "./components/pages/user/HomePageUser";
import UserRoute from "./routes/UserRoute";
// admin
import AdminRoute from "./routes/AdminRoute";
import HomePageAdmin from "./components/pages/admin/HomePageAdmin";
import DataProduct from "./components/DataProduct";
import EditProduct from "./components/EditProduct";
import { login } from "./store/userSlice";
import Page404 from "./components/Page404";
import { CssBaseline } from "@mui/material";
import ResponsiveAppBar from "./components/ResponsiveAppBar";

const App = () => {
  const dispatch = useDispatch();
  const idToken = localStorage.getItem("token");
  const getUser = async (token) => {
    await axios
      .post(
        `${import.meta.env.VITE_URL}/current-user`,
        {},
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then((res) => {
        dispatch(
          login({
            name: res.data.email,
            role: res.data.role,
            token: token,
          })
        );
      })
      .catch((err) => console.log(err));
  };
  getUser(idToken);

  return (
    <BrowserRouter>
      <CssBaseline />
      <ResponsiveAppBar />
      <Routes>
        {/* public */}
        <Route path="/" element={<HomeComponent />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Page404 />} />
        {/* user */}
        <Route
          path="/user"
          element={
            <UserRoute>
              <HomePageUser />
            </UserRoute>
          }
        />

        {/* admin */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <HomePageAdmin />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/create"
          element={
            <AdminRoute>
              <DataProduct />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/edit/:id"
          element={
            <AdminRoute>
              <EditProduct />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
