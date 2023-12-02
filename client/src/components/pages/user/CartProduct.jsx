import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const CartProduct = ({ item }) => {
  const [quantity, setQuantity] = useState(item.count);
  const format = (value) => value.toLocaleString("en-US");
  const dispatch = useDispatch();
  useEffect(() => {
    let cart = [];
    const count = quantity;
    if (count > 5) {
      toast.error("ไม่สามารถเพิ่มสินค้าเกินจำนวน 5 ชิ้นได้");
      return;
    }

    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart
      .filter((product) => product.count)
      .map((product) => {
        if (product._id == item._id) {
          product.count = count;
        }
      });
    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({
      type: "ADD_TO_CART",
      payload: cart,
    });
  }, [quantity]);

  const removeItem = () => {
    let cart = [];
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.map((product, i) => {
      if (product._id == item._id) {
        cart.splice(i, 1);
      }
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({
      type: "ADD_TO_CART",
      payload: cart,
    });
  };

  return (
    <>
      <div className="cart">
        <div className="detail">
          <img
            src={`${import.meta.env.VITE_LINK_IMG}/${item.file}`}
            alt={item.name.substring(0, 20)}
          />
          <div className="title">
            <h5>{item.name.substring(0, 20)}</h5>
            <p>ราคา {format(item.price)} บาท</p>
          </div>
        </div>
        <div className="count">
          <span
            onClick={() => setQuantity(quantity > 1 ? quantity - 1 : quantity)}
          >
            -
          </span>
          <input
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            style={{ textAlign: "center" }}
            disabled
          />
          <span
            onClick={() => setQuantity(quantity < 1 ? quantity : quantity + 1)}
          >
            +
          </span>
        </div>
        <div>
          <Button
            variant="contained"
            color="error"
            title="ลบสินค้า"
            onClick={removeItem}
          >
            <DeleteForeverIcon />
          </Button>
        </div>
      </div>
    </>
  );
};

export default CartProduct;
