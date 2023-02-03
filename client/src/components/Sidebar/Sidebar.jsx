import React from "react";
import styles from "./sidebar.module.css";
import { useState} from "react";
import Ordenamientos from "./Ordenamientos";
export default function Sidebar() {


const [value] = useState("default");



  return (
    <div className={styles.container}>
      <select className={styles.selectBox} name="type" defaultValue={value}>
      <option value="default" disabled hidden>Tipo de mascota</option>
          <option value="cat">Gato</option>
          <option value="dog">Perro</option>
      </select>
      <select className={styles.selectBox} name="size" defaultValue={value}>
      <option value="default" disabled hidden>Tamaño</option>
          <option value="pequeño">Pequeño</option>
          <option value="mediano">Mediano</option>
          <option value="grande">Grande</option>
      </select>
      <select className={styles.selectBox} name="gender" defaultValue={value}>
      <option value="default" disabled hidden>Sexo</option>
          <option value="macho">Macho</option>
          <option value="hembra">Hembra</option>
      </select>
      <select className={styles.selectBox} name="age" defaultValue={value}>
      <option value="default" disabled hidden>Edad</option>
          <option value="menor1">Menor de un año</option>
          <option value="1a2">Entre uno  y dos años</option>
          <option value="2plus">Más de dos años</option>
      </select>
      <button className={styles.btn}>Restablecer Filtros</button>
      <Ordenamientos/>
    </div>
  );
}
