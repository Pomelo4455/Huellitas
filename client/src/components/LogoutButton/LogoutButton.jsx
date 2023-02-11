import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { login_failure } from "../../redux/actions";

import styles from "./LogoutButton.module.css";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const { logout } = useAuth0();
  const handleinput = () => {
    logout({ returnTo: window.location.origin });
    localStorage.setItem("loggedUser", JSON.stringify({}));
    dispatch(login_failure());
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
