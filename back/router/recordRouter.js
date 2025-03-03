const express=require('express');
const db = require('../lib/db');
var router=express.Router();

router.get("/all",(req,res)=>{
    db.query("select*from content",(err,results)=>{
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
router.post("/delete",(req,res)=>{
    const id=req.body.id;
    db.query("Delete from content where id=?",[id],(err,results)=>{
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