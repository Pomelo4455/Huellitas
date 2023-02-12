import React from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

import styles from "./footer.module.css";
import swal from "sweetalert";

function Footer() {

  let user = JSON.parse(window.localStorage.getItem("loggedUser"));

  const handleContact = () => {
    swal({
      title: "No es posible contactarse.",
      text: "Debe iniciar sesión para hacerlo.",
      icon: "info",
      button: "Ok",
    });
  }

  return (
    <div className={styles.footer}>
      <div className={styles.box}>
        <Link to={"/home"} className={styles.texts}>
          <h4 className={styles.texts}>Home</h4>
        </Link>
        <Link to={"/sobreNosotros"} className={styles.texts}>
          <h4 className={styles.texts}>Sobre Nosotros</h4>
        </Link>
        {
        user?.data?.id ?
          <Link to={`/chat/${user.data.id}/1`} className={styles.texts}>
            <h4 className={styles.texts}>Contactanos</h4>
          </Link> :
          <h4 onClick={handleContact} className={styles.texts} style={{cursor:"pointer"}}>Contactanos</h4>
        }
      </div>
      <div className={styles.box}>
        <figure>
            {
            user?.data?.type === "admin" ?
            <Link to={"/DashBoardAdm"} >
              <Icon className={styles.feeticon} icon="dashicons:admin-generic" />
            </Link> : 
            <Icon className={styles.feeticon} icon="material-symbols:pets"  />
            }
        </figure>
      </div>
      <div className={styles.box1}>
        <div className={styles.box1Icons}>
          <a
            href={"https://www.instagram.com/huellitaswebpets/"}
            target="_blank"
            rel="noreferrer"
          >
            <Icon className={styles.iconSocial} icon="mdi:instagram" />
          </a>
          <a
            href={"https://twitter.com/huellitasweb"}
            target="_blank"
            rel="noreferrer"
          >
            <Icon className={styles.iconSocial} icon="mdi:twitter" />
          </a>
          <Link to={"/:any"}>
            <Icon className={styles.iconSocial} icon="ic:baseline-facebook" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
