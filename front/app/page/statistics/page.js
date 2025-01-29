"use client";
import { useEffect, useState } from "react";
import "./statistics.css";
import axios from "axios"
export default function statistics(){
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
        <div className="StatisticsAll">
            <div className="StatisticsText">통계</div>
        </div>
    )
}