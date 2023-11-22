import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const params = useParams();
  const [product, setProduct] = useState({
    name: "",
    desp: "",
    price: "",
    stock: "",
  });
  const [oldImg, setOldImg] = useState();

  const navigate = useNavigate();
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
        navigate("/create");
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
      <h1>Edit Product</h1>
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
      <hr />
      <div class="card" style="width: 18rem;">
        <img src="..." class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <a href="#" class="btn btn-primary">
            Go somewhere
          </a>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
