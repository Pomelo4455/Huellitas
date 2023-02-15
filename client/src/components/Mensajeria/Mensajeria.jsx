import React, { useState } from "react";
import styles from "./mensajeria.module.css";
import RenderizarMensajes from "./RenderizarMensajes";
import axios from "axios";
import io from "socket.io-client"
import RenderizarChats from "./RenderizarChats";
import { Icon } from '@iconify/react';

const INICIAL_INPUT = "Escriba su mensaje..."
const socket = io('http://localhost:3001')

export default function Mensajeria() {
  let [message, setMessage] = useState(INICIAL_INPUT);
  let URL = window.location.href.split("/");
  let receptorId = URL.pop();
  let emisorId = URL.pop();
  let userLocalStorage = JSON.parse(localStorage.getItem("loggedUser"));
  let userId = userLocalStorage.data?.id;

  if (String(emisorId) !== String(userId) && receptorId !== "chats") {
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
            <div className={styles.containerChats}>
              <div className={styles.top}>
                    <h3>Chats</h3>
              </div>
              <RenderizarChats emisorId = {userId} message = {message}/>
            </div>
            {receptorId !== "chats" ?
              <div className={styles.chat}>
                  <RenderizarMensajes/>
                  <div className={styles.inputContainer}>
                      <p><textarea style={{width: "50%"}} onChange={handleChange} onClick={handleVaciar} onKeyDown={handleEnviar} className={styles.input} value={message} name="message">{message}</textarea></p>
                      <button className={styles.enviarMensaje} onClick={handleEnviar}>Enviar</button>
                  </div>
              </div> : 
              <div className={styles.chat}>
                <div className={styles.containerRelleno}>
                  <div>
                    <Icon icon="ic:baseline-message" width={"150px"} height={"150px"} />
                    <h1>Seleccione un chat a tu derecha para verlo</h1>
                  </div>
                </div>
             </div>
            }
          </div>
      )
  }
}
