// ติดต่อกับฐานข้อมูล / ดำเนินการกับฐานข้อมูล
const Products = require("../model/products");
exports.product = async (req, res) => {
  try {
    const getAll = await Products.find({}).exec();
    res.json(getAll);
  } catch (error) {
    res.status(404).json({ message: "ไม่พบข้อมูลสินค้าทั้งหมด", error: error });
  }
};
exports.singleProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const getSingle = await Products.findOne({ _id: id }).exec();
    res.json(getSingle);
  } catch (error) {
    res.status(404).send({ message: "ไม่พบข้อมูลสินค้าตัวนี้", error: error });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const createProduct = await Products(req.body).save();
    res.json(createProduct);
  } catch (error) {
    console.log(error);
  }
};

exports.editProduct = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
  res.json({ id: 1, name: "รองเท้า", price: 5000, stock: 20 });
};
exports.deleteProduct = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
};
