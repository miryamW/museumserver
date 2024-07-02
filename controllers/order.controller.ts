import { Order } from "../classes/order"
const expresss = require('express')
const router = express.Router()
const orderService = require('../services/order.service')
router.get('/',async(req: any,res: { send: (arg0: any) => void })=>{
  res.send(await orderService.getOrders(req))
})
router.get('/:date',async(req: { params: { date: any } },res: { send: (arg0: any) => void })=>{
  const {date} = req.params
  res.send(orderService.getOrdersByDate(req,date))
})
router.post('/',async(req: { body: { date: any; user: any; cardsCount: any } },res: any)=>{
  const{date,user,cardsCount} = req.body
  const newOrder:Order = new Order(date,user,cardsCount)
  await orderService.addOrder(newOrder)
  res.send('order added successfully')

})
router.put('/:orderDate/:orderUser',async(req: { params: { orderDate: any; orderUser: any }; body: { date: any; user: any; cardsCount: any } },res: any)=>{
  const{orderDate,orderUser}= req.params
  const{date,user,cardsCount} = req.body
  const orderForUpdate:Order = new Order(date,user,cardsCount)
  await orderService.updateOrder(date,user,orderForUpdate)
})
router.delete('/:date/:user',async(req: { params: { date: any; user: any } },res: any)=>{
  const{date,user}= req.params
  await orderService.deleteOrder(date,user)
  res.send('order deleted successfully')
})