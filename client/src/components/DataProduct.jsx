import axios from "axios";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
const DataProduct = () => {
  const [product, setProduct] = useState([]);
  const [dataProduct, setDataProduct] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    await axios
      .get(`${import.meta.env.VITE_URL}/product`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataUploadIMG = new FormData();
    for (const key in dataProduct) {
      dataUploadIMG.append(key, dataProduct[key]);
    }
    await axios
      .post(`${import.meta.env.VITE_URL}/addproduct`, dataUploadIMG)
      .then(() => {
        alert("บันทึกข้อมูลเรียบร้อย");
        loadData();
        window.location.reload();
      })
      .catch((err) => {
        alert(err);
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

  const handleDelete = async (id) => {
    await axios
      .delete(`${import.meta.env.VITE_URL}/deleteproduct/${id}`)
      .then(() => {
        alert("ลบข้อมูลเรียบร้อย");
        loadData();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
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
              placeholder="ป้อนชื่อสินค้า"
              onChange={(event) => handleChange(event)}
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
              placeholder="ป้อนรายละเอียดสินค้า"
              onChange={(event) => handleChange(event)}
            />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3 col-md-4">
            <Form.Label>อัพโหลดรูปภาพ</Form.Label>
            <Form.Control
              type="file"
              name="file"
              onChange={(event) => handleChange(event)}
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
              placeholder="ระบุราคา"
              onChange={(event) => handleChange(event)}
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
              onChange={(event) => handleChange(event)}
            />
          </Form.Group>
        </div>
        <Button variant="danger" type="submit">
          บันทึกข้อมูล
        </Button>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>รูปสินค้า</th>
            <th>ชื่อสินค้า</th>
            <th>รายละเอียด</th>
            <th>ราคา</th>
            <th>Stock</th>
            <th>ลบ</th>
            <th>แก้ไข</th>
          </tr>
        </thead>
        <tbody>
          {product
            ? product.map((data, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{data.file}</td>
                  <td>{data.name}</td>
                  <td>{data.desp}</td>
                  <td>{data.price}</td>
                  <td>{data.stock}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(data._id)}
                      className="btn btn-danger"
                    >
                      ลบข้อมูล
                    </button>
                  </td>
                  <td>
                    <Link to={`/edit/${data._id}`} className="btn btn-primary">
                      แก้ไข
                    </Link>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    </>
  );
};

export default DataProduct;
