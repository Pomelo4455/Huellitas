import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import BtnHome from "../BtnHome/BtnHome";
import Card from "../Card/Card";
import CardFundacion from "../Card/CardFundacion";
import { getPets, getCampaigns, getFundaciones, setCurrentPage } from "../../redux/actions";
import swal from "sweetalert";
import { useAuth0 } from "@auth0/auth0-react";
import Landing from "../Landing/Landing";
import Chat from "../Chat/Chat";
import Campaign from "../Campaigns/Campaing.jsx";
import AOS from "aos";
import "aos/dist/aos.css";
import RenderCampaigns from "./RenderCampaigns";
import RenderPets from "./RenderPets";
import RenderFoundations from "./RenderFoundations";

import styles from "./home.module.css";
import RenderReviews from "./RenderReviews";

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const profile = useSelector((state) => state.profile);
    const isAuth = useSelector((state) => state.is_authenticated);
    const [userLocation, setLocation] = useState({ lat: 0, lng: 0 });
    const { loginWithPopup } = useAuth0();
    let user = JSON.parse(window.localStorage.getItem("loggedUser"));

    useEffect(() => {
        dispatch(getPets());
        dispatch(getCampaigns());
        dispatch(getFundaciones());
        dispatch(setCurrentPage(1))
    }, [dispatch]);
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);
    useEffect(() => {}, [profile]);

    const handleOnClick = (e) => {
        e.preventDefault();
        if (user?.data?.id) navigate("/PublicarAdopcion");
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
          <div className={styles.landingInHome}>
              <Landing />
                <div className={styles.imagesLanding}>
                    <div className={styles.img1}></div>
                    <div className={styles.Banner}></div>
                    <div className={styles.Circle2}></div>
                    <div className={styles.Circle3}></div>
                </div>
          </div>
          <div className={styles.btnS}>
                <Link 
                    to="/Adoptar"
                    className={styles.btnLanding}
                >
                  <BtnHome text="Adoptar" />
                </Link>

                <div 
                    onClick={handleOnClick}
                    className={styles.btnLanding}
                >
                    <BtnHome text="Dar en adopcion" />
                </div>

                <Link 
                    to={"/campañas"}
                    className={styles.btnLanding}
                >
                    <BtnHome text="Ver campañas" />
                </Link>

                {user?.data?.type === "fundacion" || user?.data?.type === "admin" ? 
                (
                    <Link 
                        to={"/PublicarCampaña"}
                        className={styles.btnLanding}
                    >
                        <BtnHome text="Publicar una campaña" />
                    </Link>
                ) : null}
          </div>
          <RenderPets />
          <RenderCampaigns />
          <RenderFoundations />
          <RenderReviews />
      </div>
    );
};

export default Home;
