import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
// element mui
import FormControl from "@mui/material/FormControl";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, MenuItem, Select } from "@mui/material";
// pdf
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoiceAdmin from "../../order/InvoiceAdmin";

const OrdersAdmin = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [orders, setOrders] = useState([]);
  const format = (value) => value.toLocaleString("en-US");
  const orderStatus = ["รอดำเนินการ", "ยกเลิก", "เสร็จสิ้น"];

  const handleChangeStatus = async (orderID, orderstatus) => {
    await axios
      .put(
        `${import.meta.env.VITE_URL}/change/orderstatus`,
        { orderID, orderstatus },
        {
          headers: {
            Authorization: user.user.token,
          },
        }
      )
      .then((res) => {
        toast.success(`อัพเดทสถานะ เป็น ${res.data.orderstatus}`, {
          autoClose: 500,
          theme: "colored",
        });
        setTimeout(() => {
          window.location.reload();
        }, 500);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchData = async () => {
    await axios
      .post(
        `${import.meta.env.VITE_URL}/orderuser`,
        {},
        {
          headers: {
            Authorization: user.user.token,
          },
        }
      )
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="container mx-auto">
        <h1>จัดการออเดอร์</h1>
        {orders.map((item, index) => {
          return (
            <Accordion key={index}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id={`panel${index + 1}a-header`}
                key={index}
              >
                <Typography>
                  <span style={{ color: "blueviolet" }}># {index + 1}</span> |
                  ID : {item._id} | วันที่{" "}
                  {new Date(item.createdAt).toLocaleString()} |{" "}
                  <span
                    style={
                      item.orderstatus !== "เสร็จสิ้น"
                        ? { color: "red" }
                        : { color: "green" }
                    }
                  >
                    {item.orderstatus}
                  </span>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="d-flex justify-content-between align-items-center">
                  <Typography>
                    OrderBy :{" "}
                    <span style={{ color: "blue" }}>{item.orderdBy.email}</span>
                  </Typography>
                  {/* อัพเดทสถานะ */}
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <Select
                      defaultValue={item.orderstatus}
                      style={{ width: "150px", alignSelf: "center" }}
                      onChange={(e) =>
                        handleChangeStatus(item._id, e.target.value)
                      }
                    >
                      {orderStatus.map((item, index) => (
                        <MenuItem value={item} key={index}>
                          <span
                            style={
                              item === "เสร็จสิ้น"
                                ? { color: "green" }
                                : { color: "red" }
                            }
                          >
                            {item}
                          </span>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {/* อัพเดทสถานะ */}
                </div>
                <hr />
                {item.products.map((item, index) => {
                  return (
                    <Typography key={index}>
                      รายการสินค้า : {item.product.name.substring(0, 20)} | ราคา
                      : {format(item.price)} บาท | จำนวน : {item.count} ชิ้น |
                      รวม : {format(item.price * item.count)} บาท
                    </Typography>
                  );
                })}
                <Typography>
                  ยอดสุทธิ :{" "}
                  <span style={{ color: "blue" }}>
                    {format(item.cartTotal)}
                  </span>{" "}
                  บาท
                </Typography>
                <hr />
                <Typography>
                  ที่อยู่ :{" "}
                  <span style={{ color: "green" }}>
                    {item.orderdBy.address}
                  </span>
                </Typography>
                <hr />
                <PDFDownloadLink
                  document={<InvoiceAdmin order={item} />}
                  fileName={`${item._id}(#${index + 1}).pdf`}
                >
                  <Button variant="contained" color="secondary">
                    Print Order
                  </Button>
                </PDFDownloadLink>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </div>
    </>
  );
};

export default OrdersAdmin;
