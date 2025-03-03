"use client";
import { useEffect, useState } from "react";
import "./record.css";
import axios from "axios"
import { useRouter } from "next/navigation";
export default function record(){
    const [data,setData]=useState([]);
    const [category,setCategory]=useState([]);
       const router=useRouter();
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
       const categoryName=(num)=>{
         const matchCategory=category.find((cate)=>cate.num===num);
         return matchCategory ? matchCategory.name : "없음";
       };
       const handelDelete = async (id) => {
        try {
          const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/record/delete`, {
            id:id
          });
      
          if (response.status === 200) {
            alert("성공");
           window.location.reload();
          } else {
            throw new Error("서버 응답 실패");
          }
        } catch (error) {
          alert("실패: " + error.message);
          router.push("/"); // 실패 시 "/" 페이지로 이동
        }
      };
      
    return(
        <div className="RecordAll">
        <div className="RecordText">기록</div>
        {data&&data.map((it)=>{
            return(
            <div className="RecordItemAll"><div key={it.id} className="RecordItem">
                <div className="RecordItemTitle">주제:{it.title}</div>
                <div className="RecordItemPrice">소비액:{it.price}</div>
                <div className="RecordItemCategory">카테고리:{categoryName(it.num)  }</div>
                <div className="RecordItemDetail">내용:{it.detail}</div>
                <div className="RecordItemDate">날짜:{it.date}</div>
                
            </div>
            <button className="RecordDeleteButton" onClick={()=>handelDelete(it.id)}>삭제</button></div>)
        })}
        </div>
    )
}