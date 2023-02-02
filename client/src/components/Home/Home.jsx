import React from 'react';
import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';
import BtnHome from '../BtnHome/BtnHome';
import Card from '../Card/Card';

import { Link } from 'react-router-dom';
import { pets } from '../../data';

import styles from './home.module.css';


const Home = () => {
    return (
        <div className={styles.home}>
            <NavBar />
            <div className={styles.presentation}>
                <div className={styles.title}>
                    <h1>
                        Cada patita cuenta
                    </h1>
                </div>
                <div className={styles.description}>
                    <h4>
                        ¡Hola! Acá vas a poder encontrar a tu mejor amigo, ayudar a refugios realizando donaciones, u ofrecer en adopción al mejor amigo del afortunado que lo adopte.
                        ¡Ayudanos a ayudarlos!
                    </h4>
                </div>
            </div>

            <div className={styles.btnS}>
                <BtnHome text='Adoptar' />
                <BtnHome text='Dar en adopcion' />
                <BtnHome text='Donaciones' />
                <BtnHome text='Apoyar una campaña' />
            </div>

            <div className={styles.cards}>
                {/* reemplazar tarjetas por una sola    cuando este la logica resuelta */}
                {
                    pets.map(pet => (
                        
                        <Card pets={pet} key={pet.id}/>
                        
                    ))
                }
            </div>
            <Footer />
        </div>
    )
}

export default Home