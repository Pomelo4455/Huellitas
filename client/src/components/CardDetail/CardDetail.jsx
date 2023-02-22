import React from "react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPetsDetail, getUsers, resetPetDetail } from "../../redux/actions";
import style from "./cardDetail.module.css";
import axios from "axios";
import swal from "sweetalert";
import MapView from "../MapView/MapView";
import { LINK_BACK } from "../../Utils/variablesDeploy";
import { useAuth0 } from "@auth0/auth0-react";

const CardDetail = () => {
  const mapRef = useRef();
  const dispatch = useDispatch();
  const pet = useSelector((state) => state.pet);
  const navigate = useNavigate();
  const allUsers = useSelector((state) => state.users);
  const { id } = useParams();
  const { loginWithPopup } = useAuth0();
  let [seguido, setSeguido] = useState(false);
  const giver = allUsers.filter((user) => pet.userId === user.id);
  const latitude = giver[0]?.latitude;
  const longitude = giver[0]?.longitude;
  let user = JSON.parse(window.localStorage.getItem("loggedUser"))?.data;

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getPetsDetail(id));
    if (user?.id && pet?.id) {
      axios(`${LINK_BACK}/follow/${user.id}/${pet.id}`).then((data) =>
        setSeguido(data.data.seguir)
      );
    }

    return () => {
      dispatch(resetPetDetail());
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (user?.id && pet?.id) {
      axios(`${LINK_BACK}/follow/${user.id}/${pet.id}`).then((data) =>
        setSeguido(data.data.seguir)
      );
    }
  }, [pet]);

  const handleFollow = () => {
    if (user?.id && pet?.id) {
      setSeguido(!seguido);
      axios.put(
        `${LINK_BACK}/follow?userId=${user.id}&petId=${
          pet.id
        }&seguir=${!seguido}`
      );
    } else {
      swal("Inicia sesion para escoger favoritos", "", "error")
      .then(() => loginWithPopup());
    }
  };

  const handleSendMail = async () => {
    try {
    const userLocalStorage = JSON.parse(localStorage.getItem("loggedUser"));
    const userId = userLocalStorage.data.id;
    swal("¿Cómo desea contactarse?", {
      buttons: {
        email: {
          text: "Email",
          value: "email",
        },
        chat: {
          text: "Chat en vivo",
          value: "chat",
        },
      },
    }).then((value) => {
      switch (value) {
        case "email":
          axios
            .post(`${LINK_BACK}/mails`, {
              idUser: userId,
              idGiver: pet.userId,
              idPet: pet.id,
            })
            .then(() => {
              swal(
                "Enviado.",
                "Se ha informado su interés hacia la mascota.",
                "success"
              );
            });
          break;
        case "chat":
          navigate(`../chat/${userId}/${pet.userId}`);
          break;
        default:
      }
    }).then(()=>{
      axios.post(`http://localhost:3001/adoption/solicitud/${userId}/${pet.id}`)
    })
    } catch (error) {
      swal(
        "No es posible contactarse con el dueño de la mascota.",
        "Debe registrarse para poder hacerlo.",
        "error"
      ).then(() => loginWithPopup());
    }
  };

  return (
    <>
      <div className={style.detailContainer}>
        <div className={style.detailInformation}>
          <div className={style.petName}>
            <h2>{pet.name}</h2>
          </div>
          <div className={style.petImage}>
            <img src={pet.image} alt={`Imagen de ${pet.name}`} />
          </div>
          <div className={style.btnContainer}>
            <button onClick={handleSendMail} className={style.btnContact}>
              CONTACTAR
            </button>
          </div>
          <Link
            to={`../userDetail/${pet.userId}`}
            style={{ textDecoration: "none" }}
          >
            <div className={style.btnContainer}>
              <button className={style.btnContactBack}>DADOR</button>
            </div>
          </Link>
          <div className={style.btnContainer}>
            <button
              onClick={() => window.history.back()}
              className={style.btnContactBack}
            >
              VOLVER
            </button>
          </div>
        </div>

        <div className={style.detailDescription}>
          <div className={style.descriptionContainer}>
            <div className={style.text}>
              <p>
                <span>Nombre:</span> {pet.name}
              </p>
              <p>
                <span>Edad:</span> {pet.age}
              </p>
              <p>
                <span>Tamaño:</span> {pet.size}
              </p>
              <p>
                <span>Color:</span> {pet.color}
              </p>
              <p>
                <span>Descripcion:</span> {pet.temperament}
              </p>
            </div>
            <div className={style.favs}>
              {seguido ? (
                <button onClick={handleFollow} className={style.corazonFollow}>
                  ❤
                </button>
              ) : (
                <button
                  onClick={handleFollow}
                  className={style.corazonUnfollow}
                >
                  ♡
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={style.mapa}>
        {latitude && longitude ? (
          <MapView latitude={latitude} longitude={longitude} />
        ) : null}
      </div>
    </>
  );
};

export default CardDetail;
