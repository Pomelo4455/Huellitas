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
  SEND_PROFILE_TO_DB,
  CLEAR_PROFILE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  ADD_PROFILE,
  REMOVE_PROFILE,
  SET_DB_PROFILE,
  REMOVE_DB_PROFILE,
  GET_FUNDACIONES,
  GET_USERS,
  DELETE_USERS,
  DELETE_CAMPAINGS,
  DELETE_PETS,
  UPDATE_USERS,
} from "../actions";

const initialState = {
  pets: [],
  allPets: [],
  pet: [],
  filters: { sex: "", species: "", size: "", name: "", order: "" },
  campaigns: [],
  fundaciones: [],
  detailCamp: [],
  page: 1,
  is_authenticated: false,
  profile: null,
  db_profile: null,
  users: [],
  campaignsAdm: [],
  petsAdm: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PETS:
      return {
        ...state,
        pets: action.payload,
        allPets: action.payload,
      };
    case GET_FUNDACIONES:
      return {
        ...state,
        fundaciones: action.payload,
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
        campaigns: action.payload,
      };
    case GET_DETAIL_CAMP:
      return {
        ...state,
        detailCamp: action.payload,
      };
    case SET_CURRENT_PAGE:
      return { ...state, page: action.payload };
    case SEND_PROFILE_TO_DB:
      return {
        ...state,
        profile: action.payload,
      };

    case CLEAR_PROFILE:
      return {
        ...state,
        profile: {},
      };
    case LOGIN_SUCCESS:
        return {
          ...state,
          is_authenticated: true
        }
      case LOGIN_FAILURE:
        return {
          ...state,
          is_authenticated: false
        }
      case ADD_PROFILE:
        return {
          ...state,
          profile: action.payload
        }
      case REMOVE_PROFILE:
        return {
          ...state,
          profile: null
        }
      case SET_DB_PROFILE:
        return {
          ...state,
          db_profile: action.payload
        }
      case REMOVE_DB_PROFILE:
        return {
          ...state,
          db_profile: null
        }
        return {
        ...state,
        is_authenticated: true,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        is_authenticated: false,
      };
    case ADD_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };
    case REMOVE_PROFILE:
      return {
        ...state,
        profile: null,
      };
    case SET_DB_PROFILE:
      return {
        ...state,
        db_profile: action.payload,
      };
    case REMOVE_DB_PROFILE:
      return {
        ...state,
        db_profile: null,
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case UPDATE_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case DELETE_USERS:
      return {
        ...state,
      };
    case DELETE_CAMPAINGS:
      return {
        ...state,
      };
    case DELETE_PETS:
      return {
        ...state,
      };

    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
