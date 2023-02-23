import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../Card/Card.jsx";
import { Icon } from '@iconify/react'
import './RenderEnAdopcion.css'
import styles from "../Home/home.module.css"
import { LINK_BACK } from "../../Utils/variablesDeploy.js";

const renderizarPetCards = (allPets, cantidad) => {
    return allPets.slice(0, cantidad).map((pet) => {
      return <Card pets={pet} key={pet.id} />;
    });
  };

export default function RenderizarEnAdopcion({user}) {

    let [pets, setPets] = useState([])
    let [more, setMore] = useState(false)

    useEffect(() => {
        axios(`${LINK_BACK}/users/${user.id}`)
        .then(data => setPets(data.data.adoptante));
    }, [])

    const handleShowMore = () => {
        setMore(!more)
    } 
    if (pets.length > 0) {
        return (
            <>
            <h2 >ADOPTADOS: </h2>
                {more ? 
                    <div className="containerAdopciones">
                        {renderizarPetCards(pets, pets.length)}
                    </div>
                :
                    <div className="containerAdopciones">
                        {renderizarPetCards(pets, 1)}
                    </div>
                }
                {more ?
                    <button onClick={handleShowMore} className={styles.claseboton}>ʌ</button>
                :
                    <button onClick={handleShowMore} className={styles.claseboton}>v</button>
                }
            </>
        )
    }
    else return null
}

