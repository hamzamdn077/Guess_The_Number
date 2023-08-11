import express from 'express';
import bodyParser from 'body-parser';
const app=express()
interface body  {
enteredNumber : number,
}
interface response{
    msg :'enter a number !'| 'good job !' |'higher !' |'lower !' |'game over !',
    choicesLeft :  number,
    isOver :boolean
}
//to make sure that im passing all the args
const getResponse=(data : response):response=>{
    return data
}
let x:number;
let choices :number = 6
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.set('view engine','ejs')
app.get('/',(req,res,next)=>{
    x = (Math.floor(Math.random()*20)+1)
    choices=6
    res.render('home',{choicesLeft:choices , msg :null,isOver : false})
    
})
app.post('/',(req,res,next)=>{
    if(isNaN(req.body.enteredNumber)) return res.render('home',getResponse({msg:'enter a number !',choicesLeft:choices,isOver:choices<=0}))
    const body :body =req.body;
    choices--; 
    if(choices==0) return res.render('home',getResponse({msg:'game over !',choicesLeft:choices,isOver:choices<=0}))
    if(body.enteredNumber>x)
    res.render('home',getResponse({msg:'lower !',choicesLeft:choices,isOver:choices<=0}))
    else if(body.enteredNumber<x)
    res.render('home',getResponse({msg:'higher !',choicesLeft:choices,isOver:choices<=0}))
    else{
        choices = 6
        res.render('home',getResponse({msg:'good job !',choicesLeft:choices,isOver:true})) 
    }
})      

app.listen(3000,()=>{
    console.log('listening')
})