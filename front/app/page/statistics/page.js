"use client";
import { useEffect, useState } from "react";
import "./statistics.css";
import axios from "axios"
import { PieChart, Pie, Tooltip, Cell } from "recharts"; 
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
         const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28BE0", "#FF6384", "#36A2EB"];

    return(
        <div className="StatisticsAll">
            <div className="StatisticsText">통계</div>
            <div className="StatisticsContainer">
              <div>
            <div className="StatisticsText1">가격합</div>
             <PieChart width={500} height={500}>
        <Pie
          data={priceCount}
          dataKey="price"
          nameKey="num"
          cx="40%"
          cy="40%"
          outerRadius={150}
          fill="#8884d8"
          label={({ num }) => categoryName(num)} 
        >
          {priceCount.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} /> 
          ))}
        </Pie>
        <Tooltip content={({payload})=>{
            if (!payload || payload.length === 0) return null;
             const data = payload[0].payload; 
             const price = data.price ? data.price.toLocaleString() : "데이터 없음";
             return(
              <div style={{ backgroundColor: "white", padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
              > <p>{data.price.toLocaleString()}원</p> </div>
             )
        }}/>
        </PieChart>
        </div>
        <div>
        <div className="StatisticsText1">개수</div>
        <PieChart width={500} height={500}>
        <Pie
          data={count}
          dataKey="counts"
          nameKey="num"
          cx="40%"
          cy="40%"
          outerRadius={150}
          fill="#8884d8"
          label={({ num }) => categoryName(num)} 
        >
          {count.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} /> 
          ))}
        </Pie>
        <Tooltip content={({payload})=>{
          if(!payload || payload.length===0)return null;
          const data=payload[0].payload;
          const count=data.counts ? data.counts : "데이터 없음";
          return(
            <div style={{ backgroundColor: "white", padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}>
              <p>{count}개</p>
            </div>
          )
        }}/>
      </PieChart>
            </div>
            </div>
            </div>
    )
}