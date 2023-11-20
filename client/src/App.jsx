import DataProduct from "./components/DataProduct";
import EditProduct from "./components/EditProduct";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeAdmin from "./components/HomeAdmin";
import LayoutAdmin from "./Layout/LayoutAdmin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutAdmin />,
    children: [
      {
        path: "/",
        element: <HomeAdmin />,
      },
      {
        path: "/createproduct",
        element: <DataProduct />,
      },
      {
        path: "/editproduct",
        element: <EditProduct />,
      },
    ],
  },
]);

const App = () => {
  return (
    <div className="container-fluid mx-auto">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
