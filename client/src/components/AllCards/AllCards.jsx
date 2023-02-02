import React from 'react'
import Card from '../Card/Card'
import Footer from '../Footer/Footer'
import NavBar from '../NavBar/NavBar'
import Paginado from '../Paginado/Paginado'
import Sidebar from '../Sidebar/Sidebar'
import styles from './allcards.module.css'
import { pets } from '../../data';

function Adoptar() {
  return (
    <>
    <NavBar />
    <div className={styles.adoptar} >
    <Sidebar />
    { pets.map(pet => (
                        
                        <Card pets={pet} key={pet.id}/>
                        
                        ))}
                        { pets.map(pet => (
                        
                        <Card pets={pet} key={pet.id}/>
                        
                        ))}
                    
    
    </div>
    <Paginado />
    <Footer />
    </>
    )
}

export default Adoptar