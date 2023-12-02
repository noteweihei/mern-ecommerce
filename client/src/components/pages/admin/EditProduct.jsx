import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { useParams } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { toast } from "react-toastify";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const EditProduct = () => {
  const params = useParams();
  const [product, setProduct] = React.useState({
    name: "",
    desp: "",
    price: "",
    stock: "",
  });
  const [oldImg, setOldImg] = React.useState();
  const [open, setOpen] = React.useState(false);
  const format = (value) => value.toLocaleString("en-US");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    loadData(params.id);
  }, [params]);

  const loadData = async (id) => {
    await axios
      .get(`${import.meta.env.VITE_URL}/product/${id}`)
      .then((res) => {
        setProduct(res.data);
        setOldImg(res.data.file);
      })
      .catch((err) => {
        toast.error("เกิดข้อผิดพลาด Server Error ", err, {
          autoClose: 1000,
        });
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = localStorage.getItem("token");
    const dataUpdate = new FormData();
    for (const key in product) {
      dataUpdate.append(key, product[key]);
    }
    dataUpdate.append("oldImg", oldImg);
    await axios
      .put(`${import.meta.env.VITE_URL}/editproduct/${params.id}`, dataUpdate, {
        headers: {
          Authorization: auth,
        },
      })
      .then((res) => {
        toast.success(`บันทึก ${res.data.name} เรียบร้อยแล้ว`, {
          autoClose: 1000,
          theme: "colored",
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch((err) => {
        toast.error("เกิดข้อผิดพลาด Server Error", err, {
          autoClose: 1000,
          theme: "colored",
        });
      });
  };

  const handleChange = (e) => {
    if (e.target.name === "file") {
      setProduct({
        ...product,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setProduct({
        ...product,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <div className="container mt-5">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "end",
        }}
      >
        <Button variant="outlined" onClick={handleClickOpen}>
          แก้ไขสินค้า
        </Button>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            อัพเดทข้อมูลของสินค้า
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    type="text"
                    name="name"
                    required
                    fullWidth
                    label="ชื่อสินค้า"
                    autoFocus
                    value={product.name}
                    onChange={(event) => handleChange(event)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="text"
                    required
                    fullWidth
                    name="desp"
                    label="รายละเอียดสินค้า"
                    multiline
                    rows={4}
                    value={product.desp}
                    onChange={(event) => handleChange(event)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="number"
                    name="price"
                    required
                    fullWidth
                    label="ราคา"
                    value={product.price}
                    autoFocus
                    onChange={(event) => handleChange(event)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="number"
                    name="stock"
                    required
                    fullWidth
                    label="จำนวนสินค้า"
                    value={product.stock}
                    autoFocus
                    onChange={(event) => handleChange(event)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                  >
                    อัพเดทรูปสินค้า
                    <VisuallyHiddenInput
                      type="file"
                      name="file"
                      onChange={(event) => handleChange(event)}
                    />
                  </Button>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                อัพเดทข้อมูล
              </Button>
            </Box>
          </DialogContent>
        </BootstrapDialog>
      </Box>

      <hr />
      <div className="d-flex justify-content-center my-2">
        <Card sx={{ width: 500, borderRadius: 3 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              width={"200"}
              image={`${import.meta.env.VITE_LINK_IMG}/${product.file}`}
              alt="green iguana"
            />

            <CardContent>
              <Typography
                gutterBottom
                variant="h3"
                color="secondary"
                component="div"
              >
                {product.name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                className="my-2"
              >
                {product.desp}
              </Typography>
              <div className="d-flex justify-content-between">
                <Typography variant="body2" color="primary">
                  สินค้าในสต๊อก {format(product.stock)} ชิ้น
                </Typography>
                <Typography variant="body2" color="primary">
                  ราคา {format(product.price)} ฿
                </Typography>
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </div>
  );
};

export default EditProduct;
