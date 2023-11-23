import React from "react";
import { useSelector } from "react-redux";

const UserRoute = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  return <>{user && user.user.token ? children : <h1>คุณไม่ได้ล็อคอิน</h1>}</>;
};

export default UserRoute;
