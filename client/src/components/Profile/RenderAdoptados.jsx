import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../Card/Card.jsx";
import { Icon } from '@iconify/react'
import './RenderAdoptados.css'
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
            <h2 >Adoptados</h2>
            <div style={{display: "flex"}}>
                {more ? 
                    <>
                    {renderizarPetCards(pets, pets.length)}
                    <button onClick={handleShowMore} className="Buttonshowadoption"><Icon icon="material-symbols:keyboard-double-arrow-left-sharp" /></button>
                    </>
                :
                    <>
                    {renderizarPetCards(pets, 1)}
                    <button onClick={handleShowMore} className="Buttonshowadoption"><Icon icon="material-symbols:keyboard-double-arrow-right" /></button>
                    </>
                }
            </div>

            </>
        )
    }
    else return null
}

