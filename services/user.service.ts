const {userModel} = require('../models/user')
const signin = async (name: any, password: string) => {
    const encodedPassword = btoa(password)
    const currentUser = await userModel.findOne({ name, password: encodedPassword })
    if (currentUser == null) return null
    return jwt.sign({ id:currentUser._id, userName: currentUser.name }, process.env.SECRET_KEY)
  }
  
  const signup = async (req: any, user: User) => {
    const similarUser = await userModel.findOne({ name: user.name, password: user.password }).select({ _id: 0 }).exec()
    if (similarUser != null) return false
    if (await isManager(req) === false)user.type = 'User'
    const newUser = new userModel({
        name: user.name,
        password: user.password,
        email: user.email,
        type:user.type,
        credits: user.credits,
    })
    await newUser.save()
    return true
  }
  
  const isManager = async (req: { header: (arg0: string) => any }) => {
    let token = req.header('Authorization')
    if (!token) return false
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length).trimLeft()
    }
    const verified = jwt.verify(token, process.env.SECRET_KEY)
    const type = await findUserType(verified.id, verified.userName)
    if (type == 'Manager') return true
     return false
  }

  const findUserType = async (id: any, name: any) => {
    const user = await userModel.findOne({_id:id,name }).exec()
    return user.type
  }

  const getUserCredit = async(name:string,password:string)=>{
    const currentUser = await userModel.findOne({ name, password }).exec()
    return currentUser.credits
  }

  const updateUserCredit = async(name:string,password:string,newCredits:number)=>{
    await userModel.updateOne({ name, password},{credits:newCredits })
    const updatedUser =  await userModel.findOne({ name, password }).exec()
    return updatedUser.credits === newCredits
  }

  const getUsers = async(req:{ header: (arg0: string) => any })=>{
        if(!await isManager(req))return false
        return userModel.find();
  }
  export {};
  
  module.exports = {
    signin,
    signup,
    isManager,
    findUserType,
    getUserCredit,
    getUsers,
    updateUserCredit
  }