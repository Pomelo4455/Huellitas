import React, { useEffect, useState } from "react";
import styles from "./mensajeria.module.css";
import axios from "axios";
import io from "socket.io-client"
import { useDispatch } from "react-redux"
import { updateNotReadChats } from "../../redux/actions";

const socket = io('http://localhost:3001')

export default function RenderizarChats({emisorId, receptorActualId}) {

    let [chats, setChats] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        axios(`http://localhost:3001/message/chats?emisorId=${emisorId}`)
        .then(chats => setChats(chats.data));
    }, [])

    useEffect(() => {
        // ACA ACTUALIZAR LOS MENSAJES NO LEIDOS PARA SUMAR.
        const updateChats = (message) => {
            if (emisorId == message.ReceptorId || emisorId == message.EmisorId) {
                axios(`http://localhost:3001/message/chats?emisorId=${emisorId}`)
                .then(chats => {
                    setChats(chats.data)
                });
                if (emisorId == message.ReceptorId) {
                    axios(`http://localhost:3001/message/noleidos?userId=${emisorId}`)
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
        window.location.href = `http://localhost:3000/chat/${emisorId}/${receptorId}`
        axios.put(`http://localhost:3001/message/leido?emisorId=${receptorId}&receptorId=${emisorId}`)
        .then(data => console.log("en click chat", data.data));
        axios(`http://localhost:3001/message/noleidos?userId=${emisorId}`)
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
