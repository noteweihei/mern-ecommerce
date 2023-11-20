import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const LayoutAdmin = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default LayoutAdmin;
