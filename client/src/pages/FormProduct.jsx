import "./FormProduct.scss";
import axios from "axios";
const FormProduct = () => {
  return (
    <div className="container">
      <form>
        <div className="form-group">
          <label>ชื่อสินค้า</label>
          <input type="text" placeholder="ระบุชื่อสินค้า" />
        </div>
        <div className="form-group">
          <label>รายละเอียดสินค้า</label>
          <textarea
            name=""
            id=""
            rows={5}
            placeholder="ระบุรายละเอียดสินค้า"
          ></textarea>
        </div>
        <div className="form-group">
          <label>ราคา</label>
          <input type="number" placeholder="ระบุราคา" />
        </div>
        <div className="form-group">
          <label>สต๊อกสินค้า</label>
          <input type="number" placeholder="ระบุสต๊อกสินค้า" />
        </div>
        <button type="submit">บันทึกข้อมูล</button>
      </form>
    </div>
  );
};

export default FormProduct;
