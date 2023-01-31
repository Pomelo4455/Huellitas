import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';

const Navbar = () => {

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
      setSearchTerm(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // Acá se realiza la búsqueda usando el valor ingresado.
    };

    return (
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link to="/adoptar" className={styles.link}>Adoptar</Link>
          </li>
          <li>
            <Link to="/sobreNosotros" className={styles.link}>SobreNosotros</Link>
          </li>
        </ul>
        <button className={styles.button} onClick={handleLogin}>Iniciar Sesión</button>
        <button className={styles.button} onClick={handleLogin}>Registrarse</button>
        <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleSearch}
          className={styles.search}
        />
        <button type="submit" className={styles.searchButton}>Buscar...</button>
      </form>
      </nav>
    );
  };

export default Navbar;