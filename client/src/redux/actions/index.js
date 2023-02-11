import axios from "axios";
import swal from "sweetalert";
export const GET_PETS = "GET_PETS";
export const GET_PETS_DETAIL = "GET_PETS_DETAIL";
export const GET_PET_NAME = "GET_PET_NAME";
export const GET_FILTER_PETS = "GET_FILTER_PETS";
export const UPDATE_FILTERS = "UPDATE_FILTERS";
export const RESTORE_SEARCH = "RESTORE_SEARCH";
export const RESTORE_FILTERS = "RESTORE_FILTERS";
export const GET_CAMPAIGNS = "GET_CAMPAIGNS";
export const GET_DETAIL_CAMP = "GET_DETAIL_CAMP";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const SEND_PROFILE_TO_DB = "SEND_PROFILE_TO_DB";
export const CLEAR_PROFILE = "CLEAR_PROFILE";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const ADD_PROFILE = "ADD_PROFILE";
export const REMOVE_PROFILE = "REMOVE_PROFILE";
export const SET_DB_PROFILE = "SET_DB_PROFILE";
export const REMOVE_DB_PROFILE = "REMOVE_DB_PROFILE";
export const GET_FUNDACIONES = "GET_FUNDACIONES";
export const GET_USERS = "GET_USERS";
export const DONATION_INCREASE = "DONATION_INCREASE"; 

export const getPets = () => {
  return async function (dispatch) {
    try {
      const pets = await axios.get("http://localhost:3001/pets");
      // console.log(pets.data)

      return dispatch({
        type: GET_PETS,
        payload: pets.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getPetsDetail = (id) => {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`http://localhost:3001/pets/${id}`);
      return dispatch({
        type: GET_PETS_DETAIL,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      return dispatch({
        type: GET_PETS_DETAIL,
        payload: [],
      });
    }
  };
};

export const getPetName = (name) => {
  return async function (dispatch) {
    try {
    } catch (error) {}
  };
};

export const sendProfileToDb = (prof) => {
  // console.log(prof)
  // let prof=JSON.parse(localStorage.getItem('user'))
  // console.log(prof)
  return async function (dispatch){
    try{
      let loggedUser =await axios.post("http://localhost:3001/users", prof)
      localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
      return dispatch({
        type: SEND_PROFILE_TO_DB,
        payload: loggedUser
      })
    }catch(error){
      console.log(error.message)
    }
  };
};

export const clearProfile = () => {
  return { type: CLEAR_PROFILE };
};

export function postNewPet(payload) {
  return async function () {
    const newDog = await axios.post("http://localhost:3001/pets", payload);
    return newDog;
  };
}

export function getFilterPets(url) {
  return async function (dispatch) {
    try {
      const pets = await axios.get(url);
      return dispatch({ type: GET_FILTER_PETS, payload: pets.data });
    } catch (error) {
      swal({
        title: "Sorry!",
        text: "No se encontraron mascotas que coincidan",
        icon: "error",
        button: "Ok",
      });
      return dispatch({
        type: RESTORE_FILTERS,
      });
    }
  };
}

export function restoreSearch() {
  return { type: RESTORE_SEARCH };
}

export function updateFilters(filtros) {
  return { type: UPDATE_FILTERS, payload: filtros };
}

export function getCampaigns() {
  return async function (dispatch) {
    try {
      const response = await axios.get("http://localhost:3001/campaigns");
      const allCampaigns = response.data;

      return dispatch({
        type: GET_CAMPAIGNS,
        payload: allCampaigns,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const getDetailCamp = (id) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/campaigns/${id}`);
      const campaign = response.data;
      console.log(campaign);

      return dispatch({
        type: GET_DETAIL_CAMP,
        payload: campaign,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export function postNewCampaign(payload) {
  return async function () {
    try {
      const newCampaign = await axios.post(
        "http://localhost:3001/campaigns",
        payload
      );

      return newCampaign;
    } catch (error) {
      console.log(error);
    }
  };
}

export function setCurrentPage(pageNumber) {
  return {
    type: SET_CURRENT_PAGE,
    payload: pageNumber,
  };
}

////
export const login_success = () => {
  return {
    type: LOGIN_SUCCESS,
  };
};

export const login_failure = () => {
  return {
    type: LOGIN_FAILURE,
  };
};

export const add_profile = (profile) => {
  return {
    type: ADD_PROFILE,
    payload: profile,
  };
};

export const remove_profile = () => {
  return {
    type: REMOVE_PROFILE,
  };
};

export const set_db_profile = (profile) => {
  return {
    type: SET_DB_PROFILE,
    payload: profile,
  };
};

export const remove_db_profile = () => {
  return {
    type: REMOVE_DB_PROFILE,
  };
};

export function donate(payload) {
  return async function () {
    try {
      const donation = await axios
        .post("http://localhost:3001/payment", payload)
        .then(
          (response) =>
            (window.location.href = response.data.response.body.init_point)
        );
    } catch (error) {
      console.log(error);
    }
  };
}

export const getFundaciones = () => {
  return async function (dispatch) {
    try {
      const fundaciones = await axios.get(
        "http://localhost:3001/users?type=fundacion"
      );
      return dispatch({
        type: GET_FUNDACIONES,
        payload: fundaciones.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};


export const donationIncrease = (amount) => {
  return {
    type: DONATION_INCREASE,
    payload: amount,
  }
}
export const getUsers = () => {
  return async function (dispatch) {
    try {
      const users = await axios.get("http://localhost:3001/users");
      return dispatch({
        type: GET_USERS,
        payload: users.data,
      });
    } catch (error) {}
  };
};
