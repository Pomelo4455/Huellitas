import React, { useState } from "react";
import styles from "./mensajeria.module.css";
import RenderizarMensajes from "./RenderizarMensajes";
import axios from "axios";
import io from "socket.io-client"

const INICIAL_INPUT = "Escriba su mensaje..."
const socket = io('http://localhost:3001')

export default function Mensajeria() {
  let [message, setMessage] = useState(INICIAL_INPUT);
  let URL = window.location.href.split("/");
  let receptorId = URL.pop();
  let emisorId = URL.pop();
  let userLocalStorage = JSON.parse(localStorage.getItem("loggedUser"));
  let userId = userLocalStorage.data?.id;

  if (emisorId != userId) {
    return (
      <h1>
        NO PODES VER CHATS DE OTRAS PERSONAS.
      </h1>
    )
  }
  else {
    const handleEnviar = (e) => {
      if (e.key === "Enter" || e.type === "click") {
          socket.emit('message', {message, EmisorId: emisorId, ReceptorId: receptorId})
          axios.post("http://localhost:3001/message", {"message" : message, "emisorId": emisorId, "receptorId": receptorId})
          .then(()=>{setMessage("")})
      }
    }
    const handleVaciar = (e) => {
      if (e.target.value === INICIAL_INPUT) {
          setMessage("");
      }
    }
    const handleChange = (e) => {
      setMessage(e.target.value);
    }

    return (
          <div className={styles.container}>
            <div className={styles.chat}>
                <div className={styles.top}>
                    <h3>Chat en vivo</h3>
                </div>
                <RenderizarMensajes submit={true}/>
                <div className={styles.inputContainer}>
                    <p><textarea style={{width: "50%"}} onChange={handleChange} onClick={handleVaciar} onKeyDown={handleEnviar} className={styles.input} value={message} name="message">{message}</textarea></p>
                    {message && message !== INICIAL_INPUT ?
                        <button onClick={handleEnviar}>Enviar</button>
                    : 
                        null}
                </div>
            </div>
          </div>
      )
  }
}
