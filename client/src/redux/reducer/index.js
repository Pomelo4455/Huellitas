import {
  GET_FILTER_PETS,
  GET_PETS,
  GET_PETS_DETAIL,
  GET_PET_NAME,
  UPDATE_FILTERS,
  RESTORE_SEARCH,
  RESTORE_FILTERS,
  GET_CAMPAIGNS,
  GET_DETAIL_CAMP,
  SET_CURRENT_PAGE,
} from "../actions";

const initialState = {
  pets: [],
  allPets: [],
  pet: [],
  filters: { sex: "", species: "", size: "", name: "", order: "" },
  campaigns: [],
  detailCamp:[],
  page:(1),
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PETS:
      return {
        ...state,
        pets: action.payload,
        allPets: action.payload,
      };
    case GET_PETS_DETAIL:
      return {
        ...state,
        pet: action.payload,
      };
    case GET_PET_NAME:
      return {
        ...state,
        pets: action.payload,
      };
    case GET_FILTER_PETS:
      return {
        ...state,
        pets: action.payload,
      };
    case UPDATE_FILTERS:
      return {
        ...state,
        filters: action.payload,
      };
    case RESTORE_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          sex: "",
          species: "",
          size: "",
          name: "",
          order: "",
        },
      };

    case RESTORE_SEARCH:
      return {
        ...state,
        filters: { ...state.filters, name: "" },
      };
    case GET_CAMPAIGNS:
        return {
            ...state,
            campaigns: action.payload
        }
    case GET_DETAIL_CAMP:
        return {
            ...state,
            detailCamp: action.payload
        }
    case SET_CURRENT_PAGE:
          return { ...state, page: action.payload };
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
