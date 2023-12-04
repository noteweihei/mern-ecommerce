import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Invoice from "../../order/Invoice";

const HistoryOrder = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [orders, setOrders] = useState([]);
  const format = (value) => value.toLocaleString("en-US");
  console.log(orders);
  const fetchData = async (token) => {
    await axios
      .get(`${import.meta.env.VITE_URL}/user/order`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchData(user.user.token);
  }, []);

  return (
    <div className="container-fluid" style={{ marginTop: "5rem" }}>
      <h1>ประวัติการสั่งซื้อสินค้า</h1>
      <div className="row">
        <div className="col-md-6">
          {orders.map((item, index) => (
            <div className="card m-3 p-3" key={index}>
              <p>
                #ID : <span className="text-primary">{item._id}</span>
              </p>
              <p>วันที่ {new Date(item.createdAt).toLocaleString()}</p>
              <p>
                สถานะ :{" "}
                <span
                  className={
                    item.orderstatus !== "เสร็จสิ้น"
                      ? "text-danger"
                      : "text-success"
                  }
                >
                  {item.orderstatus}
                </span>
                &nbsp; ยอดสั่งซื้อ :{" "}
                <span className="text-danger">{format(item.cartTotal)} ฿</span>
              </p>
              <div>
                {item.products.map((list, index) => (
                  <div key={index}>
                    <p>
                      ชื่อสินค้า : {list.product.name}
                      <br />
                      จำนวน {list.count} ชิ้น | ราคา {format(list.price)} บาท
                    </p>
                  </div>
                ))}
              </div>
              {/* PDF */}
              <div className="row">
                <div className="col">
                  <PDFDownloadLink
                    document={<Invoice order={item} />}
                    fileName={`ใบสั่งซื้อสินค้า_${item._id}.pdf`}
                    className="btn btn-outline-danger"
                  >
                    {" "}
                    ดาวน์โหลด
                  </PDFDownloadLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryOrder;
