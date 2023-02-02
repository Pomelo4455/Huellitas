import { 
    GET_PETS, 
    GET_PETS_DETAIL, 
    GET_PET_NAME
} from "../actions";

const initialState = {
    pets: [],
    allPets: [],
    pet: [],
}

const rootReducer = (state = initialState, action) => {
    switch(action.payload) {
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
        default: 
            return {
                ...state,
            }
    }
};

export default rootReducer;