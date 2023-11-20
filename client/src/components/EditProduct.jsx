import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";

const EditProduct = () => {
  const params = useParams();
  const [product, setProduct] = useState({
    name: "",
    desp: "",
    price: "",
    stock: "",
  });

  const navigate = useNavigate();
  useEffect(() => {
    loadData(params.id);
  }, []);

  const loadData = async (id) => {
    await axios
      .get(`${import.meta.env.VITE_URL}/product/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .put(`${import.meta.env.VITE_URL}/editproduct/${params.id}`, product)
      .then((res) => {
        alert("ทำการอัพเดทข้อมูลเรียบร้อย", res);
        navigate("/create");
      })
      .catch((err) => console.log(err));
  };
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Form className="my-5" onSubmit={handleSubmit}>
      <div className="row">
        <Form.Group
          className="mb-3 col-md-4"
          controlId="exampleForm.ControlInput1"
        >
          <Form.Label>ชื่อสินค้า</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="ป้อนชื่อสินค้า"
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
            placeholder="ป้อนรายละเอียดสินค้า"
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3 col-md-4">
          <Form.Label>อัพโหลดรูปภาพ</Form.Label>
          <Form.Control type="file" />
        </Form.Group>
        <Form.Group
          className="mb-3 col-md-4"
          controlId="exampleForm.ControlInput1"
        >
          <Form.Label>ราคา</Form.Label>
          <Form.Control
            type="number"
            name="price"
            placeholder="ระบุราคา"
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
            placeholder="ป้อนสต๊อกสินค้าในคลัง"
            value={product.stock}
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>
      </div>
      <Button variant="success" type="submit">
        อัพเดทข้อมูล
      </Button>
    </Form>
  );
};

export default EditProduct;
