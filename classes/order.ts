class Order{
  date:Date
  user:User
  cardsCount: number
  constructor(date:Date,user:User,cardsCount:number){
    this.date = date
    this.user = user
    this.cardsCount = cardsCount
  }
}