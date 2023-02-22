import axios from "axios";
import React, { useEffect, useState } from "react";
import Campaña from "../Campaigns/Campaing";
import { LINK_BACK } from "../../Utils/variablesDeploy";
import './RenderCampaings.css'
import { Icon } from '@iconify/react'

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

    useEffect(() => {
        axios(`${LINK_BACK}/users/${user.id}`)
        .then(data => setCampaigns(data.data.campaigns));
    }, [])

    const handleShowMore = () => {
        setMore(!more)
    } 
    if (campaigns.length > 1) {
    return (
        <>
        
        <h2 >Campañas</h2>
        
        <div className="campañascontainer">
        {more ? 
                <>
                {renderizarCampaignsCards(campaigns, campaigns.length)}
                <button className="buttonCamapañasView" onClick={handleShowMore}><Icon icon="material-symbols:keyboard-double-arrow-left-sharp" /></button>
                </>
            :
                <>
                {renderizarCampaignsCards(campaigns, 1)}
                <button className="buttonCamapañasView" onClick={handleShowMore}> <Icon icon="material-symbols:keyboard-double-arrow-right" /></button>
                </>
            }
        </div>
        
        </>
    )
}
}
