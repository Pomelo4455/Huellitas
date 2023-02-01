import React from 'react'
import { Icon } from '@iconify/react'
import './Footer.css'

function Footer() {
  return (
    <div className='footer'>
      <div className='grupo1'>
      <div className="box1">
            <h4 className='texts'>Sobre Nosotros</h4>
            <h4 className='texts'>Home</h4>
            <h4 className='texts'>Blog</h4>
            <h4 className='texts'>Contact</h4>
        </div>
        <div className="box">
            <figure>
                <a><Icon className='feeticon' icon="mingcute:foot-line"/></a>
                
            </figure>
        </div>
        <div className="box">
            <div className="red-social">
                <Icon className='iconSocial' icon="mdi:instagram" />
                <Icon className='iconSocial' icon="mdi:twitter" />
                <Icon className='iconSocial' icon="ic:baseline-facebook" />
            </div>

        </div>
      </div>
    </div>
  )
}

export default Footer
