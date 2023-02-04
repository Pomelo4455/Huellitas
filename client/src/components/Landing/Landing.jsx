import React from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import styles from "./landing.module.css";
/* eslint-disable jsx-a11y/anchor-is-valid */
/* No borrar comentario arriba, es para evitar que aparezcan warnings que no aplican al proyecto al compilar*/

export default function Landing() {
  return (
    <div>
      <div className={styles.NavLan}>
        <div className={styles.Title}>
          <Icon className={styles.iconFeet} icon="mingcute:foot-line" />
          <a className={styles.TitleTxt}>Huellitas</a>
        </div>
        <Link to={'https://www.instagram.com/huellitaswebpets/'}>
          <Icon className={styles.iconRedes1} icon="ph:instagram-logo" />
        </Link>
        <Link to={'https://twitter.com/huellitasweb'}>
          <Icon className={styles.iconRedes2} icon="mdi:twitter" />
        </Link>
        <Link to={'/:any'}>
          <Icon className={styles.iconRedes3} icon="ic:baseline-facebook" />
        </Link>
      </div>
      <div>
        <h1 className={styles.text}>Huellitas</h1>
        <a className={styles.textP}>
          Adopta a tu mejor amigo y de la mejor manera con nosotros
        </a>
      </div>
      <Link to="/home">
        <button className={styles.buttonLan}>¡Empecemos!</button>
      </Link>
      <div className={styles.img1}></div>
      <div className={styles.Banner}></div>
      <div className={styles.Circle}></div>
      <div className={styles.Circle2}></div>
      <div className={styles.Circle3}></div>
    </div>
  );
}
