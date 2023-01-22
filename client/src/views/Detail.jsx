import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Header from '../components/Header'
import { detailDog, emptyDetailDog } from '../redux/actions'
import '../assets/styles/detail.css'

const Detail = (props) => {
  const { idRaza } = useParams()
  const dispatch = useDispatch()
  const { data } = useSelector(store => store.dog)
  
  useEffect(() => {
    dispatch(detailDog(idRaza))
  }, [])
  
  useEffect(() => {
    console.log("🚀 ~ file: Detail.jsx ~ line 20 ~ useEffect ~ data", data)
  }, [data])



  return (
    <>
      <Header />
      <h1>Detail Dog</h1>
      <div className='top'><br />
            <div className='fuente'>
                <div>
                    <h4> Name: {data ? data.name : "Cargando"}</h4>
                    <h4> Id: {data ? data.id : "Cargando"}</h4>
                    <h4> Temperament: {data ? data.temperament : "Cargando"}</h4>
                    <h4> Height: {data ? data.height.metric : "Cargando"}</h4>
                    <h4> Weight: {data ? data.weight.metric : "Cargando"}</h4>
                    <h4> Life span: {data ? data.life_span : "Cargando"}</h4>
                </div>
                <div className='espaciado'>
                    <img src={data ? data.image : 'Cargando'} alt={data ? `Foto de ${data.name}` : 'cargando'  } width="230px" height="150px" />
                </div>
            </div>
            <div className='altura'>
                <Link to='/dogs'>
                    <button className='button' onClick={() => dispatch(emptyDetailDog())}>Volver</button>
                </Link>
            </div>
        </div>
    </>
  )
}

export default Detail