import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import '../assets/styles/search-bar.css'
import { filterBy, orderBy, searchDogs } from '../redux/actions';

const SearchBar = () => {
  const dispatch = useDispatch();
  const { allDogs } = useSelector(store => store)

  const [search, setSearch] = useState()

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderBy(allDogs,e.target.value))
  };

  function handleFilter(e) {
    e.preventDefault();
    dispatch(filterBy(e.target.value))
  };

  function handleChangeInputSearch(e)  {
    setSearch(e.target.value.toLowerCase())


  }

  
  function handleSearch(e)  {
    setSearch(search.trim())

    if(search.length >= 3){
      return dispatch(searchDogs(search, allDogs))
    }

  }

  return (
    <div className='conteinerSearch'>
            <div >
                <input className='input'
                    // value={name}
                    type="text"
                    placeholder="Buscar..."
                    onChange={handleChangeInputSearch}
                />
            </div>
            <div>
               <button className='button' type="submit">🔎</button>
            </div>
            <div>
              <select onChange={e => handleSort(e)} >
                  <option hidden> Ordenar por </option>
                  <option value='asc'>A - Z</option>
                  <option value='desc'>Z - A</option>
                  <option value='weight'>Weight</option>
              </select>
            </div>
            <br />
            <div>
            <select onChange={e => handleFilter(e)} >
                  <option hidden> Filtrar por </option>
                  <option value='api'>API</option>
                  <option value='created'>CREATED BY ME</option>
              </select>
            </div>
        </div>
  )
}

export default SearchBar