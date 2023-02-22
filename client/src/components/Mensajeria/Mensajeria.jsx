import React, { useEffect, useState } from "react";
import styles from "./mensajeria.module.css";
import RenderizarMensajes from "./RenderizarMensajes";
import axios from "axios";
import io from "socket.io-client"
import RenderizarChats from "./RenderizarChats";
import { Icon } from '@iconify/react';
import NotFound from "../NotFound/NotFound";
import { LINK_BACK } from "../../Utils/variablesDeploy";

const INICIAL_INPUT = "Escriba su mensaje..."
const socket = io(`${LINK_BACK}`)

const validar_url = (emisorId, receptorId, userId) => {
  if (String(emisorId) !== String(userId) && receptorId !== "chats") return true
  if (emisorId == receptorId) return true
  if ((isNaN(receptorId) || isNaN(emisorId)) && receptorId !== "chats") return true
  return false
}

export default function Mensajeria() {
  let [message, setMessage] = useState(INICIAL_INPUT);
  let [desplegable, setDesplegable] = useState("visible");
  let URL = window.location.href.split("/");
  let receptorId = URL.pop();
  let emisorId = URL.pop();
  let userLocalStorage = JSON.parse(localStorage.getItem("loggedUser"));
  let userId = userLocalStorage.data?.id;

  const useScreenSize = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
  
    useEffect(() => {
      window.addEventListener("resize", handleResize);
  
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);
  
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
  
    return { width, height };
  };

  let screenWidth = useScreenSize().width

  if (validar_url(emisorId, receptorId, userId)) {
    console.log("entre");
    return (
      <NotFound/>
    )
  }

  else {
    const handleEnviar = (e) => {
      if ((e.key === "Enter" || e.type === "click") && message.length > 0 && !message.includes("\n")) {
          axios.post(`${LINK_BACK}/message`, {"message" : message, "emisorId": emisorId, "receptorId": receptorId})
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

    const handleDesplegable = (e) => {
      setDesplegable(e.target.name)
    }

    return (
          <div className={styles.container}>
            <div className={styles.container2}>
              
                {desplegable != "oculto" || screenWidth >= 750 ?
                <div className={styles.containerChats}>
                  <div className={styles.top}>
                  <h3>Chats</h3>
                  </div>
                  <RenderizarChats emisorId = {userId} message = {message} receptorActualId = {receptorId}/>
                  <div className={styles.desplegable}>
                        <h2 style={{margin: "0px"}}>OCULTAR CHATS</h2>
                        <button onClick={handleDesplegable} name={"oculto"} className={styles.iconoDesplegable}>{"ʌ"}</button>
                  </div>
                </div> 
                :
                <div className={styles.containerChats}>
                  <div className={styles.desplegable}>
                      <h2 style={{margin: "0px"}}>MOSTRAR CHATS</h2>
                      <h2 onClick={handleDesplegable} name={"visible"} className={styles.iconoDesplegable}>{"v"}</h2>
                  </div>
                </div> 
              }
                
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
                      <h1>Seleccione un chat del historial para verlo</h1>
                    </div>
                  </div>
              </div>
              }
            </div>
          </div>
      )
  }
}
