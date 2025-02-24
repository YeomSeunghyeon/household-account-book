
const express=require('express');
const db = require('../lib/db');
var router=express.Router();

router.post("/new",(req,res)=>{
    const title=req.body.title;
    const price=req.body.price;
    const num=req.body.num;
    const detail=req.body.detail;
    const date=req.body.date;
    db.query("insert into content(title,price,num,detail,date) values (?,?,?,?,?)",[title,price,num,detail,date],
        (err,results)=>{
            if(err){
                res.status(500).send('Internal Server Error');
                return;
            }
            else if(results){
                res.status(200).send('success');
            }else {
                res.status(401).send('Invalid credentials');
            }
    })
})

module.exports=router;