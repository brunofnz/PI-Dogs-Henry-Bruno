import { Link } from 'react-router-dom'
import style from '../assets/styles/card.css'

const CardDetail = ({ image, name, temperament, weight, height, id, data}) => {
  return (
    <div className="cards">
        <a href="" className="card">
          <img src={image} className="card__image" alt="" />
          <div className="card__overlay">
            <div className="card__header">
              <svg className="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>                     
              {/* <img className="card__thumb" src="https://i.imgur.com/7D7I6dI.png" alt="" /> */}
              <div className="card__header-text">
                <h3 className="card__title">{name}</h3>            
                <span className="card__status">{temperament}</span>
              </div>
            </div>
            <p className="card__description">Weight: {weight.metric} cm</p>
            <p className="card__description">Height: {height.metric} cm</p>
            <Link to={`/dogs`}>
                <button className='button1'>Volver</button>
            </Link>
          </div>
        </a>      
    </div>
  )
}

export default CardDetail;