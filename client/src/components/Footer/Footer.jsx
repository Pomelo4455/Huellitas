import React from "react";
import { Icon } from "@iconify/react";
import styles from "./footer.module.css";
import { Link } from "react-router-dom";


function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.grupo1}>
        <div className={styles.box1}>
          <Link to={'/sobreNosotros'}><h4 className={styles.texts}>Sobre Nosotros</h4></Link>
          <Link to={'/home'}><h4 className={styles.texts}>Home</h4></Link>
          {/* <h4 className={styles.texts}>Blog</h4> */}
          <h4 className={styles.texts}>Contact</h4>
        </div>
        <div className={styles.box}>
          <figure>
            <a>
              <Icon className={styles.feeticon} icon="mingcute:foot-line" />
            </a>
          </figure>
        </div>
        <div className={styles.box}>
          <div>
            <Link to={'https://www.instagram.com/huellitaswebpets/'}>
              <Icon className={styles.iconSocial} icon="mdi:instagram" />
            </Link>
            <Link to={'https://twitter.com/huellitasweb'}>
              <Icon className={styles.iconSocial} icon="mdi:twitter" />
            </Link>
            <Link to={'/:any'}>
              <Icon className={styles.iconSocial} icon="ic:baseline-facebook" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
