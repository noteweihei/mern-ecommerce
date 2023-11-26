const Users = require("../model/userData");
const jwt = require("jsonwebtoken");
const expressJWT = require("express-jwt");
//สมัคร username && password เพื่อเข้าใช้งาน
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    let users = await Users.findOne({ email });

    // ตรวจสอบข้อมูลในระบบก่อน
    if (users) {
      return res.send("คุณมีข้อมูลอยู่แล้ว").status(400);
    } else {
      users = new Users({
        email,
        password,
      });
      await users.save();
      res.send("ลงทะเบียนสำเร็จ");
    }
  } catch (error) {
    res.send("เกิดข้อผิดพลาดไม่สามารถลงทะเบียนได้").status(400);
  }
};

//เข้าสู่ระบบ username && password
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let users = await Users.findOneAndUpdate({ email }, { new: true });
    if (users.email === email && users.password === password) {
      // const token = jwt.sign({ email, role }, process.env.JWT_SECRET, {
      //   expiresIn: "1h",
      // });
      // return res.json({ token, email });
      var payload = {
        user: {
          name: users.email,
          role: users.role,
        },
      };
      // 3. Generate
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
        (err, token) => {
          if (err) throw err;
          res.json({ token, payload });
        }
      );
    } else {
      return res.send("ชื่อผู้ใช้และรหัสผ่านไม่ถูกต้อง");
    }
  } catch (error) {
    res.status(400).send("เซิร์ฟเวอร์เกิดข้อผิดพลาด");
  }
};

// เช็ค Token กับ ยูสเซอร์ มีการล็อคอินหรือไม่
exports.currentUser = async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.user.name })
      .select("-password")
      .exec();
    return res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("เซิร์ฟเวอร์ เกิดข้อผิดพลาด");
  }
};

//ตรวจสอบ token
exports.requireLogin = expressJWT({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});
