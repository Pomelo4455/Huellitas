import styles from "./sidebar.module.css";
import Ordenamientos from "./Ordenamientos";
import {useDispatch, useSelector} from "react-redux"
import { getFilterPets } from "../../redux/actions";
import { combinarFiltros, handleCleanFilter, handleSelectedFilter } from "./handlersSideBar";

export default function Sidebar() {

  const filtros = useSelector(state => state.filters);

  const dispatch = useDispatch();

  let value = "default";

  return (
    <div className={styles.container}>
      <select onChange={(e) => handleSelectedFilter(e, filtros, dispatch)} className={styles.selectBox} name="species" defaultValue={value}>
      <option value="default" disabled hidden>Tipo de mascota</option>
                  <option value="perro">Perro</option>
                  <option value="gato">Gato</option>
                  {/* <option value="conejo">Conejo</option>
                  <option value="tortuga">Tortuga</option>
                  <option value="cobayo">Cobayo</option> */}
      </select>
      <select defaultValue={value} onChange={(e) => handleSelectedFilter(e, filtros, dispatch)} className={styles.selectBox} name="size">
      <option value="default" disabled hidden>Tamaño</option>
          <option value="pequeño">Pequeño</option>
          <option value="mediano">Mediano</option>
          <option value="grande">Grande</option>
      </select>
      <select defaultValue={value} onChange={(e) => handleSelectedFilter(e, filtros, dispatch)} className={styles.selectBox} name="sex">
      <option value="default" disabled hidden>Sexo</option>
          <option value="macho">Macho</option>
          <option value="hembra">Hembra</option>
      </select>
      {/* <select className={styles.selectBox} name="age" defaultValue={value}>
      <option value="default" disabled hidden>Edad</option>
          <option value="menor1">Menor de un año</option>
          <option value="1a2">Entre uno  y dos años</option>
          <option value="2plus">Más de dos años</option>
      </select> */}
      <Ordenamientos/>
      <button name="delete filters" onClick={(e) => handleCleanFilter(e, filtros, dispatch)} className={styles.btn}>Restablecer Filtros</button>
      
    </div>
  );
}
