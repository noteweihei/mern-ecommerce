import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// redux ส่งข้อมูลเข้า store
import { useDispatch } from "react-redux";
import { login as loginRedux } from "../../../store/userSlice";
import { toast } from "react-toastify";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://www.facebook.com/methasit.bunthanom">
        Valentinote Zyzap
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const dataCustom = {
      email: data.get("email"),
      password: data.get("password"),
    };
    axios
      .post(`${import.meta.env.VITE_URL}/login`, dataCustom)
      .then((res) => {
        console.log(res);
        toast.success(
          `ยินดีต้อนรับคุณ ${res.data.payload.user.name} เข้าสู่ระบบ`,
          {
            autoClose: 3000,
            theme: "colored",
          }
        );
        dispatch(
          loginRedux({
            name: res.data.payload.user.name,
            role: res.data.payload.user.role,
            token: res.data.token,
          })
        );
        localStorage.setItem("token", res.data.token);
        roleRedirect(res.data.payload.user.role);
      })
      .catch((err) => {
        toast.error("Email หรือ รหัสผ่านไม่ถูกต้อง", {
          position: "top-center",
          autoClose: 3000,
          theme: "colored",
        });
      });
  };

  const roleRedirect = (role) => {
    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/user");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            เข้าสู่ระบบเพื่อใช้งาน
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              เข้าสู่ระบบ
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  ลืมรหัสผ่าน?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"คุณยังไม่มีบัญชี ใช่หรือไม่ ?"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
