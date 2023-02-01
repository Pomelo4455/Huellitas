import React from "react";
import styles from "./login.module.css";
import { useState } from "react";

export default function Login() {
  const [logData, setLogData] = useState({
    email: "",
    pass: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    // agregar validacion de datos y enviar informacion
}

function handleChange(e) {
    e.preventDefault();
    setLogData({
      ...logData,
      [e.target.name]: e.target.value,
    });
}


  return (
    <div className={styles.container}>
      <button className={styles.btn} type="button">
        {"<"}
      </button>
      <div>¡Bienvenido!</div>
      <form onSubmit={handleSubmit}>
        <input
          className={styles.input}
          placeholder="Ingresa tu E-mail"
          type="text"
          name="email"
          value={logData.email}
          onChange={handleChange}
          //   onBlur={validateName}
        />
        <input
          className={styles.input}
          placeholder="Ingresa tu Clave"
          type="password"
          name="pass"
          value={logData.pass}
          onChange={handleChange}
          //   onBlur={validateName}
        />
        <label>¿Olvidaste tu contraseña?</label>
        <button className={styles.submit} type="submit" > Ingresar </button>
      </form>
    </div>
  );
}
