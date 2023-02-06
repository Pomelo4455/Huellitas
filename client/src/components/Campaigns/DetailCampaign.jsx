import React, { useEffect } from "react";
import { getDetailCamp } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";

import style from "./campaigns.module.css";

const Detail = (props) => {
    const dispatch = useDispatch();
    const campaignId = useSelector(state => state.detailCamp);
    console.log(campaignId)
    const { id } = useParams();


    useEffect(() => {
        console.log(id)
        dispatch(getDetailCamp(id));
    }, [dispatch])

    return (
        <div className={style.containerDetailCampaign}>
            <NavBar/>
            {
                campaignId.length !== 0 ?
                <div className={style.campaignContainer}>

                    <div className={style.titleCampaign}>
                        <h1>{campaignId[0].title}</h1>
                    </div>

                    <div className={style.detailInfoCampaign}>
                        <img src={campaignId[0].image} alt={campaignId[0].id} width='250px' height='250px'/>
                        
                        <div className={style.infoCampaign}>
                            <div className={style.goalCampaign}>
                                <h3>Meta: {campaignId[0].goal}</h3> 
                            </div>

                            <div className={style.descriptionCampaign}>
                                <h3>Descripción: {campaignId[0].description}</h3> 
                            </div>

                            <div className={style.btnsCampaign}>
                                <Link to={"/:any"}>
                                    <button className={style.btnPay}>Donar</button>
                                </Link>
                                <Link to={'/campañas'}>
                                    <button className={style.btnBack}>Volver</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                : <h2>Loading...</h2>
            }

            <Footer/>
        </div>
    )
}

export default Detail;