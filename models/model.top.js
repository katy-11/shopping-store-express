const mongoose = require("mongoose");

var topSchema = new mongoose.Schema({
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
  date: String,
});

var Top = mongoose.model("tops", topSchema);

module.exports = Top;
