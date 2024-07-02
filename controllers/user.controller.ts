const express = require('express')
const router = express.Router()
const { User } = require('../classes/user')
const userService = require('../services/user.service')

router.post('/signin', async (req: { body: { name: any; password: any } }, res: { sendStatus: (arg0: number) => void; send: (arg0: { token: any }) => void }) => {
  const { name, password } = req.body
  const token = await userService.login(name, password)
  if (!token) res.sendStatus(400)
  else res.send({ token })
})

router.post('/signup', async (req: { body: { id: any; name: any; password: any; email: any; type: any } }, res: { send: (arg0: string) => void; status: (arg0: number) => void }) => {
  const { id, name, password, email, type } = req.body
  if (await userService.signup(req, new User(id, name, btoa(password), email, type))) res.send('your user was saved')
  res.status(409)
})

router.get('/credits/:name/:password',async(req: { params: { name: string; password: string } }, res: { sendStatus: (arg0: number) => void; send: (arg0: { token: any }) => void }) => {
  const {name,password} = req.params
  res.send(await userService.getUserCredit(name,password));
})

router.put('/credits/:name/:password',async(req: { params: { name: string; password: string } ,body:{credits:number}}, res: { sendStatus: (arg0: number) => void; send:(s:string)=>void}) => {
  const {name,password} = req.params
  const {credits} = req.body
  if(await userService.updateUserCredit(name,password,credits))
    res.send('credits was updated succesfully')
  res.sendStatus(404)
})

router.get('/',async(req: any,res: { send: (arg0: any) => void })=>{
  res.send(await userService.getUsers())
})

export {};

module.exports = router