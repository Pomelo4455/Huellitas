import axios from "axios";
import React, { useEffect, useState } from "react";
import Campaña from "../Campaigns/Campaing";
const { LINK_BACK } = process.env;

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

    return (
        <>
        <h1>Campañas:</h1>
        <div style={{display: "flex"}}>
        {more ? 
                <>
                {renderizarCampaignsCards(campaigns, campaigns.length)}
                <button onClick={handleShowMore}>VER MENOS</button>
                </>
            :
                <>
                {renderizarCampaignsCards(campaigns, 1)}
                <button onClick={handleShowMore}>VER MAS</button>
                </>
            }
        </div>
        </>
    )
}
