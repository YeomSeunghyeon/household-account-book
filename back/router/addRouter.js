
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
            console.error('Database query error: ', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        if (results.length > 0) {
           res.send(results)
        } else {
            res.status(401).send('Invalid credentials');
        }
    })
})

module.exports=router;