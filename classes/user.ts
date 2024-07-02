class User{
    email:string
    name:string
    password:string
    credits:number
    type:string
    constructor(email:string,name:string,password:string,type:string){
        this.email =email
        this.name = name
        this.password = password
        this.credits = 0
        this.type  = type
    }
}
module.exports = {User}