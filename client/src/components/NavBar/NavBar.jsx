import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./navBar.module.css";
import { Icon } from "@iconify/react";
import LoginButton from "../LoginButton/LoginButton";
import LogoutButton from "../LogoutButton/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import { handleSelectedFilter } from "../Sidebar/handlersSideBar";
import { useDispatch, useSelector } from "react-redux";
import { restoreSearch } from "../../redux/actions";
import swal from "sweetalert";

const NavBar = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [searchTerm, setSearchTerm] = useState("");
  const filtros = useSelector((state) => state.filters);
  const dispatch = useDispatch();

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aca se realiza la búsqueda usando el valor ingresado.
  };

  // const handleLogin = () => {
  //   window.location.href = "/login";
  // };

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
  };

  const resetSearch = (e) => {
    e.preventDefault();
    dispatch(restoreSearch());
  };

  return (
    <nav className={styles.nav}>
      <ul className={styles.leftContainer}>
        <li>
          <Link to="/home" className={styles.leftLinks}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/sobreNosotros" className={styles.leftLinks}>
            Sobre Nosotros
          </Link>
        </li>
      </ul>
      <div className={styles.title}>
        <Icon className={styles.img} icon="mingcute:foot-line" />
        <div className={styles.txt}>
          <Link to="/home" className={styles.txt}>Huellitas</Link>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        {isAuthenticated ? (
          <>
            <h4>Ha iniciado sesión como: {user.name.toUpperCase()}</h4>
            <img src={user.img}></img>
            <LogoutButton />
          </>
        ) : (
          <>
            <LoginButton />
          </>
        )}
        <form onSubmit={handleSubmit}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Buscar organizaciones..."
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
            <button className={styles.restoreButton} onClick={resetSearch}>
              Eliminar Búsqueda
            </button>
          </div>
        </form>
      </div>
    </nav>
  );
};

export default NavBar;
