import React from 'react'
import styles from "./gratitude.module.css";
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Icon } from "@iconify/react";
function Gratitude() {

const [searchParams] = useSearchParams();

const [data, setData] = useState({
  amount: "",
  idCampaign:"",
  idUser: "",
  status:""
})

  useEffect(() => {
  let datos = JSON.parse(localStorage.getItem('datosDonacion'))
  const status = (searchParams.get('status'))
  setData(datos, {status: status})
  }, [])

  
  
  console.log(data);
  
  return (
    <div className={styles.body}>

<Icon  icon="pajamas:go-back" width='80px'/>
        <div className={styles.gracias}>
        
        <img src='https://i.pinimg.com/originals/74/88/22/7488228009d153e94a00427f674d54bb.jpg' className={styles.img}></img>
        <h1>¡¡¡Gracias por tu generosidad!!!</h1>
        <p></p>
        </div>
   
    </div>

  )
}
export default Gratitude;