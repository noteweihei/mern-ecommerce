import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";

//icon
import AssessmentIcon from "@mui/icons-material/Assessment";
import LogoutIcon from "@mui/icons-material/Logout";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";

function NavtopRes() {
  return (
    <nav className="navOntop">
      {["md"].map((expand) => (
        <Navbar
          key={expand}
          expand={expand}
          className="bg-body-tertiary mb-3"
          bg="dark"
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
                    <MapsHomeWorkIcon
                      titleAccess="หน้าแรก"
                      fontSize="large"
                      color="primary"
                    />{" "}
                    หน้าแรก
                  </Nav.Link>
                  <Nav.Link href="/admin/create">
                    <Inventory2Icon
                      titleAccess="จัดการสินค้า"
                      fontSize="large"
                      color="primary"
                    />{" "}
                    จัดการสินค้า
                  </Nav.Link>
                  <Nav.Link href="/admin/create">
                    <ContactEmergencyIcon
                      titleAccess="จัดการสินค้า"
                      fontSize="large"
                      color="primary"
                    />{" "}
                    จัดการข้อมูลลูกค้า
                  </Nav.Link>
                  <Nav.Link href="/admin/create">
                    <AssessmentIcon
                      titleAccess="รายงานสถิติ"
                      fontSize="large"
                      color="primary"
                    />{" "}
                    รายงาน
                  </Nav.Link>
                  <Nav.Link href="/admin/create">
                    <AssignmentIndIcon
                      titleAccess="ข้อมูลผู้ใช้งาน"
                      fontSize="large"
                      color="primary"
                    />{" "}
                    ข้อมูลผู้ใช้งาน
                  </Nav.Link>
                  &nbsp; &nbsp; &nbsp; &nbsp;
                  <Nav.Link href="/admin/create">
                    <LogoutIcon
                      titleAccess="ออกจากระบบ"
                      fontSize="large"
                      color="primary"
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
