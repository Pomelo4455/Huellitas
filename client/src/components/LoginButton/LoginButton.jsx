import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./LoginButton.module.css"

const LoginButton= ()=>{
    const {loginWithPopup}=useAuth0();
    return(
        <>
            <button className={styles.button} onClick={()=>loginWithPopup()}>INICIAR SESION</button>
        </>
    )
};

export default LoginButton