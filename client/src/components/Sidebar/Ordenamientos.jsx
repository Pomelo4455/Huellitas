import React from "react";
import styles from "./sidebar.module.css";
import { useState } from "react";

export default function Ordenamientos() {

  const value = useState("default")

  return (
    <>
      <select className={styles.selectBox} name="type" defaultValue={value}>
      <option value="default" disabled hidden>Ordenamiento</option>
          <option value="name_ASC">Nombre ascendente</option>
          <option value="name_DESC">Nombre descendente</option>
          <option value="age_ASC">Edad ascendente</option>
          <option value="age_DESC">Edad descendente</option>
          <option value="size_ASC">Tamaño ascendente</option>
          <option value="size_DESC">Tamaño descendente</option>
      </select>
      <button className={styles.btn}>Eliminar Orden</button>
    </>
  );
}