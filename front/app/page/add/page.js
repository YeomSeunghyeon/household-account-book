"use client";
import { useEffect, useState } from "react";
import "./add.css";
import axios from "axios";
import Select from "react-select";
import { useRouter } from "next/navigation";

export default function add(){
    const [title,setTitle]=useState("");
    const [price,setPrice]=useState("");
    const [num,setNum]=useState("");
    const [detail,setDetail]=useState("");
    const [date,setDate]=useState("");
    const [category,setCategory]=useState([]);
    const router=useRouter();

    useEffect(() => {
        const interval = setInterval(() => {
          setDate(new Date().toLocaleString()); // 현재 시간 갱신
        }, 1000); // 1초마다 업데이트
    
        return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 정리
      }, []);

      useEffect(()=>{

       categoryData();
      },[])
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


  
       
       const handleSubmit = async () => {
        try {
          const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/add/new`, {
            title,
            price,
            num: num?.num,
            detail,
            date,
          });
      
          if (response.status === 200) {
            alert("성공");
            router.push("/page/record"); // 성공 시 "/add" 페이지로 이동
          } else {
            throw new Error("서버 응답 실패");
          }
        } catch (error) {
          alert("실패: " + error.message);
          router.push("/"); // 실패 시 "/" 페이지로 이동
        }
      };
    return(
        <div className="addAll">
            <div className="addText">지출 추가하기</div>
            <div className="titleAll">
                <div className="titleText">지출 이름</div>
                <textarea className="titleInput" onChange={(e)=>setTitle(e.target.value)}/>
            </div>
            <div className="priceAll">
                <div  className="priceText">지출액(원 생략)</div>
                <input className="priceInput" onChange={(e)=>setPrice(e.target.value)}/>
            </div>
            <div className="categoryAll">
                <div  className="categoryText">카테고리</div>
                <Select
                  options={category}
                  getOptionLabel={(e)=>e.name}
                  getOptionValue={(e)=>e.num}
                  value={num}
                  onChange={setNum}
                  placeholder="카테고리 선택"
                  className="categorySelect"/>
            </div>
            <div className="detailAll">
                <div  className="detailText">지출 내용</div>
                <textarea className="detailInput" onChange={(e)=>setDetail(e.target.value)}/>
            </div>
            <button className="addButton" onClick={handleSubmit}>완료</button>
        </div>
    )
}