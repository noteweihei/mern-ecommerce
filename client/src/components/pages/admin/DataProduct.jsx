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
import ListProduct from "./ListProduct";
import { toast } from "react-toastify";
import axios from "axios";

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

const DataProduct = () => {
  const [dataProduct, setDataProduct] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const auth = localStorage.getItem("token");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataUploadIMG = new FormData();
    for (const key in dataProduct) {
      dataUploadIMG.append(key, dataProduct[key]);
    }
    await axios
      .post(`${import.meta.env.VITE_URL}/addproduct`, dataUploadIMG, {
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
        toast.error("เกิดข้อผิดพลาดในการบันทึกสินค้า", err, {
          autoClose: 1000,
          theme: "colored",
        });
        e.preventDefault();
      });
  };

  const handleChange = (e) => {
    if (e.target.name === "file") {
      setDataProduct({
        ...dataProduct,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setDataProduct({
        ...dataProduct,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <div>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "end",
        }}
      >
        <Button variant="outlined" onClick={handleClickOpen}>
          เพิ่มสินค้า
        </Button>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            บันทึกข้อมูลของสินค้า
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
                    เพิ่มรูปสินค้า
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
                บันทึกข้อมูล
              </Button>
            </Box>
          </DialogContent>
        </BootstrapDialog>
      </Box>
      <ListProduct />
    </div>
  );
};

export default DataProduct;
