import Ordenamientos from "./Ordenamientos";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFilterPets, restoreSearch } from "../../redux/actions";
import { useState } from "react";
import {
  combinarFiltros,
  handleCleanFilter,
  handleSelectedFilter,
} from "./handlersSideBar";
import { Icon } from "@iconify/react";
import swal from "sweetalert";

import styles from "./sidebar.module.css";

export default function Sidebar() {
  const [searchTerm, setSearchTerm] = useState("");
  const filtros = useSelector((state) => state.filters);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let value = "default";

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const inputSearch = (e) => {
    e.preventDefault();
    if (searchTerm === "") {
      swal({
        title: "Sorry!",
        text: "Debe escribir el nombre de una organizacion",
        icon: "warning",
        button: "Ok",
      });
      setSearchTerm("");
    } else {
      handleSelectedFilter(e, filtros, dispatch);
      setSearchTerm("");
    }
    navigate("/Adoptar");
  };

  const resetSearch = (e) => {
    e.preventDefault();
    dispatch(restoreSearch());
  };

  return (
    <div className={styles.container}>
      <select
        onChange={(e) => handleSelectedFilter(e, filtros, dispatch)}
        className={styles.selectBox}
        name="species"
        defaultValue={value}
      >
        <option value="default" disabled hidden>
          Animal
        </option>
        <option value="perro">Perro</option>
        <option value="gato">Gato</option>
        {/* <option value="conejo">Conejo</option>
                  <option value="tortuga">Tortuga</option>
                  <option value="cobayo">Cobayo</option> */}
      </select>
      <select
        defaultValue={value}
        onChange={(e) => handleSelectedFilter(e, filtros, dispatch)}
        className={styles.selectBox}
        name="size"
      >
        <option value="default" disabled hidden>
          Tamaño
        </option>
        <option value="pequeño">Pequeño</option>
        <option value="mediano">Mediano</option>
        <option value="grande">Grande</option>
      </select>
      <select
        defaultValue={value}
        onChange={(e) => handleSelectedFilter(e, filtros, dispatch)}
        className={styles.selectBox}
        name="sex"
      >
        <option value="default" disabled hidden>
          Sexo
        </option>
        <option value="macho">Macho</option>
        <option value="hembra">Hembra</option>
      </select>
      {/* <select className={styles.selectBox} name="age" defaultValue={value}>
      <option value="default" disabled hidden>Edad</option>
          <option value="menor1">Menor de un año</option>
          <option value="1a2">Entre uno  y dos años</option>
          <option value="2plus">Más de dos años</option>
      </select> */}
      <Ordenamientos />
      <button
        name="delete filters"
        onClick={(e) => handleCleanFilter(e, filtros, dispatch)}
        className={styles.btn}
      >
        Restablecer Filtros
      </button>
      <form onSubmit={inputSearch}>
        <div className={styles.searchContainer}>
          <div className={styles.newsearch}>
            <input
              type="text"
              placeholder="Buscar mascotas de:"
              value={searchTerm}
              onChange={handleSearch}
              className={styles.search}
            />
            <button
              name="name"
              value={searchTerm}
              onClick={inputSearch}
              className={styles.searchButton}
            >
              <Icon icon="fa6-solid:magnifying-glass" />
            </button>
          </div>
          <button className={styles.restoreButton} onClick={resetSearch}>
            Eliminar Búsqueda
          </button>
        </div>
      </form>
    </div>
  );
}
