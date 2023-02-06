import React from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import { getPetsDetail } from "../../redux/actions";


import style from "./cardDetail.module.css";

const CardDetail = () => {

  const dispatch = useDispatch();
  const pet = useSelector(state => state.pet);
  
  const { id } = useParams();

  useEffect(()=> {
    dispatch(getPetsDetail(id))
  },[dispatch, id])
  

  return (
    <>
      <NavBar />
      <div className={style.detailContainer}>
        <div className={style.detailInformation}>
          <div className={style.petName}>
            <h2>{pet.name}</h2>
          </div>
          <div className={style.petImage}>
            <img src={pet.image} alt={`Imagen de ${pet.name}`} />
          </div>

          <div className={style.btnContainer}>
            <button className={style.btnContact}>CONTACTAR</button>
          </div>
          <div className={style.btnContainer}>
            <button onClick={() => window.history.back()} className={style.btnContactBack}>VOLVER</button>
          </div>
        </div>

        <div className={style.detailDescription}>
          <div className={style.descriptionContainer}>
            <p>
              <span>Nombre:</span> {pet.name}
            </p>
            <p>
              <span>Edad:</span> {pet.age}
            </p>
            <p>
              <span>Tamaño:</span> {pet.size}
            </p>
            <p>
              <span>Color:</span> {pet.color}
            </p>
            <p><span>Descripcion:</span> {pet.temperament}</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CardDetail;
