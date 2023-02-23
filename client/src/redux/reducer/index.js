import swal from "sweetalert";
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
  GET_PROVINCIAS,
  GET_CIUDADES,
  GET_DONATIONS,
  UPDATE_NOT_READ_CHATS,
  GET_USERS_DETAIL,
  RESET_USER_DETAIL,
  RESET_PET_DETAIL,
  SET_USER_LOCATION,
  UPDATE_REVIEW,
} from "../actions";

const initialState = {
  pets: [],
  allPets: [],
  pet: [],
  filters: { sex: "", species: "", size: "", name: "", order: "", giverId: "", distance:"" },
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
  provincias: [],
  ciudades: [],
  donations: [],
  noLeidos: 0,
  thisUser: [],
  userDetail: {},
  userLocation:{},
  flagReview:true,
};

function getDistance(latitude1, longitude1, latitude2, longitude2) {
  let theta = longitude1 - longitude2;
  let distance = 60 * 1.1515 * (180/Math.PI) * Math.acos(
    Math.sin(latitude1 * (Math.PI/180)) * Math.sin(latitude2 * (Math.PI/180)) + 
    Math.cos(latitude1 * (Math.PI/180)) * Math.cos(latitude2 * (Math.PI/180)) * Math.cos(theta * (Math.PI/180))
    );
    return Math.round(distance * 1.609344, 2);
  }

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
        let todos = action.payload;
        const backup = action.payload
        if(state.filters.distance !== ""){
        todos = todos.filter((e) => e.dist = getDistance(state.userLocation.latitude, state.userLocation.longitude,e.latitude,e.longitude) <= state.filters.distance)
        }
        if (!todos.length){ 
          swal({
            title: "Sorry!",
            text: "No se encontraron mascotas que coincidan",
            icon: "error",
            button: "Ok",
          })
          
          return { ...state, pets: backup , filters: {
            sex: "",
            species: "",
            size: "",
            name: "",
            order: "",
            distance:"",
          },}}
         else return { ...state, pets: todos,  
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
          distance:"",
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

    case GET_PROVINCIAS:
      return {
        ...state,
        provincias: action.payload,
      };

    case GET_CIUDADES:
      return {
        ...state,
        ciudades: action.payload,
      };

    case UPDATE_NOT_READ_CHATS:
      return {
        ...state,
        noLeidos: action.payload,
      };
    case GET_DONATIONS:
      return {
        ...state,
        donations: action.payload,
      };
    case GET_USERS_DETAIL:
      return {
        ...state,
        userDetail: action.payload,
      };
    case RESET_USER_DETAIL:
      return { ...state, userDetail: {} 
    };
    case RESET_PET_DETAIL:
      return { ...state, pet: [] 
      };
       case SET_USER_LOCATION:
      return { ...state, 
        userLocation: action.payload 
      };
    case UPDATE_REVIEW:
      return { ...state, 
        flagReview: action.payload 
      };
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
