import React, { useEffect } from "react";
import { getDetailCamp } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";

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
        <div>
            <NavBar/>
            {
                campaignId.length !== 0 ?
                <div>
                    <div>
                    <h3>Meta: {campaignId[0].goal}</h3> 
                    </div>
                    <div>
                        <h1>{campaignId[0].title}</h1>
                    </div>

                    <img src={campaignId[0].image} alt={campaignId[0].id} width='250px' height='250px'/>

                    <div>
                        <h3>Descripción: {campaignId[0].description}</h3> 
                    </div>
                </div>
                : <h2>Loading...</h2>
            }
            <Link to={"/:any"}>
                <button>Donar</button>
            </Link>
            <Link to={'/campañas'}>
                <button>Volver</button>
            </Link>
            <Footer/>
        </div>
    )
}

export default Detail;