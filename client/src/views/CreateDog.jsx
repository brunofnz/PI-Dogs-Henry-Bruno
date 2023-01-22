import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import '../assets/styles/createdogform.css'
import { useDispatch, useSelector } from 'react-redux'
import { getTemperaments, postDog } from '../redux/actions'

const CreateDog = () => {
  const dispatch = useDispatch();
  // pal seleceltor
  const {temperaments} = useSelector(store => store)
  
  const [form, setForm] = useState({ 
    name: "",
    weight: {
            metric: ""
        },
    height: {
        metric: ""
    },
    life_span: 0,
    image: '',
    temperamentID: []
})

const [minMax, setMinMax] = useState({
  maxAltura: '',
  minAltura: '',
  maxPeso: '',
  minPeso: ''
})

  useEffect(()=>{
    dispatch(getTemperaments())
  }, [])


  useEffect(()=>{
  }, [temperaments])


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.id] : e.target.value} )
  }

  const handleChangeMinMax = (e) => {
    setMinMax({
      ...minMax,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    form.yearsOfLife = parseInt(form.yearsOfLife)
    console.log('Your favorite flavor is: ', form);
    e.preventDefault();
    dispatch(postDog(form))
  }

  function handleClick() {
    setForm({
      ...form,
      weight: {
        imperial: 'asdfasasdf',
        metric: `${minMax.minPeso} - ${minMax.maxPeso}`
      },
      height: {
          imperial: 'asdfasasdf',
          metric: `${minMax.minAltura} - ${minMax.maxAltura}`
      },
    })
  }

  function handleTemperament(e) {
    setForm({
      ...form,
      temperament: [e.target.value]
    })
  }
  
  return (
    <>
    <Header />
    <div className='containerForm'>
      <h2>Crear raza</h2>
      <form className='containerFormSubmit' onSubmit={handleSubmit}>
      <div className='containerMinMax'>
        <label >Name</label>
        <input type="text" name="name" id="name" placeholder='Ingrese el nombre de la raza' onChange={handleChange}/>
      </div>
        <div className='containerMinMax'>
          <label >Height</label>
          <hr />
          <div>
            <label>Min</label>
            <input type="number" name="maxAltura" id="maxAltura" onChange={handleChangeMinMax}/>
            <label>Max</label>
            <input type="number" name="minAltura" id="minAltura" onChange={handleChangeMinMax}/>
          </div>
        </div>
        <div className='containerMinMax'>
          <label >Weight</label>
          <div>
            <label>Min</label>
            <input type="number" name="maxPeso" id="maxPeso" onChange={handleChangeMinMax}/>
            <label>Max</label>
            <input type="number" name="minPeso" id="minPeso" onChange={handleChangeMinMax}/>
          </div>
        </div>
        <div className='containerYears'>
          <label>Years of life</label>
          <input type="number" name="life_span" id="life_span" onChange={handleChange} />
        </div>
        <div className='containerYears'>
          <label>Image URL</label>
          <input type="url" name="image" id="image" onChange={handleChange} />
        </div>
        <div className='containerYears'>
          <label>Temperament</label>
          <select type="number" name="temperament" id="temperament" onChange={handleTemperament}>
            <option value="value1" selected disable>Select temperament</option>
            {
              temperaments.length && temperaments.map((temperament,index) => {
                return <option id={temperament.id} value={temperament.id} key={temperament.temperament}>{temperament.temperament}</option>
              })
            }
          </select>
        </div>
        <input type="submit" value="Submit" onClick={handleClick}/>
      </form>
    </div>
    </>
  )
}

export default CreateDog