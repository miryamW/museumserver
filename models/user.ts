const { Double } = require('mongodb');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:String,
    name:String,
    password:String,
    credits:Number,
});
export{}
const userModel = mongoose.model("users", userSchema);
module.exports = {userModel};