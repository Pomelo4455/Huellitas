import React from "react";

import styles from "./card.module.css";

export default function CardFundacion({ fundacion }) {
  return (
    <div className={styles.card}>
      <div className={styles.link_detail}>
        <div className={styles.center}>
          <img src={fundacion.image} alt={fundacion.name} className={styles.img} />
          <h1 className={styles.name}>{fundacion.name}</h1>
          <h2 className={styles.name}>{fundacion.address}</h2>
        </div>
      </div>
    </div>
  );
}
