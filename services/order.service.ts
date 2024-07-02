const user_service = require('./user.service')
const { orderModel } = require('../models/order')
import { Order } from "../classes/order"
const getOrders = (req: any) => {
  if (user_service.isManager(req))
    return orderModel.find()
  return null
}
const getOrdersByDate = async (req: any, date: Date) => {
  return await orderModel.find({ date: new Date(date.getFullYear(), date.getMonth(), date.getDay()) })
}
const addOrder = async (order: Order) => {
  const newOrder = new orderModel({
    date: order.date,
    user: order.user,
    cardsCount: order.cardsCount,
    hour:order.date.getHours()
  })
  await newOrder.save()
}
const updateOrder =async(orderDate:Date,orderUser:User,order:Order)=>{
  await orderModel.updateOne({ user:orderUser, date:new Date(orderDate.getFullYear(), orderDate.getMonth(), orderDate.getDay())},{ 
    date: order.date,
    user: order.user,
    cardsCount: order.cardsCount,
    hour:order.date.getHours()
  })
}
const deleteOrder =async(orderDate:Date,orderUser:User)=>{
  await orderModel.deleteOne({ user:orderUser, date:new Date(orderDate.getFullYear(), orderDate.getMonth(), orderDate.getDay())} )
}
module.exports = {
  getOrders,
  getOrdersByDate,
  addOrder,
  updateOrder,
  deleteOrder
}