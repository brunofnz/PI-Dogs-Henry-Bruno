import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogs } from '../redux/actions';
import style from '../assets/styles/home.module.css'
import ListDogs from '../components/ListDogs';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header'
import Paginated from '../components/Paginated';
import Footer from '../components/Footer';

const Home = (props) => {
  const dispatch = useDispatch()
  const {paginado, numPaginado} = useSelector(store => store)
  const [state, setState] = useState(false)


  useEffect(()=>{
    dispatch(getDogs())
  },[])

  return (
    <>
      <Header />
      <SearchBar />
      <Paginated />
      <div style={{color: 'white'}}>
        {
          paginado.length
          ? <ListDogs allDogs={paginado[numPaginado]}/>
          : <h1>Cargando...</h1>
        }  
      </div>
      <Paginated />
      <Footer />
    </>
  )
}

export default Home