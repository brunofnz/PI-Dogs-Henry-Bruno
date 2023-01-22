import { Link } from 'react-router-dom'

import '../assets/styles/card.css'

const Card = ({ image, name, temperament, weight, height, id }) => {
  return (
        <a className="card">
          <img src={image} className="card__image" alt="" />
          <div className="card__overlay">
            <div className="card__header">
              <div className="card__header-text">
                <h3 className="card__title">{name}</h3>            
                <Link to={`/dogs/${id}`}>
                    <button className='button1'>Details</button>
                </Link>
              </div>
            </div>
          </div>
        </a>      
  )
}

export default Card