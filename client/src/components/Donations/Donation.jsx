import React from "react";
import styles from "./donation.module.css";

const Donation = ({ status, amount, campaign, campaignId }) => {
    console.log({ status: status, amount: amount, campaign: campaign });

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <h3>Campaña: </h3>
                <p>{campaign}</p>
            </div>
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