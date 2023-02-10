import React from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// import Footer from "../Footer/Footer";
// import NavBar from "../NavBar/NavBar";
import { getPetsDetail } from "../../redux/actions";
import style from "./cardDetail.module.css";
import axios from "axios";
import swal from "sweetalert";
import MapView from "../MapView/MapView";

const CardDetail = () => {

  const dispatch = useDispatch();
  const pet = useSelector(state => state.pet);
  
  const { id } = useParams();

  useEffect(()=> {
    dispatch(getPetsDetail(id))
  },[dispatch, id])
  
  const handleSendMail = async () => {
    try {
      // idUser seria el id del que adopta y lo sacariamos del login que hicieron naza y adri.
      const userLocalStorage = JSON.parse(localStorage.getItem("loggedUser"));
      const userId = userLocalStorage.data.id;
      await axios.post("http://localhost:3001/mails", { "idUser" : userId, "idGiver" : pet.userId, "idPet" : pet.id })
      swal("Enviado.", "Se ha informado su interés hacia la mascota.", "success");
    }
    catch(err) {
      swal("No enviado.", "No se ha podido informado su interés hacia la mascota.", "error");
    }
  }

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
            <button onClick={handleSendMail} className={style.btnContact}>CONTACTAR</button>
          </div>
          <div className={style.btnContainer}>
            <button onClick={() => window.history.back()} className={style.btnContactBack}>VOLVER</button>
          </div>
        </div>

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
            <p><span>Descripcion:</span> {pet.temperament}</p>
          </div>
        </div>
      </div>
      {/*<MapView/>*/}
      {/* <Footer /> */}
    </>
  );
};

export default CardDetail;
