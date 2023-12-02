const Users = require("../model/userData");
const Product = require("../model/products");
const Cart = require("../model/cart");
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

exports.changeStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    const user = await Users.findOneAndUpdate(
      { _id: id },
      { status: status },
      { new: true }
    ).exec();
    return res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("เซิร์ฟเวอร์ เกิดข้อผิดพลาด");
  }
};

exports.userCart = async (req, res) => {
  try {
    const cart = req.body;
    let user = await Users.findOne({ email: req.user.name }).exec();
    let products = [];
    let cartOld = await Cart.findOne({ orderdBy: user._id }).exec();
    if (cartOld) {
      cartOld.deleteOne();
    }

    for (let i = 0; i < cart.length; i++) {
      let object = {};
      object.product = cart[i]._id;
      object.count = cart[i].count;
      object.price = cart[i].price;

      products.push(object);
    }

    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
      cartTotal = cartTotal + products[i].price * products[i].count;
    }

    let newCart = await new Cart({
      products,
      cartTotal,
      orderdBy: user._id,
    }).save();

    console.log(newCart);
    res.send("ok");
  } catch (error) {
    console.log(error);
    res.status(500).send("เซิร์ฟเวอร์ เกิดข้อผิดพลาด");
  }
};
