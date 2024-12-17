"use client"
import React, { useEffect, useState } from 'react'

function Home() {
  const[kdv,setkdv]=useState(10);
  const[miktar,setmiktar]=useState(100)
  const[sonuc,setsonuc]=useState(0)
  const[renk,setrenk]=useState('red')

  useEffect(()=>{
    const sonucbul=miktar+(miktar*kdv/100)
    setsonuc(sonucbul)
    if(sonuc>200){
      setrenk('green')
    }else{
      setrenk('red')
    }
  },[miktar,sonuc,kdv])
  
  return (
    <div>
      <input type="text" placeholder='Miktar' value={miktar}  onChange={(e)=>setmiktar(Number(e.target.value))}/>
      <input type="text" value={kdv} placeholder='KDV Oran' onChange={(e)=>setkdv(Number(e.target.value))}/>
      <p style={{color:renk}}>{sonuc}</p>
    </div>
  )
}

export default Home