import React, { useEffect, useState } from "react";
import styles from "./mensajeria.module.css";
import axios from "axios";
import io from "socket.io-client"
import { useDispatch } from "react-redux"
import { updateNotReadChats } from "../../redux/actions";
import { LINK_BACK, LINK_FRONT } from "../../Utils/variablesDeploy";

const socket = io(`${LINK_BACK}`)

export default function RenderizarChats({emisorId, receptorActualId}) {

    let [chats, setChats] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        axios(`${LINK_BACK}/message/chats?emisorId=${emisorId}`)
        .then(chats => setChats(chats.data));
    }, [])

    useEffect(() => {
        // ACA ACTUALIZAR LOS MENSAJES NO LEIDOS PARA SUMAR.
        const updateChats = (message) => {
            if (emisorId == message.ReceptorId || emisorId == message.EmisorId) {
                axios(`${LINK_BACK}/message/chats?emisorId=${emisorId}`)
                .then(chats => {
                    setChats(chats.data)
                });
                if (emisorId == message.ReceptorId) {
                    axios(`${LINK_BACK}/message/noleidos?userId=${emisorId}`)
                    .then(data => dispatch(updateNotReadChats(data.data.cantidad)))
                }
            }
        }
        socket.on('message', updateChats);
        return () => {
            socket.off('message', updateChats);
        }
    }, [chats])

    const cambiarChat = (emisorId, receptorId) => {
        window.location.href = `${LINK_FRONT}/chat/${emisorId}/${receptorId}`
        axios.put(`${LINK_BACK}/message/leido?emisorId=${receptorId}&receptorId=${emisorId}`)
        .then(data => console.log("en click chat", data.data));
        axios(`${LINK_BACK}/message/noleidos?userId=${emisorId}`)
        .then(data => dispatch(updateNotReadChats(data.data.cantidad)))
    }
    
    const renderizarChats = (chats, emisorId, receptorActualId) => {
        return chats.map((ultimoMensaje, i) => {
            let receptor = ""
            if (ultimoMensaje?.receptor.id === emisorId) receptor = ultimoMensaje.emisor
            else receptor = ultimoMensaje?.receptor
            if (receptor?.id == receptorActualId) {
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
            else if (ultimoMensaje.leido == false && ultimoMensaje.emisor.id != emisorId) {
                return (
                    <div onClick={() => cambiarChat(emisorId, receptor.id)} key={i} className={styles.containerHistoryUser}>
                            <img src={receptor.image} alt="nf" width="30px" height="30px"/>
                            <div className={styles.containerHistoryUserText}>
                                <h4 className={styles.historyUserTextNoLeido}>{receptor.name}</h4>
                                <h6 className={styles.historyUserTextNoLeido}>{`${ultimoMensaje.emisor.name}: ${ultimoMensaje.message}`}</h6>
                            </div>
                    </div>
                )
            }
            else {
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
        })
    }
    
    return (
        <div className={styles.chats}>
            {renderizarChats(chats, emisorId, receptorActualId)}
        </div>
    )
}
