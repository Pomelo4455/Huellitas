import React, { useEffect, useState } from "react";
import Fundation from "./CardFundacion";
import Paginado from "../Paginado/Paginado";
import { useDispatch, useSelector } from "react-redux";
import {
  getFundaciones,
  restoreSearch,
  getSearchFundation,
  setCurrentPage,
} from "../../redux/actions";
import { Icon } from "@iconify/react";
import swal from "sweetalert";
import styles from "./fundations.module.css";

// agregar card de fundacion en el return pasando por props los argumentos necesarios

export default function Fundations() {
  const allFundaciones = useSelector((state) => state.fundaciones);
  console.log(allFundaciones);
  const dispatch = useDispatch();
  const [searchFund, setSearchFund] = useState("");

  const currentPage = useSelector((state) => state.page);
  const [fundPerPage, setFundPerPage] = useState(6);
  const indexLastFund = currentPage * fundPerPage;
  const indexFirstFund = indexLastFund - fundPerPage;
  const currentFund = allFundaciones.slice(indexFirstFund, indexLastFund);
  const fundMax = Math.ceil(allFundaciones.length / fundPerPage);

  function setPage(pageNumber) {
    dispatch(setCurrentPage(pageNumber));
  }

  const paginado = (pageNumber) => {
    setPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getFundaciones());
  }, [dispatch]);

  const handleSearchFund = (event) => {
    setSearchFund(event.target.value);
  };

  const inputSearchFund = (event) => {
    event.preventDefault();
    if (searchFund === "") {
      swal({
        text: "Debe escribir el nombre de una fundación",
        icon: "warning",
        button: "Ok",
      });
      setSearchFund("");
    } else {
      dispatch(getSearchFundation(searchFund));
      setSearchFund("");
    }
  };

  const resetFund = (e) => {
    e.preventDefault();
    dispatch(getFundaciones());
  };

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <form onSubmit={inputSearchFund}>
          <div className={styles.searchContainer}>
            <div className={styles.newsearch}>
              <input
                type="text"
                placeholder="Buscar a la fundación: "
                value={searchFund}
                className={styles.search}
                onChange={handleSearchFund}
              />
              <button
                name="name"
                value={searchFund}
                className={styles.searchButton}
                onClick={inputSearchFund}
              >
                <Icon icon="fa6-solid:magnifying-glass" />
              </button>
              <button onClick={resetFund} className={styles.restoreButton}>
                Eliminar busqueda
              </button>
            </div>
            <div className={styles.fundaciones}>
              {currentFund.map((fundacion) => {
                return <Fundation fundacion={fundacion} key={fundacion.id} />;
              })}
            </div>
          </div>
        </form>
      </div>
      <Paginado
        paginado={paginado}
        currentPage={currentPage}
        petMax={fundMax}
      />
    </div>
  );
}
