import React from "react";
import { Link } from "react-router-dom";
import styles from "./cardhome.module.css";

export default function CardHome({ image, title, subtitle }) {

  return (
    <div className={styles.card}>
        <div className={styles.center}>
        <img className={styles.img} src={image} alt={image}/>
        <h1 className={styles.name}>{title}</h1>
        <h2 className={styles.name}>{subtitle}</h2>
        </div>
    </div>
  );
}