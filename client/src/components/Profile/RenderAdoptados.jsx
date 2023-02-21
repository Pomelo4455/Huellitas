import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../Card/Card.jsx";


const renderizarPetCards = (allPets, cantidad) => {
    return allPets.slice(0, cantidad).map((pet) => {
      return <Card pets={pet} key={pet.id} />;
    });
  };

export default function RenderizarEnAdopcion({user}) {

    let [pets, setPets] = useState([])
    let [more, setMore] = useState(false)

    useEffect(() => {
        axios(`http://localhost:3001/users/${user.id}`)
        .then(data => setPets(data.data.adoptante));
    }, [])

    const handleShowMore = () => {
        setMore(!more)
    } 
    if (pets.length > 0) {
        return (
            <>
            <h1>Adoptados:</h1>
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

