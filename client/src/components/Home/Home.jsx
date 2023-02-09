import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import BtnHome from "../BtnHome/BtnHome";
import Card from "../Card/Card";
import CardFundacion from "../Card/CardFundacion";
import { getPets, getCampaigns, getFundaciones } from "../../redux/actions";
import swal from "sweetalert";
import { useAuth0 } from "@auth0/auth0-react";
import Landing from "../Landing/Landing";
import styles from "./home.module.css";
import Chat from "../Chat/Chat";
import Campaign from "../Campaigns/Campaing.jsx"

import AOS from 'aos';
import 'aos/dist/aos.css';

const renderizarPetCards = (allPets, cantidad) => {
  return allPets.slice(0, cantidad).map((pet) => {
    return <Card pets={pet} key={pet.id} />;
  })
}

const renderizarCampaignsCards = (allCampaigns, cantidad) => {
  return allCampaigns.slice(0, cantidad).map((camp) => {
    return <Campaign
      key={camp.id}
      id={camp.id}
      title={camp.title}
      reason={camp.reason}
      description={camp.description}
      image={camp.image}
      goal={camp.goal}
    />
  })
}
// agregar card de fundacion en el return pasando por props los argumentos necesarios
const renderizarFundacionesCards = (allFundaciones, cantidad) => {
  return allFundaciones.slice(0, cantidad).map((fund) => {
    return (
      <CardFundacion fundacion ={fund}/>
    )
  })
}

const Home = () => {
  const [more, setMore] = useState({pet: false, fundacion: false, campaign: false})
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allPets = useSelector((state) => state.pets);
  const allCampaigns = useSelector((state => state.campaigns));
  const allFundaciones = useSelector(state => state.fundaciones);
  const profile = useSelector(state => state.profile);
  const isAuth = useSelector((state) => state.is_authenticated);
  const [userLocation, setLocation] = useState({lat: '', lng: ''});
  const { loginWithPopup } = useAuth0();

  useEffect(() => {
    //if (navigator.geolocation) {
    //  navigator.geolocation.getCurrentPosition(
  //      ({coords: [latitude, longitude]}) => {
//          setLocation({
            //lat: latitude,
            //lng: longitude
          //});
        //},
      //  (error) => {
    //      console.log(error);
  //      }
//      )
    //}
    //else {
      //return 'no tenés geolocalización'
    //}
    
      dispatch(getPets());
      dispatch(getCampaigns());
      dispatch(getFundaciones());
  }, [dispatch]);
      useEffect(() => {
    AOS.init();
  }, [])
  useEffect (() => {

  }, [profile]);

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
  
  //<Link to={{pathname: '/map', state: userLocation}}>Geolocalización</Link>
  return (
    <div className={styles.home}>
      <div className={styles.navEnHome}>
        <NavBar />
      </div>
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
        {
          JSON.parse(localStorage.getItem("loggedUser"))?.data?.type === "fundacion" ? 
          <Link to={'/PublicarCampaña'}>
            <BtnHome text="Publicar una campaña" />
          </Link> : 
          null
        }
      </div>

      <div data-aos="fade-up" className={styles.cards}>
        {more.pet ? 
          <>
            {renderizarPetCards(allPets, 6)}
          </> : 
          <>
            {renderizarPetCards(allPets, 3)}
          </>
        }
      </div>
      <div data-aos="fade-up" className={styles.cards}>
        {more.pet ? 
            <>
              <button className={styles.claseboton} onClick={() => setMore({...more, pet: false})}>VER MENOS</button>
            </> : 
            <>
              <button className={styles.claseboton} onClick={() => setMore({...more, pet: true})}>VER MAS</button>
            </>
        }
      </div>
      <div data-aos="fade-up" className={styles.cards}>
        {more.campaign ? 
          <>
            {renderizarCampaignsCards(allCampaigns, 3)}
          </> : 
          <>
            {renderizarCampaignsCards(allCampaigns, 1)}
          </>
        }
      </div>
      <div className={styles.cards}>
      {more.campaign ? 
          <>
            <button className={styles.claseboton} onClick={() => setMore({...more, campaign: false})}>VER MENOS</button>
          </> : 
          <>
            <button className={styles.claseboton} onClick={() => setMore({...more, campaign: true})}>VER MAS</button>
          </>
        }
      </div>
      
      <div data-aos="fade-up" className={styles.cards}>
        {more.fundacion ? 
          <>
            {renderizarFundacionesCards(allFundaciones, 6)}
          </> : 
          <>
            {renderizarFundacionesCards(allFundaciones, 1)}
          </>
        }
      <div className={styles.cards}>
        {more.fundacion ? 
            <>
              <button className={styles.claseboton} onClick={() => setMore({...more, fundacion: false})}>VER MENOS</button>
            </> : 
            <>
              <button className={styles.claseboton} onClick={() => setMore({...more, fundacion: true})}>VER MAS</button>
            </>
          }
      </div>
      </div>
      {/* <Chat /> */}
      <Footer />
    </div>
  );
};

export default Home;
