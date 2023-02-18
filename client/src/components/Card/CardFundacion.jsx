import React from "react";
import styles from "./CardFundacion.module.css";
import { Link } from "react-router-dom";

export default function CardFundacion({ fundacion }) {
  return (
    <div className={styles.card}>
      <div>
        <Link to={`/userDetail/${fundacion.id}`} className={styles.link_detail} >
          <img src={fundacion.image} alt={fundacion.name} className={styles.img} />
          <h1 className={styles.title}>{fundacion.name}</h1>
          <h2 className={styles.text}>{fundacion.address}</h2>
        </Link>
      </div>
    </div>
  );
}
