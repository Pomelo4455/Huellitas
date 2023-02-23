import React from "react";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import Sidebar from "../Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getFilterPets,
  setCurrentPage,
  resetCards,
  } from "../../redux/actions";
import { all } from "axios";
import { combinarFiltros, handleCleanFilter } from "../Sidebar/handlersSideBar";
import swal from "sweetalert";
import styles from "./allcards.module.css";

function Adoptar() {
  const dispatch = useDispatch();
  
  const allPets = useSelector((state) => state.pets);
  const filters = useSelector((state) => state.filters);
  const currentPage = useSelector((state) => state.page);
  const userLocation = useSelector((state) => state.userLocation);
  const [dogsPerPage] = useState(6);
  const indexLastProduct = currentPage * dogsPerPage;
  const indexFirstProduct = indexLastProduct - dogsPerPage;
  const currentDogs = allPets?.slice(indexFirstProduct, indexLastProduct);
  const petMax = Math.ceil(allPets?.length / dogsPerPage);
  let user = JSON.parse(window.localStorage.getItem("loggedUser"))?.data;
  const filtros = useSelector((state) => state.filters);
  useEffect(() => {
    // creamos url
    const url = combinarFiltros({...filters, giverId: user ? user.id : ""});
    // peticion a la api con la url.
    dispatch(getFilterPets(url));
  }, [filters, dispatch]);

  function getDistance(latitude1, longitude1, latitude2, longitude2) {
    let theta = longitude1 - longitude2;
    let distance =
      60 *
      1.1515 *
      (180 / Math.PI) *
      Math.acos(
        Math.sin(latitude1 * (Math.PI / 180)) *
          Math.sin(latitude2 * (Math.PI / 180)) +
          Math.cos(latitude1 * (Math.PI / 180)) *
            Math.cos(latitude2 * (Math.PI / 180)) *
            Math.cos(theta * (Math.PI / 180))
      );
    return Math.round(distance * 1.609344, 2);
  }

  function setPage(pageNumber) {
    dispatch(setCurrentPage(pageNumber));
  }

  const paginado = (pageNumber) => {
    setPage(pageNumber);
  };


  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <Sidebar />
        <div className={styles.adoptar}>
          {currentDogs?.map((pet) => (
            <Card
              pets={pet}
              key={pet.id}
              distancia={getDistance(
                userLocation.latitude,
                userLocation.longitude,
                pet.latitude,
                pet.longitude
              )}
            />
          ))}
        </div>
      </div>
      <Paginado paginado={paginado} currentPage={currentPage} petMax={petMax} />
    </div>
  );
}

export default Adoptar;
