import React from "react";
import { Icon } from "@iconify/react";
import styles from "./footer.module.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.box}>
        <Link to={"/home"} className={styles.texts}>
          <h4 className={styles.texts}>Home</h4>
        </Link>
        <Link to={"/sobreNosotros"} className={styles.texts}>
          <h4 className={styles.texts}>Sobre Nosotros</h4>
        </Link>
        <h4 className={styles.texts}>Contactanos</h4>
      </div>
      <div className={styles.box}>
        <figure>
          <a>
            <Icon className={styles.feeticon} icon="mingcute:foot-line" />
          </a>
        </figure>
      </div>
      <div className={styles.box1}>
        <div>
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
