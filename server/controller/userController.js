const Users = require("../model/userData");
const jwt = require("jsonwebtoken");
// ดึงข้อมูล user
exports.list = async (req, res) => {
  try {
    const user = await Users.find({}).exec();
    return res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("เซิร์ฟเวอร์ เกิดข้อผิดพลาด");
  }
};
exports.changeRole = async (req, res) => {
  try {
    const { id, role } = req.body;
    const user = await Users.findOneAndUpdate(
      { _id: id },
      { role: role },
      { new: true }
    ).exec();
    return res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("เซิร์ฟเวอร์ เกิดข้อผิดพลาด");
  }
};
