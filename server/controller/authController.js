const Users = require("../model/userData");
const jwt = require("jsonwebtoken");

//สมัคร username && password เพื่อเข้าใช้งาน
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    let users = await Users.findOne({ email });

    // ตรวจสอบข้อมูลในระบบก่อน
    if (users) {
      return res
        .status(400)
        .json({ message: "คุณมีข้อมูลอยู่แล้ว", email: users.email });
    } else {
      users = new Users({
        email,
        password,
      });
      await users.save();
      res.json({ message: "ลงทะเบียนสำเร็จ" });
    }
  } catch (error) {
    res.status(400).json({ error: "เกิดข้อผิดพลาดไม่สามารถลงทะเบียนได้" });
  }
};

//เข้าสู่ระบบ username && password
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let users = await Users.findOneAndUpdate({ password }, { new: true });
    if (users.password === password) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      return res.json({ token, email });
    }
  } catch (error) {
    res.status(400).json({ error: "รหัสผ่านไม่ถูกต้อง" });
  }
};
