import React from 'react'
import Card from '../Card/Card'
import Footer from '../Footer/Footer'
import NavBar from '../NavBar/NavBar'
import Paginado from '../Paginado/Paginado'
import Sidebar from '../Sidebar/Sidebar'
import styles from './allcards.module.css'

function Adoptar() {
  return (
    <>
    <NavBar />
    <div className={styles.adoptar} >
    <Sidebar />
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />
    </div>
    <Paginado />
    <Footer />
    </>
    )
}

export default Adoptar