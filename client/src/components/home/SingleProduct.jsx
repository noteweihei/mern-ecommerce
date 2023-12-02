import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import CircularProgress from "@mui/material/CircularProgress";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import ResponsiveAppBar from "../../Layout/ResponsiveAppBar";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { _ } from "lodash";
import { useDispatch, useSelector } from "react-redux";
//alert
import Swal from "sweetalert2";
import { toast } from "react-toastify";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function SingleProduct() {
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const params = useParams();
  const [product, setProduct] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const format = (value) => value.toLocaleString("en-US");
  const fetchData = async (id) => {
    await axios
      .get(`${import.meta.env.VITE_URL}/product/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  React.useEffect(() => {
    fetchData(params.id);
  }, [params]);

  const addToCart = () => {
    if (user.user.token !== null) {
      let cart = [];
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.push({
        ...product,
        count: 1,
      });
      let items = _.uniqWith(cart, _.isEqual);
      localStorage.setItem("cart", JSON.stringify(items));
      dispatch({
        type: "ADD_TO_CART",
        payload: items,
      });
      toast.success("เพิ่มสินค้าลงตะกร้าเรียบร้อยแล้ว", {
        position: "bottom-right",
        autoClose: 1000,
        theme: "colored",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "คุณยังไม่ได้ล็อคอินเข้าใช้งาน!",
        text: "กรุณาเข้าสู่ระบบเพื่อสั่งซื้อสินค้า",
        footer: '<a href="/login">คลิ๊ก !! เพื่อเข้าสู่ระบบ</a>',
      });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <ResponsiveAppBar />
      <Container sx={{ py: 1, my: 10 }} maxWidth="md">
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress
              color="secondary"
              title={`กำลังโหลดข้อมูลสินค้า ${product.name}`}
              size={100}
            />{" "}
            &nbsp; &nbsp;
            <h1>กำลังโหลดข้อมูล....</h1>
          </div>
        ) : (
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Item>
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: "100%",
                    }}
                    image={`${import.meta.env.VITE_LINK_IMG}/${product.file}`}
                  />
                </Item>
              </Grid>
              <Grid item xs={4}>
                <Item style={{ textAlign: "start" }}>
                  <h4>{product.name}</h4> &nbsp;
                  <h6>รายละเอียดสินค้า</h6> &nbsp;
                  <Typography>{product.desp}</Typography> &nbsp;
                  <Typography color="red">
                    ราคา {format(product.price)} บาท
                  </Typography>{" "}
                  &nbsp;
                  <Typography color="red">
                    จำนวนสินค้า {format(product.stock)} ชิ้น
                  </Typography>{" "}
                  &nbsp;
                  <Typography color="blue">
                    ขายได้ {format(product.sold)} ชิ้น
                  </Typography>{" "}
                  &nbsp;
                  <Typography style={{ width: "100%", textAlign: "center" }}>
                    <Button
                      style={{ width: "100%" }}
                      variant="contained"
                      color="success"
                      title="เพิ่มสินค้าลงในตะกร้า"
                      onClick={addToCart}
                    >
                      <AddShoppingCartIcon fontSize="large" />
                    </Button>
                  </Typography>
                </Item>
              </Grid>
            </Grid>
          </Box>
        )}
      </Container>
    </ThemeProvider>
  );
}
