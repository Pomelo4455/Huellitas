import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./LogoutButton.module.css"

const LogoutButton= ()=>{
    const {logout}=useAuth0();
    return(
        <>
            <button className={styles.button} onClick={()=>logout({returnTo:window.location.origin})}>CERRAR SESION</button>
        </>
    )
};

export default LogoutButton