import React from "react";
import { Icon } from "@iconify/react";
import styles from "./footer.module.css";

function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.grupo1}>
        <div className={styles.box1}>
          <h4 className={styles.texts}>Sobre Nosotros</h4>
          <h4 className={styles.texts}>Home</h4>
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
            <Icon className={styles.iconSocial} icon="mdi:instagram" />
            <Icon className={styles.iconSocial} icon="mdi:twitter" />
            <Icon className={styles.iconSocial} icon="ic:baseline-facebook" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
