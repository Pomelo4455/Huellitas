import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { LINK_BACK } from "../../Utils/variablesDeploy";
import { useAuth0 } from "@auth0/auth0-react";
import stylesSideBar from "../Sidebar/sidebar.module.css"

import styles from "./card.module.css";
const renderizarSolicitantes = (solicitantes) => {
  return solicitantes.map(solicitante => {
    return <option key={solicitante.id} value={solicitante.id}>{solicitante.name}</option>
  })
}

export default function Card({ pets, distancia }) {
  let user = JSON.parse(window.localStorage.getItem("loggedUser"))?.data;
  let [seguido, setSeguido] = useState(false);
  let [solicitantes, setSolicitantes] = useState([])
  const navigate = useNavigate();
  const { loginWithPopup } = useAuth0();

  useEffect(() => {
   
    if (user?.id && pets?.id) {
      if (user.id !== pets.GiverId) {
        axios(`${LINK_BACK}/follow/${user.id}/${pets.id}`).then((data) =>
          setSeguido(data.data.seguir)
      )}
      else if (user.id === pets.GiverId) {
        axios(`${LINK_BACK}/adoption/solicitud/${pets.id}`)
        .then(data => setSolicitantes(data.data))
      }
    }
  }, []);

  const handleDetail = () => {
    navigate(`/detail/${pets.id}`);
  };

  const handleFollow = () => {
    if (user?.id && pets?.id) {
      setSeguido(!seguido);
      axios.put(
        `${LINK_BACK}/follow?userId=${user.id}&petId=${
          pets.id
        }&seguir=${!seguido}`
      );
    } else {
      swal("Inicia sesion para escoger favoritos", "", "error").then(() =>
        loginWithPopup()
      );
    }
  };

  const handleAdopcion = (e) => {
    e.preventDefault()
    let adoptanteId = e.target.value
    // aca post de adopcion realizada.
    swal({
      title: "¿Esta seguro que esta mascota fue adoptada?", 
      text: `si hace click en "si" la mascota se eliminará de sus mascotas en adopción.`, 
      icon: "info",
      buttons: ["cancelar", "si"]
    })
    .then((e) => {
      if (e === true) {
        axios.post(`http://localhost:3001/adoption/${adoptanteId}/${pets.id}`)
        .then(() => {
          swal({
            title: "Adopción confirmada", 
            text: `La mascota aparecerá en el perfil del usuario que la adoptó.`, 
            icon: "success",
          })
        })
      }
      else {
        swal({
          title: "Adopción cancelada", 
          text: `La mascota seguirá apareciendo en adopción.`, 
          icon: "info",
        })
      }
    })
  }

  return (
    <div key={pets.id} className={styles.card}>
      <div className={styles.center}>
        { !user || user.id === pets.GiverId? (
          null
        ) : seguido ? (
         <button onClick={handleFollow} className={styles.corazonFollow}>
           ❤
         </button>
        ) : (
         <button onClick={handleFollow} className={styles.corazonUnfollow}>
           ♡
         </button>
       )}
        <img
          onClick={handleDetail}
          src={pets.image}
          alt={pets.name}
          className={styles.img}
        />
        <h1 onClick={handleDetail} className={styles.name}>
          {pets.name}
        </h1>
       {distancia? <p>Se encuentra a {distancia} kms de tu ubicación</p>:null}
       {distancia === 0? <p>Se encuentra muy cerca de tu ubicación</p>:null}
        <h2 onClick={handleDetail} className={styles.name}>
          {pets.giver}
        </h2>
        { user?.id === pets.GiverId ?
          <select onChange={handleAdopcion} className={stylesSideBar.selectBox} defaultValue={"default"} style={{margin: "20px auto 0 auto", cursor: "pointer"}}>
            <option value="default" disabled>Adoptado por: </option>
            {renderizarSolicitantes(solicitantes)}
          </select>
        :
          null
        }
      </div>
    </div>
  );
}
