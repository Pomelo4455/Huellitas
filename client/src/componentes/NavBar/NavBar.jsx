import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';
import img from "../../imagenes/Huellita.png";

const NavBar = () => {

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
      setSearchTerm(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // Acá se realiza la búsqueda usando el valor ingresado.
    };

    const handleLogin = () => {
        window.location.href = '/login';
    };

    return (
      <nav className={styles.nav}>
        <ul className={styles.leftContainer}>
          <li>
            <Link to="/adoptar" className={styles.link}>Adoptar</Link>
          </li>
          <li>
            <Link to="/sobreNosotros" className={styles.link}>SobreNosotros</Link>
          </li>
        </ul>
        <div className={styles.title}>
                <img className={styles.img} src={img} alt="Img Not Found"></img>
                <h1 className={styles.txt}>Huellitas</h1>
            </div>
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={handleLogin}>Iniciar Sesión</button>
          <button className={styles.button} onClick={handleLogin}>Registrarse</button>
          <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={handleSearch}
            className={styles.search}
          />
          <button type="submit" className={styles.searchButton}>Buscar...</button>
        </form>
        </div>
      </nav>
    );
  };

export default NavBar;