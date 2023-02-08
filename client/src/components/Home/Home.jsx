import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import BtnHome from "../BtnHome/BtnHome";
import Card from "../Card/Card";
import { getPets } from "../../redux/actions";
import swal from "sweetalert";
import { useAuth0 } from "@auth0/auth0-react";

import styles from "./home.module.css";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allPets = useSelector((state) => state.pets);
  const isAuth = useSelector((state) => state.is_authenticated);
  const { loginWithPopup } = useAuth0();
  useEffect(() => {
    dispatch(getPets());
  }, [dispatch]);

  const handleOnClick = (e) => {
    e.preventDefault();
    if (isAuth) navigate("/PublicarAdopcion");
    else {
      swal({
        title: "Sorry!",
        text: "Inicia sesión en tu cuenta para poder procesar la adopción",
        icon: "warning",
        button: "Ok",
      }).then(() => loginWithPopup());
    }
  };

  return (
    <div className={styles.home}>
      <NavBar />
      <div className={styles.presentation}>
        <div className={styles.title}>
          <h1>Cada patita cuenta</h1>
        </div>

        <div className={styles.description}>
          <h4>
            ¡Hola! Acá vas a poder encontrar a tu mejor amigo, ayudar a refugios
            realizando donaciones, u ofrecer en adopción al mejor amigo de quien
            tenga la suerte de adoptarlo. ¡Ayudanos a ayudarlos!
          </h4>
        </div>
      </div>

      <div className={styles.btnS}>
        <Link to="/Adoptar">
          <BtnHome text="Adoptar" />
        </Link>
        <button className={styles.button} onClick={handleOnClick}>
          Dar en adopcion
        </button>

        <Link to={"/campañas"}>
          <BtnHome text="Ver campañas" />
        </Link>
        {/* <Link to={'/PublicarCampaña'}>
          <BtnHome text="Apoyar una campaña" />
        </Link> */}
      </div>

      <div className={styles.cards}>
        {/* reemplazar tarjetas por una sola cuando este la logica resuelta */}
        {allPets?.slice(0, 3).map((pet) => {
          // console.log(pet.name)
          return <Card pets={pet} key={pet.id} />;
        })}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
