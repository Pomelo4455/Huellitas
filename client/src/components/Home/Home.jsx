import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import BtnHome from "../BtnHome/BtnHome";
import Card from "../Card/Card";

import { getPets } from "../../redux/actions";
// import { pets } from '../../data';

import styles from "./home.module.css";

const Home = () => {
  const dispatch = useDispatch();

  const allPets = useSelector((state) => state.pets);

  useEffect(() => {
    dispatch(getPets());
  }, [dispatch]);

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
        <Link to="/PublicarAdopcion">
        <BtnHome text="Dar en adopcion" />
        </Link>
        <BtnHome text="Donaciones" />
        <BtnHome text="Apoyar una campaña" />
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
