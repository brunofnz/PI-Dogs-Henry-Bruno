import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/img/dog.png'
import '../assets/styles/header.css'

const Header = () => {
  return (
    <nav style={{
      color: 'white'
    }}>
      <div className='acomodar'>
        <ul>
          <li>
            <img src={Logo} className='logo'/>  
          </li>
          <li>
            <h1 className='title'>Dogs Henry</h1>
          </li>
          <li className='navigation'>
            <Link to='/dogs' >
              Home
            </Link>
          </li>
          <li className='navigation'>
            <Link to='/createdogs' >
              Create Dog
            </Link>
          
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Header