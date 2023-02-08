import React from "react";
import { Link } from "react-router-dom";
import styles from "./campaign.module.css"

const Campaña = ({title, reason, description, image, goal, id }) => {
    return (
        <div className={styles.container}>
            <Link to={`/campañas/${id}`} className={styles.nolink}>
       
        <div className={styles.camp}>
        <div className={styles.circle2}></div>
        <div className={styles.circle1}></div>
        <div className={styles.circle3}></div>
                <h2 >{title}</h2>
                <img src={image} alt={title} className={styles.img}/>
            
                <div>
                    <h3>Motivo:</h3><p> {reason}</p>
                </div>
                <div>
                    <h3>Meta: </h3><p>${goal}</p>
                </div>
                
        </div>
            </Link>
      
        </div>
    )
}
export default Campaña;