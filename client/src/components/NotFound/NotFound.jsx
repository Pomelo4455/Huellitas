import React from "react";

// import Footer from "../Footer/Footer";
// import NavBar from "../NavBar/NavBar";

import sadDog from '../../img/sadDog.jpg'
import style from './notFound.module.css'
import BtnHome from "../BtnHome/BtnHome";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className={style.allNotFound} >
      {/* <NavBar /> */}
      
      <div className={style.notFoundContainer}>

        <div className={style.notFoundImage}>
          <img src={sadDog} alt="Imagen de un perrito triste" />
        </div>

        <div className={style.notFoundDescription}>
            
            <div className={style.notFoundTitle}>
              <h1>
                Lo lamento, esta pagina no existe 
              </h1>
              <h3>
                Todas estas mascotas estan necesitando tu ayuda
              </h3>
            </div>

            <div className={style.btnAdoptar}>
              <Link to='/Adoptar'>
                <BtnHome text='Adoptar'/>
              </Link>
            </div>

        </div> 

      </div>
      {/* <Footer />       */}
    </div>
  );
}