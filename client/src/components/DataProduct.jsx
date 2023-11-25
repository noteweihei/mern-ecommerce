import axios from "axios";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditNoteIcon from "@mui/icons-material/EditNote";
const DataProduct = () => {
  const [product, setProduct] = useState([]);
  const [dataProduct, setDataProduct] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    await axios
      .get(`${import.meta.env.VITE_URL}/product`)
      .then((res) => {
        setProduct(res.data);
      })
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
    <div className="container">
      <button
        type="button"
        className="btn btn-primary my-3 "
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        เพิ่มสินค้า
      </button>
      {/* Modal Popup */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                ฟอร์มบันทึกสินค้า
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
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
            </div>
          </div>
        </div>
      </div>
      <Table striped bordered hover className="text-center">
        <thead>
          <tr>
            <th>#</th>
            <th>ชื่อสินค้า</th>
            <th>ราคา</th>
            <th>สต๊อก</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {product
            ? product.map((data, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{data.name}</td>
                  <td>{data.price}</td>
                  <td>{data.stock}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(data._id)}
                      className="btn btn-danger"
                    >
                      <DeleteForeverIcon
                        titleAccess="ลบข้อมูลสินค้า"
                        sx={{ fontSize: 30 }}
                      />
                    </button>
                  </td>
                  <td>
                    <Link
                      to={`/admin/edit/${data._id}`}
                      className="btn btn-primary"
                    >
                      <EditNoteIcon
                        titleAccess="แก้ไขข้อมูลสินค้า"
                        sx={{ fontSize: 30 }}
                      />
                    </Link>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    </div>
  );
};

export default DataProduct;
