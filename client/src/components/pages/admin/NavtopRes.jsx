import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
// redux
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../store/userSlice";

//icon
import AssessmentIcon from "@mui/icons-material/Assessment";
import LogoutIcon from "@mui/icons-material/Logout";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AddHomeIcon from "@mui/icons-material/AddHome";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";

function NavtopRes() {
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="navOntop">
      {["md"].map((expand) => (
        <Navbar
          key={expand}
          expand={expand}
          className="mb-3"
          bg="primary"
          data-bs-theme="dark"
        >
          <Container fluid>
            <Navbar.Brand href="/admin">ADMIN Dashboard</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Menu SideBar
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end align-item-center flex-grow-1 pe-3">
                  <Nav.Link href="/admin">
                    <AddHomeIcon titleAccess="หน้าแรก" fontSize="large" />
                  </Nav.Link>
                  <Nav.Link href="/admin/create">
                    <AddBusinessIcon
                      titleAccess="จัดการสินค้า"
                      fontSize="large"
                    />
                  </Nav.Link>
                  <Nav.Link href="/admin/order">
                    <ListAltIcon titleAccess="จัดการออเดอร์" fontSize="large" />
                  </Nav.Link>
                  <Nav.Link href="/admin/create">
                    <AssessmentIcon titleAccess="รายงาน" fontSize="large" />
                  </Nav.Link>
                  <Nav.Link href="/admin/manage">
                    <AssignmentIndIcon
                      titleAccess="จัดการข้อมูลผู้ใช้งาน"
                      fontSize="large"
                    />
                  </Nav.Link>
                  &nbsp; &nbsp;
                  <Nav.Link href="#">
                    <LogoutIcon
                      titleAccess="ออกจากระบบ"
                      fontSize="large"
                      color="error"
                      onClick={handleLogout}
                    />
                  </Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </nav>
  );
}

export default NavtopRes;
