import React from 'react'
import Footer from '../Footer/Footer'
import NavBar from '../NavBar/NavBar'
import styles from "./about.module.css"
import { Icon } from "@iconify/react"
function About() {
  return (
    <div>
        <NavBar />
        <div className={styles.aboutPrincipal}>
      <div className={styles.cardAbout}>
        <img className={styles.imgAbout}></img>
        <h3 className={styles.TextAbout}>Nazareno</h3>
        <Icon className={styles.IconAbout} icon="skill-icons:linkedin"/>
        <Icon className={styles.IconAbout} icon="logos:github-icon"/>
      </div>
      <div className={styles.cardAbout}>
        <img className={styles.imgAbout1}></img>
        <h3 className={styles.TextAbout}>Jeremias</h3>
        <Icon className={styles.IconAbout} icon="skill-icons:linkedin"/>
        <Icon className={styles.IconAbout} icon="logos:github-icon"/>
      </div>
      <div className={styles.cardAbout}>
        <img className={styles.imgAbout2}></img>
        <h3 className={styles.TextAbout}>Agustin</h3>
        <Icon className={styles.IconAbout} icon="skill-icons:linkedin"/>
        <Icon className={styles.IconAbout} icon="logos:github-icon"/>
      </div>
      <div className={styles.cardAbout}>
        <img className={styles.imgAbout3}></img>
        <h3 className={styles.TextAbout}>Santiago</h3>
        <Icon className={styles.IconAbout} icon="skill-icons:linkedin"/>
        <Icon className={styles.IconAbout} icon="logos:github-icon"/>
      </div>
      <div className={styles.cardAbout}>
        <img className={styles.imgAbout4}></img>
        <h3 className={styles.TextAbout}>Melina</h3>
        <Icon className={styles.IconAbout} icon="skill-icons:linkedin"/>
        <Icon className={styles.IconAbout} icon="logos:github-icon"/>
      </div>
      <div className={styles.cardAbout}>
        <img className={styles.imgAbout5}></img>
        <h3 className={styles.TextAbout}>Adrian</h3>
        <Icon className={styles.IconAbout} icon="skill-icons:linkedin"/>
        <Icon className={styles.IconAbout} icon="logos:github-icon"/>
      </div>
      <div className={styles.cardAbout}>
        <img className={styles.imgAbout6}></img>
        <h3 className={styles.TextAbout}>Paul</h3>
        <Icon className={styles.IconAbout} icon="skill-icons:linkedin"/>
        <Icon className={styles.IconAbout} icon="logos:github-icon"/>
      </div>
      <div className={styles.cardAbout}>
        <img className={styles.imgAbout7}></img>
        <h3 className={styles.TextAbout}>Tomas</h3>
        <Icon className={styles.IconAbout} icon="skill-icons:linkedin"/>
        <Icon className={styles.IconAbout} icon="logos:github-icon"/>
      </div>

      </div>
      <Footer />
      </div>
  )
}

export default About
