import React from "react";
import { Link } from "react-router-dom";

const Campaña = ({title, reason, description, image, goal, id }) => {
    return (
        <div>
            <Link to={`/campañas/${id}`}>
                <h2>{title}</h2>
                <img src={image} alt={title} width='250px' height='250px'/>
            </Link>
                <div>
                    <h3>Motivo: {reason}</h3>
                </div>
                <div>
                    <h3>Meta: {goal}</h3>
                </div>
        </div>
    )
}
export default Campaña;