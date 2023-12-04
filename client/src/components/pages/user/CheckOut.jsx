import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearCart } from "../../../service/auth";
import { useNavigate } from "react-router-dom";

const CheckOut = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSave, setAddressSave] = useState(false);
  const navigate = useNavigate();
  const format = (value) => value.toLocaleString("en-US");

  const handleSave = async () => {
    await axios
      .post(
        `${import.meta.env.VITE_URL}/user/address`,
        { address },
        {
          headers: {
            Authorization: user.user.token,
          },
        }
      )
      .then((res) => {
        if (res.data.message) {
          toast.success(res.data.message, {
            autoClose: 1000,
            theme: "colored",
          });
          setAddressSave(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSaveOrders = async () => {
    await axios
      .post(
        `${import.meta.env.VITE_URL}/user/orders`,
        {},
        {
          headers: {
            Authorization: user.user.token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        clearCart(user.user.token);
        dispatch({
          type: "ADD_TO_CART",
          payload: [],
        });
        if (typeof window !== "undefined") {
          localStorage.removeItem("cart");
        }
        toast.success("ชำระเงินสำเร็จ", {
          autoClose: 1000,
          theme: "colored",
        });
        navigate("/user/history");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_URL}/usercart`, {
        headers: {
          Authorization: user.user.token,
        },
      })
      .then((res) => {
        setProducts(res.data.products);
        setTotal(res.data.cartTotal);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container-fluid" style={{ marginTop: "5rem" }}>
      <div className="row">
        <div className="col-md-6">
          <h4>ที่อยู่จัดส่งสินค้า</h4>
          <span className="text-danger">
            ( **ชื่อ นามสกุล เบอร์โทร ที่อยู่ และรหัสไปรษณีย์** )
          </span>
          <textarea
            name="address"
            cols="50"
            rows="10"
            placeholder=" ชื่อ นามสกุล เบอร์โทร ที่อยู่ และรหัสไปรษณีย์"
            onChange={(e) => setAddress(e.target.value)}
            required
          ></textarea>
          <div className="my-3">
            <button className="btn btn-success" onClick={handleSave}>
              บันทึกที่อยู่
            </button>
          </div>
        </div>
        <div className="col-md-6">
          <h4>ออเดอร์สินค้า</h4>
          <hr />
          <p>สินค้า ทั้งหมด {products.length} รายการ</p>
          <hr />
          <p>รายการสินค้า</p>
          {products.map((item, i) => (
            <div key={i}>
              <span>#รหัสสินค้า : {item.product._id}</span>
              <p>
                ชื่อสินค้า : {item.product.name.substring(0, 13)} | จำนวน :{" "}
                {item.count} ชิ้น | ราคารวม : {format(item.price * item.count)}{" "}
                บาท
              </p>
              <hr />
            </div>
          ))}
          <div className="d-flex justify-content-end align-items-center">
            <h4 className="text-primary">
              สรุปยอดชำระเงิน : {format(total)} บาท
            </h4>
            &nbsp; &nbsp;
            <button
              className="btn btn-warning"
              disabled={!addressSave || !products.length}
              onClick={handleSaveOrders}
            >
              ชำระเงิน
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
