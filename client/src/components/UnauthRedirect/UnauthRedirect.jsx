import React from "react";

import sadDog from '../../img/sadDog.jpg'
import style from './notFound.module.css'
import BtnHome from "../BtnHome/BtnHome";
import { Link, useParams } from "react-router-dom";

export default function UnauthRedirect() {
  const {props}=useParams()
  let message="";
  switch (props){
    case "admin":  {
      message="SOLO ADMINS"
      break};
    case "foundation": {
      message="SOLO FUNDACIONES"
      break};
    case "user":  {
      message="SOLO USUARIOS REGISTRADOS"
      break};
    default: break
  }
  return (
    <div className={style.allNotFound} >
      <div className={style.notFoundContainer}>

        <div className={style.notFoundImage}>
          <img src={sadDog} alt="Imagen de un perrito triste" />
        </div>

        <div className={style.notFoundDescription}>
            
            <div className={style.notFoundTitle}>
              <h1>
                {message} 
              </h1>
              <h3>
                Todas estas mascotas estan necesitando tu ayuda
              </h3>
            </div>

            <div className={style.btnAdoptar}>
              <Link to='/Home'>
                <BtnHome text='IR A HOME'/>
              </Link>
            </div>
        </div> 
      </div>
    </div>
  );
}