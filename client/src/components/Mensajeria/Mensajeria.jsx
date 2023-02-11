import React, { useState } from "react";
import styles from "./mensajeria.module.css";
import RenderizarMensajes from "./RenderizarMensajes";
import axios from "axios";

const INICIAL_INPUT = "Escriba su mensaje..."

export default function Mensajeria() {

  let [messagge, setMessagge] = useState(INICIAL_INPUT);
  let URL = window.location.href.split("/");
  let receptorId = URL.pop();
  let emisorId = URL.pop();

  const handleEnviar = (e) => {
    if (e.key === "Enter" || e.type === "click") {
        axios.post("http://localhost:3001/message", {"message" : messagge, "emisorId": emisorId, "receptorId": receptorId})
        .then(()=>{setMessagge("")})
    }
  }
  const handleVaciar = (e) => {
    if (e.target.value === INICIAL_INPUT) {
        setMessagge("");
    }
  }
  const handleChange = (e) => {
    setMessagge(e.target.value);
  }

  return (
        <div style={{background: "gray"}}>
        <div className={styles.container}>
            <div className={styles.top}>
                <button className={styles.buttonTop}>{"<"}</button>
                <h3>Chat en vivo</h3>
                <button className={styles.buttonTop}>{"x"}</button>
            </div>
            <RenderizarMensajes/>
            <div className={styles.inputContainer}>
                <p><textarea onChange={handleChange} onClick={handleVaciar} onKeyDown={handleEnviar} className={styles.input} value={messagge} name="messagge" rows="5" cols="70">{messagge}</textarea></p>
                {messagge && messagge !== INICIAL_INPUT ?
                    <button onClick={handleEnviar}>Enviar</button>
                : 
                    null}
            </div>
        </div>
        </div>
    )
}
