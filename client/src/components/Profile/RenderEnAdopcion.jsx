import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../Card/Card.jsx";
import { LINK_BACK } from "../../Utils/variablesDeploy.js";
import './RenderEnAdopcion.css'
import { Icon } from '@iconify/react'

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
        .then(data => setPets(data.data.giver));
    }, [])

    const handleShowMore = () => {
        setMore(!more)
    } 

    if (pets.length > 0) {
        return (
            <>
            <h2>En adopcion</h2>
            {pets.length > 0 && 
            <div className="containerAdopciones">
                {more ? 
                    <>
                    {renderizarPetCards(pets, pets.length)}
                    <button className="buttonViewMore" onClick={handleShowMore}><Icon icon="material-symbols:keyboard-double-arrow-left-sharp" /></button>
                    </>
                :
                    <>
                    {renderizarPetCards(pets, 1)}
                    <button className="buttonViewMore" onClick={handleShowMore}><Icon icon="material-symbols:keyboard-double-arrow-right" /></button>
                    </>
                }
            </div>
        }
            </>

        )
    }
    else return null
}
