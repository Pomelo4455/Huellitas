import React, { useEffect, useState } from "react";
import styles from "./mensajeria.module.css";
import axios from "axios";

const renderizarMensajes = (mensajes, emisorId) => {
    return mensajes.map((mensaje, i) => {
        if (mensaje.EmisorId == emisorId) {
            return (
                <div key={i} className={styles.containerUser2}>
                    <p className={styles.messagge}>{mensaje.message}</p>
                    <img className={styles.profilePic} src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp" alt="nf" />
                </div>
            )
        }
        else {
            return (
                <div key={i} className={styles.containerUser1}>
                    <img className={styles.profilePic} src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp" alt="nf"/>
                    <p className={styles.messagge}>{mensaje.message}</p> 
                </div>
            )
        }
    })
}

export default function RenderizarMensajes() {

  let [messages, setMessages] = useState([]);
  let URL = window.location.href.split("/");
  let receptorId = URL.pop();
  let emisorId = URL.pop();

  useEffect(() => {
    axios(`http://localhost:3001/message?emisorId=${emisorId}&receptorId=${receptorId}`)
    .then((mensajes) => setMessages(mensajes.data));
  }, []) // en un futuro se actualizaria cada vez que mande un mensaje alguno de los dos usuers. ahora solo al inicio.


  return (
        <div className={styles.mensajes}>
            {renderizarMensajes(messages, emisorId)}
        </div>
    )
}
