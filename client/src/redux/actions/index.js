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

export function getCampaigns () {
    return async function (dispatch) {
        try {
            const response = await axios.get('http://localhost:3001/campaigns');
            const allCampaigns = response.data;

            return dispatch({
                type: GET_CAMPAIGNS,
                payload: allCampaigns
            })
        } catch(error) {
            console.log(error);
        }
    }
}

export const getDetailCamp = (id) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`http://localhost:3001/campaigns/${id}`);
            const campaign = response.data;
            console.log(campaign)

            return dispatch({
                type: GET_DETAIL_CAMP,
                payload: campaign
            })
        } catch(error) {
            console.log(error.message);
        }
    }
}