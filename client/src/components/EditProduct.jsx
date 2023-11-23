import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

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
      <h1>แก้ไขสินค้า</h1>
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
      <div className="card" style={{ width: "30rem" }}>
        <div className="d-flex justify-content-between align-items-center m-3 p-2">
          <img
            src={`${import.meta.env.VITE_LINK_IMG}/${product.file}`}
            className="card-img-top"
            style={{ objectFit: "cover", width: "200px", height: "200px" }}
          />
          <div className="card-body">
            <h5 className="card-title">{product.name}</h5>
            <p className="card-text">{product.desp}</p>
            <p className="card-text">{product.price} ฿</p>
            <p className="card-text">{product.stock} ชิ้น</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
