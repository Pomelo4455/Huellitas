import React from 'react'
import { Icon } from '@iconify/react';
import {Link} from "react-router-dom"
import './Landing.css'

export default function Landing() {
  return (
    <div className='Lan-dad'>
    <div className='NavLan'>
    <Icon className='icon-feet' icon="mingcute:foot-line" />
    <a className='Title-land'>Huellitas</a>
      <Icon className='icon-redes1' icon="ph:instagram-logo" />
      <Icon className='icon-redes' icon="mdi:twitter" />
      <Icon className='icon-redes' icon="ic:baseline-facebook" />
    </div>
    <div>
        <h1 className='text'>Huellitas</h1>
        <a className='text-p'>Adopta a tu mejor amigo y de la mejor manera con nosotros</a>
    </div>
    <Link to="/home">
    <button className='buttonLan'>Get Started</button>
    </Link>
    <div className='img1'></div>
    <div className='Banner'></div>
    
        </div>
  )
}
