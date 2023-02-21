import React, { useEffect, useState } from "react";
import styles from "./card.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { LINK_BACK } from "../../Utils/variablesDeploy";
import { useAuth0 } from "@auth0/auth0-react";

export default function Card({ pets, distancia }) {
  let user = JSON.parse(window.localStorage.getItem("loggedUser"))?.data;
  let [seguido, setSeguido] = useState(false);
  const navigate = useNavigate();
  const { loginWithPopup } = useAuth0();

  useEffect(() => {
   
    if (user?.id && pets?.id) {
      axios(`${LINK_BACK}/follow/${user.id}/${pets.id}`).then((data) =>
        setSeguido(data.data.seguir)
      );
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
  
  return (
    <div key={pets.id} className={styles.card}>
      <div className={styles.center}>
        {seguido ? (
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
      </div>
    </div>
  );
}
