import React from 'react';
import styles from './btnBlack.module.css';

const BtnBlack = ({ text }) => {
  return (
    <>
        <button className={styles.btnBlack}>
            {text}
        </button>   
    </>
  )
}

export default BtnBlack;