import React from "react";

const CheckOut = () => {
  return (
    <div className="container-fluid" style={{ marginTop: "5rem" }}>
      <div className="row">
        <div className="col-md-6">
          <h4>ที่อยู่จัดส่งสินค้า</h4>
          <textarea name="address" cols="50" rows="10"></textarea>
        </div>
        <div className="col-md-6">
          <h4>ออเดอร์สินค้า</h4>
          <hr />
          <p>สินค้า</p>
          <hr />
          <p>รายการสินค้า</p>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
