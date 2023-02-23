import React from "react";
import styles from "./gratitude.module.css";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
import { donation, updateCollected } from "../../redux/actions";
import { Link } from "react-router-dom";
import flowerDog from "../../img/FlowerDog.jpg"
let datos = JSON.parse(localStorage.getItem('datosDonacion'))

function Gratitude() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (datos?.campaignId) {
      dispatch(updateCollected(datos.campaignId, {collected: datos.amount}))
      dispatch(donation({...datos, status: "approved"}));
    }
    localStorage.setItem("datosDonacion", JSON.stringify({})
    );
  }, [])

  return (
    <div className={styles.body}>
      <div className={styles.gracias}>
        <img
          src={flowerDog}
          className={styles.img}
        />
        <h1>¡¡¡Gracias por tu generosidad!!!</h1>
        <p></p>
      </div>
      <Link to={`/campañas/${datos?.campaignId ? datos.campaignId : ""}`} className={styles.icon}>
        <Icon icon="pajamas:go-back" width="80px" />
      </Link>
    </div>
  );
}
export default Gratitude;
