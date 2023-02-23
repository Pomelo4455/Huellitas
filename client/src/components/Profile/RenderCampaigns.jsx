import axios from "axios";
import React, { useEffect, useState } from "react";
import Campaña from "../Campaigns/Campaing";
import { LINK_BACK } from "../../Utils/variablesDeploy";
import './RenderCampaings.css'
import styles from "../Home/home.module.css"


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


export default function RenderizarCampaigns({user}) {

    let [campaigns, setCampaigns] = useState([])
    let [more, setMore] = useState(false);
    console.log(campaigns);
    useEffect(() => {
        axios(`${LINK_BACK}/users/${user.id}`)
        .then(data => setCampaigns(data.data.campaigns));
    }, [])

    const handleShowMore = () => {
        setMore(!more)
    } 
    if (campaigns.length > 0) {
    return (
        <>
        <h2 >Campañas</h2>
        {more ? 
          <div className={styles.cards}>
          {renderizarCampaignsCards(campaigns, campaigns.length)}
          </div>
        :
          <div className={styles.cards}>
          {renderizarCampaignsCards(campaigns, 1)}
          </div>
        }
        {more ?
          <button className={styles.claseboton} onClick={handleShowMore}>ʌ</button>
        :
          <button className={styles.claseboton} onClick={handleShowMore}>v</button>
        }
        </>
    )
}
}
