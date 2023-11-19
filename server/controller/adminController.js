// ติดต่อกับฐานข้อมูล / ดำเนินการกับฐานข้อมูล
const Products = require("../model/products");
exports.product = async (req, res) => {
  try {
    const getAll = await Products.find({}).exec();
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
    const createProduct = await Products(req.body).save();
    res.json(createProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการบันทึกข้อมูล" });
  }
};

exports.editProduct = async (req, res) => {
  try {
    const id = req.params.id;
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
    res.json(deletePd);
  } catch (error) {
    res.status(500).json({ error: "ไม่พบข้อมูลที่ต้องการจะลบ" });
  }
};
