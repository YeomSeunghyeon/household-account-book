"use client";
import { useEffect, useState } from "react";
import "./statistics.css";
import axios from "axios"
export default function statistics(){
    const [data,setData]=useState([]);
    const [category,setCategory]=useState([]);
    const [priceCount,setPriceCount]=useState([]);
    const [count,setCount]=useState([]);
    useEffect(()=>{
        fetchData();
        categoryData();
       },[])
        const fetchData=async()=>{
         try{
            const response=await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/record/all`);
            const groupeData=groupByPrice(response.data);
            const groupeCount=groupByCount(response.data);
            setData(response.data);
            setPriceCount(groupeData);
            setCount(groupeCount);
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
           }catch(error){
             if (error.response.status === 500) {
                 alert(error.response.data.message);
             } else if (error.response.status === 401 || error.response.status === 403) {
                 alert(error.response.data.message);
             }
           }
          };
          const groupByPrice = (data) => {
            const groupedprice = data.reduce((acc, item) => {
                if (!acc[item.num]) {
                    acc[item.num] = { num:item.num, price: 0 };
                }
                acc[item.num].price += item.price;
                return acc;
            }, {});
            return Object.values(groupedprice);
        };
        const groupByCount=(data)=>{
            const groupedcount=data.reduce((acc,item)=>{
                if(!acc[item.num]){
                    acc[item.num]={num:item.num,counts:0};

                }
                acc[item.num].counts +=1;
                return acc;
            },{});
            return Object.values(groupedcount);
        };
        const categoryName=(num)=>{
            const matchCategory=category.find((cate)=>cate.num===num);
            return matchCategory?matchCategory.name:"없음"
        }
    return(
        <div className="StatisticsAll">
            <div className="StatisticsText">통계</div>
            <div>{priceCount&&priceCount.map((it)=>{
                return(
                    <div key={it.num}>
                    <div>{categoryName(it.num)}

                    </div>
                    <div>{it.price}</div>
                    </div>
                )
            })}</div>
            <div>{count&&count.map((it)=>{
                return(
                    <div key={it.num}>
                        <div>{categoryName(it.num)}</div>
                        <div>{it.counts}</div>
                        </div>
                )
            })}
            </div>
        </div>
    )
}