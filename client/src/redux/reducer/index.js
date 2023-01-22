import { paginationArray } from "../../helpers"

const initialState = {
    allDogs: [],
    filteredDogs: [],
    orderBy: [],
    paginado: [], 
    numPaginado: 0,
    dog: {},
    temperaments: []
}

export const rootReducer = (state = initialState, { type, payload}) => {
    switch (type) {
        case 'GET_ALL_DOGS':
            return {
                ...state,
                allDogs: payload,
                filteredDogs: payload,
                paginado: paginationArray(payload)
            }

        case 'GET_DETAIL_DOG':
            return {
                ...state,
                dog: payload
            }

        case 'SET_NUM_PAGINATED':
            return {
                ...state,
                numPaginado: payload
            }

        case 'FILTER_DOGS_TEMPERAMENTS':
            return {
                ...state,

            }

        case 'FILTER_DOGS':
            return {
                ...state,
            }


        case 'ORDER_BY':
            return {
                ...state,
                allDogs: payload
            }

        case 'GET_TEMPERAMENTS':
            return {
                ...state,
                temperaments: payload
            }
        case 'SEARCH_DOG':
            return {
                ...state,
                paginado: payload
            }
        default:
            return state
    }
}