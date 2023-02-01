import React from "react";
import styles from "./card.module.css";


export default function Card() {
  
  return (
      <div className={styles.ard}>
         <div className={styles.center}>

      <img src='https://images.pexels.com/photos/1458916/pexels-photo-1458916.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' 
      alt= 'Mancha' className={styles.img} />
      <h1 className={styles.name} >Nombre</h1>
         </div>
      </div>
  );
}
