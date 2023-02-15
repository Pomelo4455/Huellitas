import React, { useEffect, useState } from "react";
import styles from "./mensajeria.module.css";
import axios from "axios";
import io from "socket.io-client"
const socket = io('http://localhost:3001')

const cambiarChat = (emisorId, receptorId) => {
    window.location.href = `http://localhost:3000/chat/${emisorId}/${receptorId}`
}

const renderizarChats = (chats, emisorId, receptorActualId) => {
    return chats.map((ultimoMensaje, i) => {
        let receptor = ""
        if (ultimoMensaje?.receptor.id === emisorId) receptor = ultimoMensaje.emisor
        else receptor = ultimoMensaje?.receptor
        if (receptor?.id != receptorActualId) {
            return (
                <div onClick={() => cambiarChat(emisorId, receptor.id)} key={i} className={styles.containerHistoryUser}>
                        <img src={receptor.image} alt="nf" width="30px" height="30px"/>
                        <div className={styles.containerHistoryUserText}>
                            <h4 className={styles.historyUserText}>{receptor.name}</h4>
                            <h6 className={styles.historyUserText2}>{`${ultimoMensaje.emisor.name}: ${ultimoMensaje.message}`}</h6>
                        </div>
                </div>
            )
        }
        else {
            return (
                <div key={i} className={styles.containerHistoryUserActual}>
                        <img src={receptor.image} alt="nf" width="30px" height="30px"/>
                        <div className={styles.containerHistoryUserText}>
                            <h4 className={styles.historyUserText}>{receptor.name}</h4>
                            <h6 className={styles.historyUserText2}>{`${ultimoMensaje.emisor.name}: ${ultimoMensaje.message}`}</h6>
                        </div>
                </div>
            )
        }
    })
}

export default function RenderizarChats({emisorId, message, receptorActualId}) {

    let [chats, setChats] = useState([])

    useEffect(() => {
        axios(`http://localhost:3001/message/chats?emisorId=${emisorId}`)
        .then(chats => setChats(chats.data));
    }, [emisorId, message])

    useEffect(() => {
        const updateChats = (message) => {
            if (emisorId == message.ReceptorId) { // si estamos en el usuario que recibe el mensaje
                axios(`http://localhost:3001/message/chats?emisorId=${emisorId}`)
                .then(chats => {
                    setChats(chats.data)
                    console.log(chats.data)
                });
            }
        }
        socket.on('message', updateChats);
        return () => {
            socket.off('message', updateChats);
        }
    }, [chats])
    
  return (
        <div className={styles.chats}>
            {renderizarChats(chats, emisorId, receptorActualId)}
        </div>
    )
}
