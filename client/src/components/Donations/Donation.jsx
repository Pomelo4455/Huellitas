import React from "react";
import styles from "./donation.module.css";
import { Link } from "react-router-dom";

const Donation = ({ status, amount, campaign, campaignId }) => {

    return (
        <div className={styles.container}>
            <Link to={`/campañas/${campaignId}`}>
                <div className={styles.title}>
                    <h3>Campaña: </h3>
                    <p>{campaign}</p>
                </div>
            </Link>
            
            <div className={styles.title}>
                <h3>Monto:</h3>
                <p> ${amount}</p>
            </div>
            <div className={styles.title}>
                <h3>Estado: </h3>
                <p>{status}</p>
            </div>
        </div>
    );
};
export default Donation;