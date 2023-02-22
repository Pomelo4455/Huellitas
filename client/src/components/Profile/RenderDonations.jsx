import axios from "axios";
import React, { useEffect, useState } from "react";
import Donation from "../Donations/Donation";
import { LINK_BACK } from "../../Utils/variablesDeploy";
import { getCampaigns } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import './renderDonations.module.css'
import { Icon } from '@iconify/react'

const renderizarDonationsCards = (donations, campaign, cantidad) => {
    return donations.slice(0, cantidad).map((donation, i) => {
        return (
            <>
            <Donation
                key={donation.id}
                id={donation.id}
                status={donation.status}
                amount={donation.amount}
                campaign={campaign[i].title}
                campaignId={donation.campaignId}
            />
            </>
        );
    });
};

export default function RenderizarDonations({user}) {

    const dispatch = useDispatch()

    let [donations, setDonations] = useState([]);
    let [titleCamp, setTitleCamp] = useState([]);
    let [more, setMore] = useState(false);
    const allCampaigns = useSelector((state) => state.campaigns);

    useEffect(() => {
        dispatch(getCampaigns());
    }, [])

    useEffect(() => {
        axios(`${LINK_BACK}/users/${user.id}`)
        .then(resp => {
            const campaignsId = resp.data.donante.map(donation => donation.campaignId)
            setTitleCamp(campaignsId);
            const data = resp.data.donante;
            setDonations(data)

        });
    }, [])

    const campaign = allCampaigns.filter(camp => titleCamp.includes(camp.id));
    
    const handleShowMore = () => {
        setMore(!more)
    } 
    if (donations?.length > 0) {
        return (
        <>
            <h2>Donaciones: </h2>
        
            <div className="donationsContainer">
                {more ? 
                    <>
                        {renderizarDonationsCards(donations, campaign, donations.length)}
                        <button className="buttonDonationsView" onClick={handleShowMore}><Icon icon="material-symbols:keyboard-double-arrow-left-sharp" /></button>
                    </>
                :
                    <>
                        {renderizarDonationsCards(donations, campaign, 1)}
                        <button className="buttonDonationsView" onClick={handleShowMore}> <Icon icon="material-symbols:keyboard-double-arrow-right" /></button>
                    </>
                }
            </div>
        </>
        )
    }
}