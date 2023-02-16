import React, { useState } from "react";
import styles from "./mensajeria.module.css";
import RenderizarMensajes from "./RenderizarMensajes";
import axios from "axios";
import io from "socket.io-client"
import RenderizarChats from "./RenderizarChats";
import { Icon } from '@iconify/react';
import NotFound from "../NotFound/NotFound";


const INICIAL_INPUT = "Escriba su mensaje..."
const socket = io('http://localhost:3001')

const validar_url = (emisorId, receptorId, userId) => {
  if (String(emisorId) !== String(userId) && receptorId !== "chats") return true
  if (emisorId == receptorId) return true
  if ((isNaN(receptorId) || isNaN(emisorId)) && receptorId !== "chats") return true
  return false
}

export default function Mensajeria() {
  let [message, setMessage] = useState(INICIAL_INPUT);
  let URL = window.location.href.split("/");
  let receptorId = URL.pop();
  let emisorId = URL.pop();
  let userLocalStorage = JSON.parse(localStorage.getItem("loggedUser"));
  let userId = userLocalStorage.data?.id;

  if (validar_url(emisorId, receptorId, userId)) {
    console.log("entre");
    return (
      <NotFound/>
    )
  }

  else {
    const handleEnviar = (e) => {
      if ((e.key === "Enter" || e.type === "click") && message.length > 0 && !message.includes("\n")) {
          axios.post("http://localhost:3001/message", {"message" : message, "emisorId": emisorId, "receptorId": receptorId})
          .then(() => {
            socket.emit('message', {message, EmisorId: emisorId, ReceptorId: receptorId})
            setMessage("")
          })
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
              <RenderizarChats emisorId = {userId} message = {message} receptorActualId = {receptorId}/>
            </div>
            {receptorId !== "chats" ?
              <div className={styles.chat}>
                  <RenderizarMensajes/>
                  <div className={styles.inputContainer}>
                      <input onChange={handleChange} onClick={handleVaciar} onKeyDown={handleEnviar} className={styles.input} value={message} name="message"></input>
                      <button className={styles.enviarMensaje} onClick={handleEnviar}>Enviar</button>
                  </div>
              </div> : 
              <div className={styles.chat}>
                <div className={styles.containerRelleno}>
                  <div>
                    <Icon icon="ic:baseline-message" width={"150px"} height={"150px"} />
                    <h1>Seleccione un chat a su izquierda para verlo</h1>
                  </div>
                </div>
             </div>
            }
          </div>
      )
  }
}
