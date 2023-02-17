import React, { useEffect, useState } from "react";
import styles from "./mensajeria.module.css";
import axios from "axios";
import io from "socket.io-client"
import { useDispatch } from "react-redux"
import { updateNotReadChats } from "../../redux/actions";

const socket = io('http://localhost:3001')

const renderizarMensajes = (mensajes, emisor, receptor) => {
    return mensajes.map((mensaje, i) => {
        if (mensaje.EmisorId == emisor.id) {
            return (
                <div key={i} className={styles.containerUser2}>
                    <p className={styles.messagge}>{mensaje.message}</p>
                    <img className={styles.profilePic} src={emisor.image} alt="nf" />
                </div>
            )
        }
        else {
            return (
                <div key={i} className={styles.containerUser1}>
                    <img className={styles.profilePic} src={receptor.image} alt="nf"/>
                    <p className={styles.messagge}>{mensaje.message}</p> 
                </div>
            )
        }
    })
}

export default function RenderizarMensajes() {

  let [messages, setMessages] = useState([]);
  let [emisor, setEmisor] = useState({});
  let [receptor, setReceptor] = useState({});
  let URL = window.location.href.split("/");
  let receptorId = URL.pop();
  let emisorId = URL.pop();
  const dispatch = useDispatch()

  useEffect(() => {
    axios(`http://localhost:3001/users/${emisorId}`)
    .then(user => setEmisor(user.data));
    axios(`http://localhost:3001/users/${receptorId}`)
    .then(user => setReceptor(user.data))
    axios.put(`http://localhost:3001/message/leido?emisorId=${receptorId}&receptorId=${emisorId}`)
    .then(data => {});
    axios(`http://localhost:3001/message/noleidos?userId=${emisorId}`)
    .then(data => dispatch(updateNotReadChats(data.data.cantidad)))
    .catch(() => window.location.href = `http://localhost:3000/chats`)
  }, [])

  useEffect(() => {
    // ACA ACTUALIZAR LOS MENSAJES NO LEIDOS PARA RESTAR.
    const reciveMessage = (message) => {
        if ((emisorId == message.ReceptorId && receptorId == message.EmisorId) || (emisorId == message.EmisorId && receptorId == message.ReceptorId)) {
            setMessages([message, ...messages]);
            if (emisorId == message.ReceptorId) {
                axios.put(`http://localhost:3001/message/leido?emisorId=${message.EmisorId}&receptorId=${message.ReceptorId}`)
                .then(data => console.log(data.data));
                axios(`http://localhost:3001/message/noleidos?userId=${emisorId}`)
                .then(data => dispatch(updateNotReadChats(data.data.cantidad)))
            }
        }
    }
    socket.on('message', reciveMessage);
    return () => {
        socket.off('message', reciveMessage);
    }
  }, [messages])

  useEffect(() => {
    axios(`http://localhost:3001/message?emisorId=${emisorId}&receptorId=${receptorId}`)
    .then((mensajes) => setMessages(mensajes.data));
  }, [])


  return (
        <>
            <div className={styles.top}>
                <img className={styles.topImage} src={receptor.image} alt="nf"/>
                <h3>{receptor.name}</h3>
            </div>
            <div className={styles.mensajes}>
                {renderizarMensajes(messages, emisor, receptor)}
            </div>
        </>
    )
}
