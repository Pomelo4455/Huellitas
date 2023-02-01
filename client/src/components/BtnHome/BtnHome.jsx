import React from 'react';
import styles from './btnHome.module.css';

const BtnHome = ({ text }) => {
  return (
    <>
        <button className={styles.btnHome}>
            {text}
        </button>   
    </>
  )
}

export default BtnHome;