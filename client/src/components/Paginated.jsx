import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { numPaginadoChange } from '../redux/actions'
import '../assets/styles/paginated.css'

const Paginated = () => {
  const {paginado, numPaginado} = useSelector(store => store)
  const dispatch = useDispatch()

  function hanldePagination(pag) {
    dispatch(numPaginadoChange(pag))
  }

  function hanldePaginationArrow(valor) {
    if (valor === 0 && numPaginado > 0) {
      dispatch(numPaginadoChange(numPaginado-1))
    }
    if (valor === 1 && numPaginado < paginado.length - 1) {
      dispatch(numPaginadoChange(numPaginado+1))
    }
  }

  return (
      <div className="containerButtonsPagination">
      <div className='containerButtons'>
      <button className='buttonPag' onClick={() => hanldePaginationArrow(0)}> ↞ </button>
      {
        paginado.map((item,index) => {
          return <button key={index} className={numPaginado === index ? 'active' : 'buttonPag'} id={index} onClick={() => {hanldePagination(index)}}>{index + 1}</button>
        })
      }
      <button className='buttonPag' onClick={() => hanldePaginationArrow(1)}> ↠ </button>
      </div>
      </div>
  )
}

export default Paginated