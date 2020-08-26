const mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
  name: String,
  desc: String,
  price: String,
  imageUrl: String,
  category: String,
  type: String,
  color: String,
  colorPicker: Array,
  sale: {
    type: Boolean,
    default: false
  },
  imageItem: Array,
  date: Date,
});

var Product = mongoose.model("products", productSchema);

module.exports = Product;
