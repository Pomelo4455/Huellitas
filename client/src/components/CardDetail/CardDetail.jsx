import React from "react";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import niceDog from "../../img/niceDog.png";

import style from "./cardDetail.module.css";

const CardDetail = () => {
  return (
    <>
      <NavBar />
      <div className={style.detailContainer}>
        <div className={style.detailInformation}>
          <div className={style.petName}>
            <h2>Mancha</h2>
          </div>
          <div className={style.petImage}>
            <img src={niceDog} alt="" />
          </div>

          <div className={style.btnContainer}>
            <button className={style.btnContact}>Contactar</button>
          </div>
        </div>

        <div className={style.detailDescription}>
          <div className={style.descriptionContainer}>
            <p>
              <span>Nombre:</span> Mancha
            </p>
            <p>
              <span>Edad:</span> 4 meses
            </p>
            <p>
              <span>Tamaño:</span> mediano
            </p>
            <p>
              <span>Color:</span> blanco y negro
            </p>
            <p><span>Descripcion:</span> Mancha es un perrito muy sociable</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CardDetail;
