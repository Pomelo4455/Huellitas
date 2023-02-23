import React from "react";
import styles from "./donation.module.css";
import { Link } from "react-router-dom";

const Donation = ({ status, amount, campaign, campaignId }) => {
    console.log({ status: status, amount: amount, campaign: campaign, campaignId: campaignId });

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.center}>
                    <div className={styles.name}>
                        <h3>Campaña: </h3>
            
                        <Link to={`/campañas/${campaignId}`} className={styles.link_detail}>
                            <p>{campaign}</p>

                        <h3>Monto:</h3>
                        <p> ${amount}</p> 

                        <h3>Estado: </h3>
                        <p>{status}</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Donation;