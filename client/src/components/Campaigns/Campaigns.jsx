import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCampaigns } from "../../redux/actions";
import Campaña from "./Campaing";
// import Footer from "../Footer/Footer";
// import NavBar from "../NavBar/NavBar";

import styles from "./campaigns.module.css";

const Campañas = () => {
  const dispatch = useDispatch();
  const allCampaigns = useSelector((state) => state.campaigns);

  useEffect(() => {
    dispatch(getCampaigns());
  }, [dispatch]);

  return (
    <div className={styles.body}>
      {/* <NavBar/> */}
      <div className={styles.container}>
        {allCampaigns
          ? allCampaigns.map((camp) => {
              return (
                <Campaña
                  key={camp.id}
                  id={camp.id}
                  title={camp.title}
                  reason={camp.reason}
                  description={camp.description}
                  image={camp.image}
                  goal={camp.goal}
                />
              );
            })
          : "no hay campañas"}
      </div>
      <Link to={"/home"}>
        <button>Volver</button>
      </Link>
      {/* <Footer/> */}
    </div>
  );
};

export default Campañas;
