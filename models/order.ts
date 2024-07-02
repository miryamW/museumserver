const { Double } = require('mongodb');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  date:Date,
  user:User,
  cardsCount: Number,
  hour:Number
});
export{}
const orderModel = mongoose.model("users", orderSchema);
module.exports = { orderModel };