import React from "react";
import { Link } from "react-router-dom";

const Fundation = ({ fundacion }) => {
    return (
        <div>
            <div>
            <Link to={'/:any'}>
                <img src={fundacion.image} alt={fundacion.name} />
                <h1>{fundacion.name}</h1>
                <h2>{fundacion.address}</h2>
            </Link>
            </div>
        </div>
    );
}

export default Fundation;
