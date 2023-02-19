import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./navBar.module.css";
import { useNavigate } from "react-router-dom";


export default function RenderFavorites() {

    let [favorites, setFavorites] = useState([])
    let user = JSON.parse(window.localStorage.getItem("loggedUser"))?.data;
    let navigate = useNavigate();
    let [more, setMore] = useState(false);

    useEffect(() => {
        if (user?.id) {
            axios(`http://localhost:3001/follow?userId=${user.id}`)
            .then(data => setFavorites(data.data.splice(0,3)))
        }
    },[])

    const handleShowMore = () => {
        setMore(!more)
        if (!more && user?.id) {
            axios(`http://localhost:3001/follow?userId=${user.id}`)
            .then(data => setFavorites(data.data))
        }
        else if (user?.id) {
            axios(`http://localhost:3001/follow?userId=${user.id}`)
            .then(data => setFavorites(data.data.splice(0,3)))
        }
    }

    return(
        <div className={styles.listFavorites}>
            {
                favorites.length <= 0 ?
                    <h3 style={{color:"white", textAlign: "center"}}>No tienes favoritos</h3>
                :
                    <div style={{display:"flex", justifyContent:"center", alignItems: "center", textAlign:"center", margin: "10px 0px 10px 0px"}}>
                        <div>
                            {favorites.map((pet, i) => {
                                pet = pet.seguido;
                                return (
                                    <div onClick={() => navigate(`/detail/${pet.id}`)} key={i} className={styles.petInList}>
                                        <img src={pet.image} alt="nf" style={{margin:"0px", width:"30px", height:"30px"}} />
                                        <div>
                                            <div> nombre: {pet.name}</div>
                                            <div>  adoptado: {pet.adopted}</div>
                                        </div>
                                        
                                    </div>
                                )
                            })}
                            {
                                more ?
                                <button onClick={handleShowMore} className={styles.buttonEdit}>Ver menos</button>
                                :
                                <button onClick={handleShowMore} className={styles.buttonEdit}>Ver mas</button>
                            }
                        </div>
                    </div>
            }
        </div>
    )
}