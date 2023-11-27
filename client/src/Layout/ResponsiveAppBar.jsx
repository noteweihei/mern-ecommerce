import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import { Link, useNavigate } from "react-router-dom";

import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import LoginIcon from "@mui/icons-material/Login";
import Logo from "../assets/electroneum-etn-logo.png";
import Profile from "../assets/profile.jpg";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/userSlice";

function ResponsiveAppBar() {
  const pages = [
    {
      title: "สินค้าทั้งหมด",
      icon: "",
      to: "/product",
    },
    {
      title: "บริการ",
      icon: "",
      to: "/service",
    },
    {
      title: "ติดตามสินค้า",
      icon: "",
      to: "/contract",
    },
    {
      title: "ติดต่อร้านค้า",
      icon: "",
      to: "/contact",
    },
  ];

  const authen = [
    {
      title: "ลงทะเบียน",
      icon: <PeopleAltOutlinedIcon />,
      to: "/register",
    },
    {
      title: "เข้าสู่ระบบ",
      icon: <LoginIcon />,
      to: "/login",
    },
  ];

  const settings = [
    {
      title: "ออกจากระบบ",
      icon: "",
      to: "#",
    },
  ];

  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    handleCloseUserMenu();
    navigate("/");
  };

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      style={{
        backgroundColor: "#3081D0",
        position: "fixed",
        top: "0",
        left: "0",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* LOGO */}
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <IconButton>
              <Avatar alt="Remy Sharp" src={Logo} />
            </IconButton>
          </Typography>
          {/* /LOGO */}

          {/* Minimize Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem key={index} onClick={handleCloseNavMenu}>
                  <Link
                    to={page.to}
                    style={{ textDecoration: "none" }}
                    key={index}
                  >
                    <Typography textAlign="center">{page.title}</Typography>
                  </Link>
                </MenuItem>
              ))}

              {user.user.role !== "user" &&
                authen.map((page, index) => (
                  <MenuItem key={index} onClick={handleCloseNavMenu}>
                    <Link
                      to={page.to}
                      style={{ textDecoration: "none" }}
                      key={index}
                    >
                      <Typography textAlign="center">{page.title}</Typography>
                    </Link>
                  </MenuItem>
                ))}
            </Menu>
          </Box>
          {/* /Minimize Menu */}

          {/* LOGO Minimize */}
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <IconButton>
              <Avatar alt="Remy Sharp" src={Logo} />
            </IconButton>
          </Typography>
          {/* /LOGO Minimize */}

          {/* Menu Left Full */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, index) => (
              <Link to={page.to} key={index}>
                <Button
                  key={index}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", mr: 5 }}
                >
                  {page.title}
                </Button>
              </Link>
            ))}
          </Box>
          {/* /Menu Left Full */}

          {/* Menu Right Full */}
          <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
            {user.user.role !== "user" &&
              authen.map((page, index) => (
                <Link to={page.to} key={index}>
                  <Button
                    key={index}
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color: "white",
                      mr: 2,
                    }}
                    startIcon={page.icon}
                  >
                    {page.title}
                  </Button>
                </Link>
              ))}
          </Box>
          {/* /Menu Right Full */}

          {/* User Menu */}
          {user.user.role === "user" && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="เมนูผู้ใช้งาน">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={Profile} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting, index) => (
                  <MenuItem
                    key={index}
                    onClick={
                      setting.title === "ออกจากระบบ"
                        ? handleLogout
                        : handleCloseUserMenu
                    }
                  >
                    <Link
                      to={setting.to}
                      style={{ textDecoration: "none" }}
                      key={index}
                    >
                      <Typography textAlign="center">
                        {setting.title}
                      </Typography>
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}

          {/* /User Menu */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
