import React from "react";
import styles from "./sidebar.module.css";
import { useState } from "react";
import { handleCleanFilter, handleSelectedFilter } from "./handlersSideBar";
import { useDispatch, useSelector } from "react-redux";

export default function Ordenamientos() {

  const value = useState("default")

  const filtros = useSelector(state => state.filters);

  const dispatch = useDispatch();

  return (
    <>
      <select onChange={(e) => handleSelectedFilter(e, filtros, dispatch)} className={styles.selectBox} name="order" defaultValue={value}>
      <option value="default" disabled hidden>Ordenamiento</option>
          <option value="name_ASC">Nombre ascendente</option>
          <option value="name_DESC">Nombre descendente</option>
          <option value="size_ASC">Tamaño ascendente</option>
          <option value="size_DESC">Tamaño descendente</option>
      </select>
      <button onClick={(e) => handleCleanFilter(e, filtros, dispatch)} name="delete order" className={styles.btn}>Eliminar Orden</button>
    </>
  );
}