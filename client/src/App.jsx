import DataProduct from "./components/DataProduct";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeAdmin from "./components/HomeAdmin";
import LayoutAdmin from "./Layout/LayoutAdmin";
import EditProduct from "./components/EditProduct";

// Layout

const App = () => {
  return (
    <Router>
      <div className="container-fluid mx-auto">
        <Routes>
          <Route path="/" element={<LayoutAdmin />}>
            <Route path="/" element={<HomeAdmin />} />
            <Route path="/create" element={<DataProduct />} />
            <Route path="/edit/:id" element={<EditProduct />} />
            <Route path="*" element={<HomeAdmin />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
