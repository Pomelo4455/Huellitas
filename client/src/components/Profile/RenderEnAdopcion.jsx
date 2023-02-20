import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../Card/Card.jsx";
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
        .then(data => setPets(data.data.giver));
    }, [])

    const handleShowMore = () => {
        setMore(!more)
    } 

    if (pets.length > 0) {
        return (
            <>
            <h1>En adopcion:</h1>
            <div style={{display: "flex"}}>
                {more ? 
                    <>
                    {renderizarPetCards(pets, pets.length)}
                    <button onClick={handleShowMore}>VER MENOS</button>
                    </>
                :
                    <>
                    {renderizarPetCards(pets, 1)}
                    <button onClick={handleShowMore}>VER MAS</button>
                    </>
                }
            </div>

            </>
        )
    }
    else return null
}
