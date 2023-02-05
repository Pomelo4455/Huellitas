import React from "react";

import Card from "../Card/Card";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import Paginado from "../Paginado/Paginado";
import Sidebar from "../Sidebar/Sidebar";

import styles from "./allcards.module.css";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getFilterPets, getPets } from "../../redux/actions";
import { all } from "axios";
import { combinarFiltros } from "../Sidebar/handlersSideBar";

function Adoptar() {
  const dispatch = useDispatch();
  const allPets = useSelector((state) => state.pets);
  const filters = useSelector((state) => state.filters);

  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage, setdogsPerPage] = useState(5);
  const indexLastProduct = currentPage * dogsPerPage;
  const indexFirstProduct = indexLastProduct - dogsPerPage;
  const currentDogs = allPets.slice(indexFirstProduct, indexLastProduct);

  useEffect(() => {
    // creamos url
    const url = combinarFiltros(filters);
    // peticion a la api con la url
    dispatch(getFilterPets(url));
  }, [filters]);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleResetPaginated = (e) => {
    dispatch(getPets());
    setCurrentPage(1);
  };

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <Sidebar />
        <div className={styles.adoptar}>
          {/* reemplazar tarjetas por una sola cuando este la logica resuelta */}
          {currentDogs.map((pet) => (
            <Card pets={pet} key={pet.id} />
          ))}
        </div>
      </div>
      <Paginado
        dogsPerPage={dogsPerPage}
        allPets={allPets.length}
        paginado={paginado}
      />
      <Footer />
    </>
  );
}

export default Adoptar;
