import React from 'react'
import Card from './Card'
import '../assets/styles/card.css'
const ListDogs = ({allDogs}) => {
  return (
    <div>
        <div className="cards">
        

    {
        allDogs.map(dog => {
            return  <Card 
                        name={dog.name}
                        image={dog.image}
                        temperament={dog.temperament}
                        weight={dog.weight}
                        height={dog.height}
                        id ={dog.id}
                    />
        })
    }
    </div>
    </div>
  )
}

export default ListDogs