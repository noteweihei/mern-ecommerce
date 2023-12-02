import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
// Redux/toolkit
import { useDispatch } from "react-redux";
import { login } from "./store/userSlice";
// public
import HomeComponent from "./components/HomeComponent";
import Product from "./components/home/Product";
import SingleProduct from "./components/home/SingleProduct";
import Page404 from "./components/Page404";
import { CssBaseline } from "@mui/material";
// login && Register
import Register from "./components/pages/authen/Register";
import Login from "./components/pages/authen/Login";
// user
import HomePageUser from "./components/pages/user/HomePageUser";
import UserRoute from "./routes/UserRoute";
import CheckOut from "./components/pages/user/CheckOut";
// admin
import AdminRoute from "./routes/AdminRoute";
import HomePageAdmin from "./components/pages/admin/HomePageAdmin";
import DataProduct from "./components/pages/admin/DataProduct";
import EditProduct from "./components/pages/admin/EditProduct";
import ManageUser from "./components/pages/admin/ManageUser";
// แจ้งเตือน
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      <ToastContainer />
      <Routes>
        {/* public */}
        <Route path="/" element={<HomeComponent />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Page404 />} />
        {/* user */}
        <Route
          path="/user"
          element={
            <UserRoute>
              <HomeComponent />
            </UserRoute>
          }
        />
        <Route
          path="/user/cart"
          element={
            <UserRoute>
              <HomePageUser />
            </UserRoute>
          }
        />
        <Route
          path="/user/checkout"
          element={
            <UserRoute>
              <CheckOut />
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
        <Route
          path="/admin/manage"
          element={
            <AdminRoute>
              <ManageUser />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
