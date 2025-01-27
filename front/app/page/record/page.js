"use client";
import { useEffect, useState } from "react";
import "./record.css";
import axios from "axios"
export default function record(){
    const [data,setData]=useState([]);
    const [category,setCategory]=useState([]);
    useEffect(()=>{
     fetchData();
     categoryData();
    },[])
     const fetchData=async()=>{
      try{
         const response=await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/record/all`);
         setData(response.data);
      }catch(error){
        if (error.response.status === 500) {
            alert(error.response.data.message);
        } else if (error.response.status === 401 || error.response.status === 403) {
            alert(error.response.data.message);
        }
      }
     };
     const categoryData=async()=>{
        try{
           const response=await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/category/all`);
           setCategory(response.data);
           console.log(response.data);
        }catch(error){
          if (error.response.status === 500) {
              alert(error.response.data.message);
          } else if (error.response.status === 401 || error.response.status === 403) {
              alert(error.response.data.message);
          }
        }
       };
    return(
        <div className="RecordAll">
        <div className="RecordText">기록</div>
        {data&&data.map((it)=>{
            return(<div key={it.id}>
                <div>{it.title}</div>
                <div>{it.price}</div>
                <div>{it.num}</div>
                <div>{it.detail}</div>
                <div>{it.date}</div>
            </div>)
        })}
        </div>
    )
}