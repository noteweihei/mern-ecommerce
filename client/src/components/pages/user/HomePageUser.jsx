import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ResponsiveAppBar from "../../../Layout/ResponsiveAppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import CartProduct from "./CartProduct";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const HomePageUser = () => {
  const [total, setTotal] = useState(0);
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const format = (value) => value.toLocaleString("en-US");
  const navigate = useNavigate();

  useEffect(() => {
    const cartAmount = cart
      .filter((data) => data.price)
      .map((item) => item.price * item.count);
    const totalAmount = cartAmount.reduce((num, value) => (num += value), 0);
    setTotal(totalAmount);
  }, [cart, setTotal]);

  const checkOut = () => {
    axios
      .post(`${import.meta.env.VITE_URL}/usercart`, cart, {
        headers: {
          Authorization: user.user.token,
        },
      })
      .then((res) => {
        navigate("/user/checkout");
      })
      .catch((err) => {
        console.log(err);
      });
    // toast.info("กรอกชื่อที่อยู่", {
    //   position: "bottom-right",
    //   autoClose: 1000,
    //   theme: "colored",
    // });
    //
  };

  return (
    <div>
      <CssBaseline />
      <ResponsiveAppBar />
      <Container sx={{ py: 1, my: 10 }} maxWidth="md">
        {cart.length === 0 ? (
          <h1 style={{ textAlign: "center" }}>ไม่มีสินค้าในตะกร้า</h1>
        ) : (
          <>
            <div className="mb-3">
              {cart.map((item, index) => (
                <CartProduct key={index} item={item} />
              ))}
            </div>

            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={6} padding={10}>
                  <Item>
                    <Typography marginBottom={2}>
                      ราคารวม{" "}
                      <span style={{ color: "blue" }}>{format(total)}</span> ฿
                    </Typography>
                    <Button variant="contained" onClick={checkOut}>
                      Check Out
                    </Button>
                  </Item>
                </Grid>
              </Grid>
            </Box>
          </>
        )}
      </Container>
    </div>
  );
};

export default HomePageUser;
