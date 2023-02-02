import React from "react";
import { Link } from 'react-router-dom';

import styles from "./card.module.css";



export default function Card({pets}) {

   return (
      <Link 
         to='/detail'
         key={pets.id} 
      >
         <div className={styles.card}>
            <div className={styles.center}>
            <img
               src={pets.image}
               alt={pets.name}
               className={styles.img}
               />
            <h1 className={styles.name}>{pets.name}</h1>
            </div>
         </div>

      </Link>
  );

}
