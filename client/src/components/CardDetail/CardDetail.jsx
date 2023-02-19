import React from "react";
import { useEffect } from "react";
import { Link, redirect, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// import Footer from "../Footer/Footer";
// import NavBar from "../NavBar/NavBar";
import { getPetsDetail, getThisUser, getUsers } from "../../redux/actions";
import style from "./cardDetail.module.css";
import axios from "axios";
import swal from "sweetalert";
import MapView from "../MapView/MapView";

const CardDetail = () => {
  const dispatch = useDispatch();
  const pet = useSelector((state) => state.pet);
  const navigate = useNavigate();
  //const user = useSelector((state) => state.thisUser);
  const allUsers = useSelector((state) => state.users);
  const { id } = useParams();

  const giver = allUsers.filter(user => pet.userId === user.id);
  const latitude = giver[0]?.latitude;
  const longitude = giver[0]?.longitude;

  useEffect(() => {
    dispatch(getUsers())
    dispatch(getPetsDetail(id));
    //dispatch(getThisUser(15));
  }, [dispatch, id]);

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
              .post("http://localhost:3001/mails", {
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
            console.log("entre");
            navigate(`../chat/${userId}/${pet.userId}`);
            break;
          default:
        }
      });
    } catch (error) {
      swal(
        "No es posible contactarse con el dueño de la mascota.",
        "Debe registrarse para poder hacerlo.",
        "error"
      );
    }
  };

  return (
    <>
      {/* <NavBar /> */}
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
          <Link to={`../userDetail/${pet.userId}`} style={{textDecoration:"none"}}>
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
        {console.log(pet)}
        <div className={style.detailDescription}>
          <div className={style.descriptionContainer}>
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
        </div>
      </div>
      {console.log(giver[0])}
      <MapView latitude={latitude} longitude={longitude}/>
      {/* <Footer /> */}
    </>
  );
};

export default CardDetail;
