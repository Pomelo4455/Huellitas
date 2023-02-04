import { 
    GET_FILTER_PETS,
    GET_PETS, 
    GET_PETS_DETAIL, 
    GET_PET_NAME,
    UPDATE_FILTERS
} from "../actions";

const initialState = {
    pets: [],
    allPets: [],
    pet: [],
    filters: {sex: "", species: "", size: "", name: "", order: ""},
}

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_PETS:
            return {
                ...state,
                pets: action.payload,
                allPets: action.payload
            }
        case GET_PETS_DETAIL:
            return {
                ...state,
                pet: action.payload
            }
        case GET_PET_NAME:
            return {
                ...state,
                pets: action.payload
            }
        case GET_FILTER_PETS:
            return {
                ...state,
                pets: action.payload
            }
        case UPDATE_FILTERS:
            return {
                ...state,
                filters: action.payload
            }
        default: 
            return {
                ...state,
            }
    }
};

export default rootReducer;