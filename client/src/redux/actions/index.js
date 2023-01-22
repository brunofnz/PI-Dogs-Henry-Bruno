import axios from 'axios';
import { orderArray } from '../../helpers';


export function numPaginadoChange(num) {
    return (dispatch) => {
        return dispatch({
                type: "SET_NUM_PAGINATED",
                payload: num
            })
    }
};

export function getDogs() {
    return (dispatch) => {
        return axios.get('http://localhost:3001/dogs')
            .then(res => dispatch({
                type: "GET_ALL_DOGS",
                payload: res.data
            }))
            .catch(error => console.error(error))
    }
};

export function postDog(payload) {
    return async (dispatch) => {
        return axios.post("http://localhost:3001/dogs", payload)
            .then(res => dispatch(getDogs()))
    }
};

export function getTemperaments() {
    return (dispatch) => {
        return axios.get('http://localhost:3001/temperaments')
        .then(res =>dispatch({
            type: 'GET_TEMPERAMENTS',
            payload: res.data
        }))
        .catch(error => console.error(error))
    }
};


export function detailDog(idRaza) {
    return async function (dispatch) {
        try {
            axios.get(`http://localhost:3001/dogs/${idRaza}`)
                .then(({ data }) => {
                    return dispatch({
                        type: 'GET_DETAIL_DOG',
                        payload: data
                    })
                })
        }
        catch (error) {
            console.error(error)
        }
    }
};

export function emptyDetailDog(idRaza) {
    return async function (dispatch) {
        return dispatch({
            type: 'GET_DETAIL_DOG',
            payload: {}
        })
    }
};

export function filterBy(payload) {
    return {
        type: 'FILTER_DOGS',
        payload
    }
};

export function orderBy(data,option) {
    return (dispatch) => {
        return dispatch({
            type: 'GET_ALL_DOGS',
            payload: orderArray(data,option),
        })
    }
};


export function searchDogs(text, array) {
    let result = array.filter((item) => item.name.toLowerCase().includes(text))

    return (dispatch) => {
        return dispatch({
            type: 'SEARCH_DOG',
            payload: orderArray(result),
        })
    }
}