import React from "react";
import Card from "../Card/Card";
// import Footer from "../Footer/Footer";
// import NavBar from "../NavBar/NavBar";
import Paginado from "../Paginado/Paginado";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./allcards.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getFilterPets, getPets, setCurrentPage } from "../../redux/actions";
import { all } from "axios";
import { combinarFiltros } from "../Sidebar/handlersSideBar";

function Adoptar() {
  const dispatch = useDispatch();
  const allPets = useSelector((state) => state.pets);
  const filters = useSelector((state) => state.filters);
  const currentPage = useSelector((state) => state.page);
  // const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage, setdogsPerPage] = useState(8);
  const indexLastProduct = currentPage * dogsPerPage;
  const indexFirstProduct = indexLastProduct - dogsPerPage;
  const currentDogs = allPets.slice(indexFirstProduct, indexLastProduct);
  const petMax = Math.ceil(allPets.length / dogsPerPage);

  useEffect(() => {
    // creamos url
    const url = combinarFiltros(filters);
    // peticion a la api con la url
    dispatch(getFilterPets(url));
  }, [filters]);

  function setPage(pageNumber) {
    dispatch(setCurrentPage(pageNumber));
  }

  const paginado = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <div className={styles.body}>
      {/* <NavBar /> */}
      <div className={styles.container}>
        <Sidebar />
        <div className={styles.adoptar}>
          {/* reemplazar tarjetas por una sola cuando este la logica resuelta */}
          {currentDogs.map((pet) => (
            <Card pets={pet} key={pet.id} />
          ))}
        </div>
      </div>
      <Paginado paginado={paginado} currentPage={currentPage} petMax={petMax} />
      {/* <Footer /> */}
    </div>
  );
}

export default Adoptar;
