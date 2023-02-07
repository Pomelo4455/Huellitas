import React from "react";
import { Link } from "react-router-dom";
import styles from "./navBar.module.css";
import { Icon } from "@iconify/react";
import LoginButton from "../LoginButton/LoginButton";
import LogoutButton from "../LogoutButton/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";

const NavBar = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  // const handleLogin = () => {
  //   window.location.href = "/login";
  // };

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
          <Link to="/home" className={styles.txt}>
            Huellitas
          </Link>
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
      </div>
    </nav>
  );
};

export default NavBar;
