exports.product = (req, res) => {};

exports.addProduct = (req, res) => {
  res.json({ id: 1, name: "กระเป๋า", price: 10500, stock: 50 });
};

exports.editProduct = (req, res) => {
  res.json({ id: 1, name: "รองเท้า", price: 5000, stock: 20 });
};
exports.deleteProduct = (req, res) => {
  res.send("delete OK ID:....");
};
