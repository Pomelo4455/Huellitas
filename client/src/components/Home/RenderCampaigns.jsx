import React, { useState } from "react";
import styles from "./home.module.css";
import CardHome from "./CardHome";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const renderizarCampaignsCards = (allCampaigns, cantidad) => {
  return allCampaigns.slice(0, cantidad).map((camp) => {
    return (
      <CardHome image={camp.image} title={camp.title} subtitle={camp.reason} />
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
