import React from "react";
import styles from "./donation.module.css";
import { Link } from "react-router-dom";

const Donation = ({ status, amount, campaign, campaignId }) => {

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.center}>
                    <div className={styles.name}>
                        <h3>Campaña: </h3>
            
                            <p>{campaign}</p>

                        <h3>Monto:</h3>
                        <p> ${amount}</p> 

                        <h3>Estado: </h3>
                        <p>{status}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Donation;