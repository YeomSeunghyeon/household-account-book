"use client";
import { useEffect, useState } from "react";
import "./add.css";
import axios from "axios";


export default function add(){
    const [title,setTitle]=useState("");
    const [price,setPrice]=useState("");
    const [num,setNum]=useState("");
    const [detail,setDetail]=useState("");
    const [date,setDate]=useState("");
    useEffect(() => {
        const interval = setInterval(() => {
          setDate(new Date().toLocaleString()); // 현재 시간 갱신
        }, 1000); // 1초마다 업데이트
    
        return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 정리
      }, []);

      useEffect(()=>{
      
      },[])
    return(
        <div className="addAll">
            <div className="addText">지출 추가하기</div>
            <div>
                <div>지출 이름</div>
                <input className="titleInput" onChange={(e)=>setTitle(e.target.value)}/>
            </div>
            <div>
                <div>지출액</div>
                <input className="priceInput" onChange={(e)=>setPrice(e.target.value)}/>
            </div>
            <div>
                <div>카테고리</div>
                
            </div>
            <div>
                <div>지출 내용</div>
                <input className="detailInput" onChange={(e)=>setDetail(e.target.value)}/>
            </div>
        </div>
    )
}