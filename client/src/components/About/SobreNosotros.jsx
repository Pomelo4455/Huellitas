import React from "react";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import styles from "./about.module.css";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
function About() {
  return (
    <div className={styles.body}>
      <NavBar />
      <div className={styles.aboutPrincipal}>
        <div className={styles.cardAbout}>
          <img className={styles.imgAbout}></img>
          <h3 className={styles.TextAbout}>Nazareno</h3>
          <a
            href={
              "https://www.linkedin.com/in/nazareno-maestre-40559624b/?originalSubdomain=ar"
            }
            target="_blank"
            rel="noreferrer"
          >
            <Icon className={styles.IconAbout} icon="skill-icons:linkedin" />
          </a>
          <a
            href={"https://github.com/NazaMaestre"}
            target="_blank"
            rel="noreferrer"
          >
            <Icon className={styles.IconAbout} icon="logos:github-icon" />
          </a>
        </div>
        <div className={styles.cardAbout}>
          <img className={styles.imgAbout1}></img>
          <h3 className={styles.TextAbout}>Jeremias</h3>
          <a
            href={
              "https://www.linkedin.com/in/jeremias-segovia-17867772/?originalSubdomain=ar"
            }
            target="_blank"
            rel="noreferrer"
          >
            <Icon className={styles.IconAbout} icon="skill-icons:linkedin" />
          </a>
          <a
            href={"https://github.com/Lepemias"}
            target="_blank"
            rel="noreferrer"
          >
            <Icon className={styles.IconAbout} icon="logos:github-icon" />
          </a>
        </div>
        <div className={styles.cardAbout}>
          <img className={styles.imgAbout2}></img>
          <h3 className={styles.TextAbout}>Agustin</h3>
          <a
            href={
              "https://www.linkedin.com/in/agustinfraile/?originalSubdomain=ar"
            }
            target="_blank"
            rel="noreferrer"
          >
            <Icon className={styles.IconAbout} icon="skill-icons:linkedin" />
          </a>
          <a
            href={"https://github.com/agustinfraile"}
            target="_blank"
            rel="noreferrer"
          >
            <Icon className={styles.IconAbout} icon="logos:github-icon" />
          </a>
        </div>
        <div className={styles.cardAbout}>
          <img className={styles.imgAbout3}></img>
          <h3 className={styles.TextAbout}>Santiago</h3>
          <a
            href={"https://www.linkedin.com/in/santiago-mill%C3%A9-44ba16a8/"}
            target="_blank"
            rel="noreferrer"
          >
            <Icon className={styles.IconAbout} icon="skill-icons:linkedin" />
          </a>
          <a
            href={"https://github.com/Pomelo4455"}
            target="_blank"
            rel="noreferrer"
          >
            <Icon className={styles.IconAbout} icon="logos:github-icon" />
          </a>
        </div>
        <div className={styles.cardAbout}>
          <img className={styles.imgAbout4}></img>
          <h3 className={styles.TextAbout}>Melina</h3>
          <a
            href={"https://www.linkedin.com/in/melina-sosa-fuch-1a7376207/"}
            target="_blank"
            rel="noreferrer"
          >
            <Icon className={styles.IconAbout} icon="skill-icons:linkedin" />
          </a>
          <a
            href={"https://github.com/MelinaFuch"}
            target="_blank"
            rel="noreferrer"
          >
            <Icon className={styles.IconAbout} icon="logos:github-icon" />
          </a>
        </div>
        <div className={styles.cardAbout}>
          <img className={styles.imgAbout5}></img>
          <h3 className={styles.TextAbout}>Adrian</h3>
          <a
            href={
              "https://www.linkedin.com/in/adrian-frias-8917991b3/?originalSubdomain=ar"
            }
            target="_blank"
            rel="noreferrer"
          >
            <Icon className={styles.IconAbout} icon="skill-icons:linkedin" />
          </a>
          <a
            href={"https://github.com/Ager123"}
            target="_blank"
            rel="noreferrer"
          >
            <Icon className={styles.IconAbout} icon="logos:github-icon" />
          </a>
        </div>
        <div className={styles.cardAbout}>
          <img className={styles.imgAbout6}></img>
          <h3 className={styles.TextAbout}>Paul</h3>
          <a
            href={
              "https://www.linkedin.com/in/paul-espinoza-loayza/?originalSubdomain=pe"
            }
            target="_blank"
            rel="noreferrer"
          >
            <Icon className={styles.IconAbout} icon="skill-icons:linkedin" />
          </a>
          <a
            href={"https://github.com/Alucard-P"}
            target="_blank"
            rel="noreferrer"
          >
            <Icon className={styles.IconAbout} icon="logos:github-icon" />
          </a>
        </div>
        <div className={styles.cardAbout}>
          <img className={styles.imgAbout7}></img>
          <h3 className={styles.TextAbout}>Tomas</h3>
          <a
            href={
              "https://www.linkedin.com/in/tom%C3%A1s-albanesi-07122b1b5/?originalSubdomain=ar"
            }
            target="_blank"
            rel="noreferrer"
          >
            <Icon className={styles.IconAbout} icon="skill-icons:linkedin" />
          </a>
          <a
            href={"https://github.com/SamotLqq"}
            target="_blank"
            rel="noreferrer"
          >
            <Icon className={styles.IconAbout} icon="logos:github-icon" />
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About;
