import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import Footer from "../Footer/Footer";
// import NavBar from "../NavBar/NavBar";
import BtnHome from "../BtnHome/BtnHome";
import Card from "../Card/Card";
import CardFundacion from "../Card/CardFundacion";
import { getPets, getCampaigns, getFundaciones } from "../../redux/actions";
import swal from "sweetalert";
import { useAuth0 } from "@auth0/auth0-react";
import Landing from "../Landing/Landing";
import styles from "./home.module.css";
import Chat from "../Chat/Chat";
import Campaign from "../Campaigns/Campaing.jsx";
// import CardHome from "./CardHome";
import AOS from "aos";
import "aos/dist/aos.css";
import RenderCampaigns from "./RenderCampaigns";
import RenderPets from "./RenderPets";
import RenderFoundations from "./RenderFoundations";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector((state) => state.profile);
  const isAuth = useSelector((state) => state.is_authenticated);
  const [userLocation, setLocation] = useState({ lat: 0, lng: 0 });
  const { loginWithPopup } = useAuth0();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position.coords.latitude, position.coords.longitude);
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      return "no tenés geolocalización";
    }

    dispatch(getPets());
    dispatch(getCampaigns());
    dispatch(getFundaciones());
  }, [dispatch]);
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  useEffect(() => {}, [profile]);

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
      {/*<Link to={'/detail/1'} state={{userLocation}}><button>Geolocalización</button></Link>*/}
      <div className={styles.landingInHome}>
        <Landing />
        <div className={styles.img1}></div>
        <div className={styles.Banner}></div>
        {/*         <div className={styles.Circle}></div> */}
        <div className={styles.Circle2}></div>
        <div className={styles.Circle3}></div>
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
        {JSON.parse(localStorage.getItem("loggedUser"))?.data?.type ===
        "fundacion" ? (
          <Link to={"/PublicarCampaña"}>
            <BtnHome text="Publicar una campaña" />
          </Link>
        ) : null}
      </div>
      <div data-aos="fade-up" className={styles.categoria}>
        ¡Amiguitos!
      </div>
      <RenderPets />
      <div data-aos="fade-up" className={styles.categoria}>
        ¡Campañas!
      </div>
      <RenderCampaigns />
      <div data-aos="fade-up" className={styles.categoria}>
        ¡Fundaciones!
      </div>
      <RenderFoundations />
      <Chat />
    </div>
  );
};

export default Home;
