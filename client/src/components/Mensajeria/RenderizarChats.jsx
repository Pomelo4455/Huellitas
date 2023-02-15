import React, { useEffect, useState } from "react";
import styles from "./mensajeria.module.css";
import axios from "axios";

const renderizarChats = (chats, emisorId) => {
    return chats.map((ultimoMensaje, i) => {
        let receptor = ""
        if (ultimoMensaje?.receptor.id === emisorId) receptor = ultimoMensaje.emisor
        else receptor = ultimoMensaje?.receptor
        return (
            <div onClick={() => window.location.href = `http://localhost:3000/chat/${emisorId}/${receptor.id}`} key={i} className={styles.containerHistoryUser}>
                    <img src={receptor.image} alt="nf" width="30px" height="30px"/>
                    <div className={styles.containerHistoryUserText}>
                        <h4 className={styles.historyUserText}>{receptor.name}</h4>
                        <h6 className={styles.historyUserText}>{`${ultimoMensaje.emisor.name}: ${ultimoMensaje.message}`}</h6>
                    </div>
            </div>
        )
    })
}

export default function RenderizarChats({emisorId, message}) {

    let [chats, setChats] = useState([])

    useEffect(() => {
        axios(`http://localhost:3001/message/chats?emisorId=${emisorId}`)
        .then(chats => setChats(chats.data));
    }, [emisorId, message])
    
  return (
        <div className={styles.chats}>
            {renderizarChats(chats, emisorId)}
        </div>
    )
}
