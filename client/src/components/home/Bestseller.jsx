import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";

import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Bestseller = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const format = (value) => value.toLocaleString("en-US");
  const databy = [6, "sold", "desc"];
  const fetchData = async () => {
    await axios
      .post(`${import.meta.env.VITE_URL}/productbest`, {
        limit: databy[0],
        sort: databy[1],
        order: databy[2],
      })
      .then((res) => {
        setTimeout(() => {
          setProduct(res.data);
          setLoading(false);
        }, 2000);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
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
    </>
  );
};

export default Bestseller;
