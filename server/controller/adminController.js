// ติดต่อกับฐานข้อมูล / ดำเนินการกับฐานข้อมูล
const Products = require("../model/products");
const Users = require("../model/userData");
const Orders = require("../model/orders");
const fs = require("fs");

exports.product = async (req, res) => {
  try {
    const getAll = await Products.find({}).exec();
    res.json(getAll);
  } catch (error) {
    res.status(500).json({ error: "ไม่พบข้อมูลสินค้าทั้งหมด" });
  }
};

exports.productby = async (req, res) => {
  try {
    const { limit, sort, order } = req.body;

    const getAll = await Products.find({})
      .limit(limit)
      .sort([[sort, order]])
      .exec();
    res.json(getAll);
  } catch (error) {
    res.status(500).json({ error: "ไม่พบข้อมูลสินค้าทั้งหมด" });
  }
};

exports.productbest = async (req, res) => {
  try {
    const { limit, sort, order } = req.body;

    const getAll = await Products.find({})
      .limit(limit)
      .sort([[sort, order]])
      .exec();
    res.json(getAll);
  } catch (error) {
    res.status(500).json({ error: "ไม่พบข้อมูลสินค้าทั้งหมด" });
  }
};

exports.singleProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const getSingle = await Products.findOne({ _id: id }).exec();
    res.json(getSingle);
  } catch (error) {
    res.status(500).json({ error: "ไม่พบข้อมูลสินค้าตัวนี้" });
  }
};

exports.addProduct = async (req, res) => {
  try {
    let data = req.body;
    if (req.file) {
      data.file = req.file.filename;
    }
    const createProduct = await Products(data).save();
    res.json(createProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการบันทึกข้อมูล" });
  }
};

exports.editProduct = async (req, res) => {
  try {
    const id = req.params.id;
    let newData = req.body;
    if (typeof req.file !== "undefined") {
      newData.file = req.file.filename;
      await fs.unlink("./uploads/" + newData.oldImg, (err) => console.log(err));
    }
    const update = await Products.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    }).exec();
    res.json(update);
  } catch (error) {
    res.status(500).json({ error: "ไม่สามารถอัพเดทข้อมูลได้" });
  }
};
exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const deletePd = await Products.findOneAndDelete({ _id: id }).exec();
    if (deletePd?.file) {
      await fs.unlink("./uploads/" + deletePd.file, (err) => console.log(err));
    }

    res.json(deletePd);
  } catch (error) {
    res.status(500).json({ error: "ไม่พบข้อมูลที่ต้องการจะลบ" });
  }
};

exports.getOrderUser = async (req, res) => {
  try {
    let order = await Orders.find({})
      .populate("products.product orderdBy")
      .exec();
    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500).send("สถานะเซิร์ฟเวอร์ผิดปกติ");
  }
};

exports.changeStatus = async (req, res) => {
  try {
    const { orderID, orderstatus } = req.body;
    let updateOrder = await Orders.findByIdAndUpdate(
      orderID,
      { orderstatus },
      { new: true }
    );
    res.send(updateOrder);
  } catch (error) {
    console.log(error);
    res.status(500).send("สถานะเซิร์ฟเวอร์ผิดปกติ");
  }
};
