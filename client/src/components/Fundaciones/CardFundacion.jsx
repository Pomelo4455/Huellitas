import React from "react";
import { Link } from "react-router-dom";
import styles from './cardFund.module.css';

const Fundation = ({ fundacion }) => {
    return (
        <div className={styles.card}>
            <Link to={'/:any'} className={styles.link_detail}>
                <div className={styles.center}>
                    <img src={fundacion.image} alt={fundacion.name} className={styles.img} />
                    <h1 className={styles.name}>{fundacion.name}</h1>
                    <h3 className={styles.name}>{fundacion.address}</h3>
                </div>
                
            </Link>
        </div>
    );
}

export default Fundation;
