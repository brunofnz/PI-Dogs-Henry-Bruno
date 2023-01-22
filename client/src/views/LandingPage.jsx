import React from 'react'
import { Link } from 'react-router-dom'
import Style from '../assets/styles/landingPage.module.css'
import Logo from '../assets/img/dog.png'

const LandingPage = () => {
  return (
    <div className={Style.contenedor}>
        <div className={Style.titulo}>
            <h1>Dogs Henry</h1>  
            <Link to='/dogs'>
                <button className={Style.button1}>Ingresar</button>
            </Link>
        </div>
        <div>
            <img src={Logo}/>
        </div>
      </div>
  )
}

export default LandingPage