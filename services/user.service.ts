const {userModel} = require('../models/user')
const signup = async(user:User)=>{
    const existingUser = userModel.findOne({email:user.email,password:user.password})
    if(existingUser)
        return false
    const newUser = new userModel({
        name: user.name,
        password: user.password,
        email: user.email,
        credits: user.credits
    })
    await newUser.save()
    return true
}
const signin = (email:string,password:string) =>{
    const currentUser = userModel.findOne({email:email,password:password})
    
}