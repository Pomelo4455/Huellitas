import React from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import styles from "./landing.module.css";
import styles2 from "../Home/home.module.css"
/* eslint-disable jsx-a11y/anchor-is-valid */
/* No borrar comentario arriba, es para evitar que aparezcan warnings que no aplican al proyecto al compilar*/

export default function Landing() {
  return (
    <div>
      <div className={styles.landingContainer}>
      <div className={styles.Circle}></div>
        <h1 className={styles.text}>Huellitas</h1>
        <h3 className={styles.subtitle}>Cada patita cuenta</h3>
        <a className={styles.textP}>
            ¡Hola! Acá vas a poder encontrar a tu mejor amigo, ayudar a refugios
            realizando donaciones, u ofrecer en adopción al mejor amigo de quien
            tenga la suerte de adoptarlo. ¡Ayudanos a ayudarlos!
        </a>
      </div>
    </div>
  );
}
