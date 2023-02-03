import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import Card from '../Card/Card';
import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';
import Paginado from '../Paginado/Paginado';
import Sidebar from '../Sidebar/Sidebar';

import { getPets } from '../../redux/actions';

import styles from './allcards.module.css'

function Adoptar() {

  const dispatch = useDispatch();
  const pets = useSelector(state => state.pets);

  useEffect(() => {
    dispatch(getPets())
  }, [dispatch]);

  return (
    <>
    <NavBar />
    <div className={styles.adoptar} >
    <Sidebar />
    { pets.map(pet => (
                        
                        <Card pets={pet} key={pet.id}/>
                        
                        ))}
    
                    
    
    </div>
    <Paginado />
    {/* <Footer /> */}
    </>
    )
}

export default Adoptar