import React, { useState } from "react";
// import CardHome from "./CardHome";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Campaña from "../Campaigns/Campaing";

import styles from "./home.module.css";

const renderizarCampaignsCards = (allCampaigns, cantidad) => {
  return allCampaigns.slice(0, cantidad).map((camp) => {
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
  });
};

export default function RenderCampaigns() {
  const allCampaigns = useSelector((state) => state.campaigns);
  const [more, setMore] = useState({
    pet: false,
    fundacion: false,
    campaign: false,
  });
  return (
    <>
      <div data-aos="fade-up" className={styles.cards}>
        {more.campaign ? (
          <>{renderizarCampaignsCards(allCampaigns, 6)}</>
        ) : (
          <>{renderizarCampaignsCards(allCampaigns, 3)}</>
        )}
      </div>
      <div data-aos="fade-up" className={styles.cards}>
        {more.campaign ? (
          <>
            <button
              className={styles.claseboton}
              onClick={() => setMore({ ...more, campaign: false })}
            >
              VER MENOS
            </button>
            <button className={styles.claseboton}>
              <Link to="/campañas" className={styles.linkText}>
                VER TODOS
              </Link>
            </button>
          </>
        ) : (
          <>
            <button
              className={styles.claseboton}
              onClick={() => setMore({ ...more, campaign: true })}
            >
              VER MAS
            </button>
          </>
        )}
      </div>
    </>
  );
}
