import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const EditProduct = () => {
  const params = useParams();
  const [product, setProduct] = useState({
    name: "",
    desp: "",
    price: "",
    stock: "",
  });
  const [oldImg, setOldImg] = useState();

  useEffect(() => {
    loadData(params.id);
  }, [params]);

  const loadData = async (id) => {
    await axios
      .get(`${import.meta.env.VITE_URL}/product/${id}`)
      .then((res) => {
        setProduct(res.data);
        setOldImg(res.data.file);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataUpdate = new FormData();
    for (const key in product) {
      dataUpdate.append(key, product[key]);
    }
    dataUpdate.append("oldImg", oldImg);
    await axios
      .put(`${import.meta.env.VITE_URL}/editproduct/${params.id}`, dataUpdate)
      .then((res) => {
        alert("ทำการอัพเดทข้อมูลเรียบร้อย", res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
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
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        แก้ไขสินค้า
      </button>
      {/* Modal Pop up */}
      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">
                แก้ไขข้อมูลสินค้า
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <Form
                className="my-5"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
              >
                <div className="row">
                  <Form.Group
                    className="mb-3 col-md-4"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>ชื่อสินค้า</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={product.name}
                      onChange={(e) => handleChange(e)}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3 col-md-6"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>รายละเอียดสินค้า</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="desp"
                      rows={3}
                      value={product.desp}
                      onChange={(e) => handleChange(e)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formFile" className="mb-3 col-md-4">
                    <Form.Label>อัพโหลดรูปภาพ</Form.Label>
                    <Form.Control
                      type="file"
                      name="file"
                      onChange={(e) => handleChange(e)}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3 col-md-4"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>ราคา</Form.Label>
                    <Form.Control
                      type="number"
                      name="price"
                      value={product.price}
                      onChange={(e) => handleChange(e)}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3 col-md-4"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>สต๊อกสินค้า</Form.Label>
                    <Form.Control
                      type="number"
                      name="stock"
                      value={product.stock}
                      onChange={(e) => handleChange(e)}
                    />
                  </Form.Group>
                </div>
                <Button variant="danger" type="submit">
                  บันทึกข้อมูล
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>

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
                <h6>รายละเอียดสินค้า</h6>
                {product.desp}
              </Typography>
              <div className="d-flex justify-content-between">
                <Typography variant="body2" color="primary">
                  สินค้าในสต๊อก {product.stock} ชิ้น
                </Typography>
                <Typography variant="body2" color="primary">
                  ราคา {product.price} ฿
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
