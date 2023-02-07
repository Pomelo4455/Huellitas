import React from "react";
import { Link } from "react-router-dom";

import styles from "./card.module.css";

export default function Card({ pets }) {
  return (
    <div className={styles.card}>
      <Link
        className={styles.link_detail}
        to={`/detail/${pets.id}`}
        key={pets.id}>
        <div className={styles.center}>
          <img src={pets.image} alt={pets.name} className={styles.img} />
          <h1 className={styles.name}>{pets.name}</h1>
          <h2 className={styles.name}>{pets.giver}</h2>
        </div>
      </Link>
    </div>
  );
}
