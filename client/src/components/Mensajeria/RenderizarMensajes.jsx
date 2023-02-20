import React, { useEffect, useState } from "react";
import styles from "./mensajeria.module.css";
import axios from "axios";
import io from "socket.io-client";
import { useDispatch } from "react-redux";
import { updateNotReadChats } from "../../redux/actions";
import { Link } from "react-router-dom";
const { LINK_BACK, LINK_FRONT } = process.env;

const socket = io(`${LINK_BACK}`);

const renderizarMensajes = (mensajes, emisor, receptor) => {
  return mensajes.map((mensaje, i) => {
    if (mensaje.EmisorId == emisor.id) {
      return (
        <div key={i} className={styles.containerUser2}>
          <p className={styles.messagge}>{mensaje.message}</p>
          <img className={styles.profilePic} src={emisor.image} alt="nf" />
        </div>
      );
    } else {
      return (
        <div key={i} className={styles.containerUser1}>
          <img className={styles.profilePic} src={receptor.image} alt="nf" />
          <p className={styles.messagge}>{mensaje.message}</p>
        </div>
      );
    }
  });
};

export default function RenderizarMensajes() {
  let [messages, setMessages] = useState([]);
  let [emisor, setEmisor] = useState({});
  let [receptor, setReceptor] = useState({});
  let URL = window.location.href.split("/");
  let receptorId = URL.pop();
  let emisorId = URL.pop();
  const dispatch = useDispatch();

  useEffect(() => {
    axios(`${LINK_BACK}/users/${emisorId}`).then((user) =>
      setEmisor(user.data)
    );
    axios(`${LINK_BACK}/users/${receptorId}`).then((user) =>
      setReceptor(user.data)
    );
    axios
      .put(
        `${LINK_BACK}/message/leido?emisorId=${receptorId}&receptorId=${emisorId}`
      )
      .then((data) => {});
    axios(`${LINK_BACK}/message/noleidos?userId=${emisorId}`)
      .then((data) => dispatch(updateNotReadChats(data.data.cantidad)))
      .catch(() => (window.location.href = `${LINK_FRONT}/chats`));
  }, []);

  useEffect(() => {
    // ACA ACTUALIZAR LOS MENSAJES NO LEIDOS PARA RESTAR.
    const reciveMessage = (message) => {
      if (
        (emisorId == message.ReceptorId && receptorId == message.EmisorId) ||
        (emisorId == message.EmisorId && receptorId == message.ReceptorId)
      ) {
        setMessages([message, ...messages]);
        if (emisorId == message.ReceptorId) {
          axios
            .put(
              `${LINK_BACK}/message/leido?emisorId=${message.EmisorId}&receptorId=${message.ReceptorId}`
            )
            .then((data) => console.log(data.data));
          axios(
            `${LINK_BACK}/message/noleidos?userId=${emisorId}`
          ).then((data) => dispatch(updateNotReadChats(data.data.cantidad)));
        }
      }
    };
    socket.on("message", reciveMessage);
    return () => {
      socket.off("message", reciveMessage);
    };
  }, [messages]);

  useEffect(() => {
    axios(
      `${LINK_BACK}/message?emisorId=${emisorId}&receptorId=${receptorId}`
    ).then((mensajes) => setMessages(mensajes.data));
  }, []);

  return (
    <>
      <div className={styles.top}>
        <Link to={`../userDetail/${receptorId}`}>
          <img className={styles.topImage} src={receptor.image} alt="nf" />
        </Link>
        <h3>{receptor.name}</h3>
      </div>
      <div className={styles.mensajes}>
        {renderizarMensajes(messages, emisor, receptor)}
      </div>
    </>
  );
}
