const Users = require("../model/userData");
const Product = require("../model/products");
const Cart = require("../model/cart");
const Orders = require("../model/orders");
const { notifyline } = require("../function/notifyLine");
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
    res.send(newCart);
  } catch (error) {
    console.log(error);
    res.status(500).send("เซิร์ฟเวอร์ เกิดข้อผิดพลาด");
  }
};

exports.getUserCart = async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.user.name }).exec();
    let cart = await Cart.findOne({ orderdBy: user._id })
      .populate("products.product", "_id name price")
      .exec();
    const { products, cartTotal } = cart;
    res.json({ products, cartTotal });
  } catch (error) {
    console.log(error);
    res.status(500).send("เกิดข้อผิดพลาดที่เซิฟเวอร์");
  }
};

exports.saveAddress = async (req, res) => {
  try {
    const userAddress = await Users.findOneAndUpdate(
      { email: req.user.name },
      { address: req.body.address }
    ).exec();
    res.json({ message: "บันทึกที่อยู่เรียบร้อย", userAddress });
  } catch (error) {
    console.log(error);
    res.status(500).send("เซิร์ฟเวอร์เกิดข้อผิดพลาด");
  }
};

exports.saveOrders = async (req, res) => {
  try {
    let user = await Users.findOne({ email: req.user.name }).exec();

    let userCart = await Cart.findOne({ orderdBy: user._id });

    let order = await new Orders({
      products: userCart.products,
      orderdBy: user._id,
      cartTotal: userCart.cartTotal,
    }).save();

    const text = `มีออเดอร์ของลูกค้า ${user.email} 
    ยอดชำระ = ${userCart.cartTotal} บาท`;
    await notifyline(process.env.TOKEN_LINE, text);

    let bulkOption = userCart.products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.product._id },
          update: { $inc: { stock: -item.count, sold: +item.count } },
        },
      };
    });

    let update = await Product.bulkWrite(bulkOption, {});

    res.send(update);
  } catch (error) {
    console.log(error);
    res.status(500).send("เซิร์ฟเวอร์เกิดข้อผิดพลาด");
  }
};

exports.removeCart = async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.user.name }).exec();
    const empty = await Cart.findOneAndRemove({ orderdBy: user._id }).exec();
    res.send(empty);
  } catch (error) {
    console.log(error);
    res.status(500).send("เคลียร์ข้อมูล Error");
  }
};

exports.getOrder = async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.user.name }).exec();
    let order = await Orders.find({ orderdBy: user._id })
      .populate("products.product")
      .exec();
    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500).send("สถานะเซิร์ฟเวอร์ผิดปกติ");
  }
};

exports.payment = async (req, res) => {
  try {
    res.json("ชำระเงิน");
  } catch (error) {
    console.log(error);
    res.status(500).send("สถานะเซิร์ฟเวอร์ผิดปกติ");
  }
};
