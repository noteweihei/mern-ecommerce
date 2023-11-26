const jwt = require("jsonwebtoken");
const User = require("../model/userData");

exports.auth = async (req, res, next) => {
  try {
    //code
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(401).send("No token");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;

    next();
  } catch (err) {
    // err
    console.log(err);
    res.send("Token Invalid").status(500);
  }
};

exports.adminCheck = async (req, res) => {
  try {
    const userAdmin = await User.findOne({ email: req.user.name })
      .select("-password")
      .exec();
    if (userAdmin.role !== "admin") {
      res.status(403).send("คุณไม่มีสิทธิ์ในการเข้าถึงข้อมูล");
    }
  } catch (error) {
    console.log(error);
    res.status(403).send("คุณไม่มีสิทธิ์ในการเข้าถึงข้อมูล");
  }
};
