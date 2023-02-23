import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../Card/Card.jsx";
import { LINK_BACK } from "../../Utils/variablesDeploy.js";
import './RenderEnAdopcion.css'
import styles from "../Home/home.module.css"

const renderizarPetCards = (allPets, cantidad) => {
    allPets = allPets.filter(pet => pet.adopted === "no" && pet.deleted === "no")
    return allPets.slice(0, cantidad).map((pet) => {
        return <Card pets={pet} key={pet.id} />
    });
  };

export default function RenderizarEnAdopcion({user}) {

    let [pets, setPets] = useState([])
    let [more, setMore] = useState(false)

    useEffect(() => {
        axios(`${LINK_BACK}/users/${user.id}`)
        .then(data => setPets(data.data.giver));
    }, [])

    const handleShowMore = () => {
        setMore(!more)
    } 

    if (pets.length > 0) {
        return (
            <>
                <h2>EN ADOPCIÓN: </h2>
                {pets.length > 0 && more ? 
                        <div className="containerAdopciones">
                            {renderizarPetCards(pets, pets.length)}
                        </div>
                    :
                        <div className="containerAdopciones">
                            {renderizarPetCards(pets, 1)}
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
    else return null
}
