import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./LogoutButton.module.css";

const LogoutButton = () => {
  const { logout } = useAuth0();
  const handleinput = () => {
    logout({ returnTo: window.location.origin });
    localStorage.setItem("loggedUser", JSON.stringify({}));
  };
  return (
    <>
      <button className={styles.button} onClick={handleinput}>
        Cerrar sesión
      </button>
    </>
  );
};

export default LogoutButton;
