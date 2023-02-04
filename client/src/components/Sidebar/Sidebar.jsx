import React from "react";
import styles from "./sidebar.module.css";
import { useState} from "react";
import Ordenamientos from "./Ordenamientos";
import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"
import { getFilterPets, updateFilters } from "../../redux/actions";

const combinarFiltros = (filtros) => {
  return `http://localhost:3001/pets?sex=${filtros.sex}&size=${filtros.size}&species=${filtros.species}`;
}

export default function Sidebar() {


const [value] = useState("default");
const filtros = useSelector(state => state.filters);

const dispatch = useDispatch();

 useEffect(() => {
  // creamos url
  const url = combinarFiltros(filtros);
  // peticion a la api con la url
  dispatch(getFilterPets(url));
 },[filtros])

 const handleSelectedFilter = (e) => {
  e.preventDefault();
  dispatch(updateFilters({...filtros, [e.target.name]: e.target.value}));
 }

 const handleCleanFilter = (e) => {
  e.preventDefault();
  dispatch(updateFilters({sex: "", species: "", size: "", name: "", order: ""}));
 }

  return (
    <div className={styles.container}>
      <select onChange={handleSelectedFilter} className={styles.selectBox} value={filtros.species} name="species">
      <option value="default" disabled hidden>Tipo de mascota</option>
          <option value="gato">Gato</option>
          <option value="perro">Perro</option>
      </select>
      <select onChange={handleSelectedFilter} className={styles.selectBox} value={filtros.size} name="size">
      <option value="default" disabled hidden>Tamaño</option>
          <option value="pequeño">Pequeño</option>
          <option value="mediano">Mediano</option>
          <option value="grande">Grande</option>
      </select>
      <select onChange={handleSelectedFilter} className={styles.selectBox} name="sex" value={filtros.sex}>
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
      <button onClick={handleCleanFilter} className={styles.btn}>Restablecer Filtros</button>
      <Ordenamientos/>
    </div>
  );
}
