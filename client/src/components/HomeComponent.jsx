import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import ResponsiveAppBar from "../Layout/ResponsiveAppBar";
import Bestseller from "./home/Bestseller";
import VisibilityIcon from "@mui/icons-material/Visibility";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function HomeComponent() {
  const [product, setProduct] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const format = (value) => value.toLocaleString("en-US");
  const databy = [3, "createdAt", "desc"];
  const fetchData = async () => {
    await axios
      .post(`${import.meta.env.VITE_URL}/productby`, {
        limit: databy[0],
        sort: databy[1],
        order: databy[2],
      })
      .then((res) => {
        setTimeout(() => {
          setProduct(res.data);
          setLoading(false);
        }, 1500);
      })
      .catch((err) => console.log(err));
  };
  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <ResponsiveAppBar />
      <Container sx={{ py: 1, my: 10 }} maxWidth="md">
        {/* New Products */}
        <h1>สินค้ามาใหม่</h1>
        {loading ? (
          <div className="text-center" type="button" disabled>
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>{" "}
            <h3>กำลังโหลดข้อมูล...</h3>
          </div>
        ) : (
          <Grid container spacing={4}>
            {product.map((data, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: "56.25%",
                    }}
                    image={`${import.meta.env.VITE_LINK_IMG}/${data.file}`}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {data.name.substring(0, 20)}
                    </Typography>
                  </CardContent>
                  <CardActions className="d-flex justify-content-between">
                    <Button size="small">ราคา {format(data.price)} บาท</Button>
                    <Button size="small" href={`/product/${data._id}`}>
                      <VisibilityIcon titleAccess="ดูสินค้าเพิ่มเติม" />
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
        <hr />
        {/* Best Seller */}
        <h1>สินค้าแนะนำ</h1>
        <Bestseller />
      </Container>
    </ThemeProvider>
  );
}
