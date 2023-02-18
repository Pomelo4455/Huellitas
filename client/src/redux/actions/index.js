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
export const DELETE_USERS = "DELETE_USERS";
export const DELETE_CAMPAINGS = "DELETE_CAMPAINGS";
export const DELETE_PETS = "DELETE_PETS";
export const UPDATE_USERS = "UPDATE_USERS";
export const UPDATE_USERS_ADM = "UPDATE_USERS_ADM";
export const DONATION = "DONATION";
export const SEARCH_CAMPAIGN = "SEARCH_CAMPAIGN";
export const GET_PROVINCIAS = "GET_PROVINCIAS";
export const GET_CIUDADES = "GET_CIUDADES";
export const GET_DONATIONS = "GET_DONATIONS";
export const UPDATE_NOT_READ_CHATS = "UPDATE_NOT_READ_CHATS";
export const GET_USERS_DETAIL = "GET_USERS_DETAIL";

export const getPets = () => {
  return async function (dispatch) {
    try {
      const pets = await axios.get("/pets");
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
      const { data } = await axios.get(`/pets/${id}`);
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

export const sendProfileToDb = (prof, setLoggedUser) => {
  // console.log(prof)
  // let prof=JSON.parse(localStorage.getItem('user'))
  // console.log(prof)
  return async function (dispatch) {
    try {
      let loggedUser = await axios.post("/users", prof);
      localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
      setLoggedUser(loggedUser);
      return dispatch({
        type: SEND_PROFILE_TO_DB,
        payload: loggedUser.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const clearProfile = () => {
  return { type: CLEAR_PROFILE };
};

export function postNewPet(values, userLocation) {
  let payload = { ...values, ...userLocation };
  console.log(payload);
  return async function () {
    const newDog = await axios.post("/pets", payload);
    return newDog;
  };
}

export function postNewImage(payload) {
  return async function () {
    const newImage = await axios.post("/users", payload);
    return newImage;
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
      const response = await axios.get("/campaigns");
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
      const response = await axios.get(`/campaigns/${id}`);
      const campaign = response.data;

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
      const newCampaign = await axios.post("/campaigns", payload);

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
        .post("/payment", payload)
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
      const fundaciones = await axios.get("/users?type=fundacion");
      return dispatch({
        type: GET_FUNDACIONES,
        payload: fundaciones.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getUsers = () => {
  return async function (dispatch) {
    try {
      const users = await axios.get("/users");
      return dispatch({
        type: GET_USERS,
        payload: users.data,
      });
    } catch (error) {}
  };
};

export const deleteUsers = (url) => {
  return async function (dispatch) {
    try {
      await axios.delete(url);
      return dispatch({ type: DELETE_USERS });
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteCampaigns = (url) => {
  return async function (dispatch) {
    try {
      await axios.delete(url);
      return dispatch({ type: DELETE_CAMPAINGS });
    } catch (error) {
      console.log(error);
    }
  };
};
export function getUsersAdm() {
  return async function (dispatch) {
    try {
      const response = await axios.get("http://localhost:3001/users/Adm/Admin");
      const allUsersAdm = response.data;

      return dispatch({
        type: GET_USERS,
        payload: allUsersAdm,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getCampaignsAdm() {
  return async function (dispatch) {
    try {
      const response = await axios.get("/campaigns/Adm/Admin");
      const allCampaignsAdm = response.data;

      return dispatch({
        type: GET_CAMPAIGNS,
        payload: allCampaignsAdm,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getPetsAdm() {
  return async function (dispatch) {
    try {
      const response = await axios.get("/pets/Adm/Admin");
      const allPetsAdm = response.data;
      return dispatch({
        type: GET_PETS,
        payload: allPetsAdm,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const deletePets = (url) => {
  return async function (dispatch) {
    try {
      await axios.delete(url);
      return dispatch({ type: DELETE_PETS });
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateUsers = (id, data, setLoggedUser) => {
  return async function (dispatch) {
    try {
      const response = await axios.put(`/users/${id}`, data);
      localStorage.setItem("loggedUser", JSON.stringify(response));
      setLoggedUser(response);
      console.log(response);
      dispatch({
        type: UPDATE_USERS,
        payload: response.data,
      });
    } catch (error) {}
  };
};

export const updateUsersAdm = (id, data) => {
  return async function (dispatch) {
    try {
      const response = await axios.put(`/users/${id}`, data);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateCampaignAdm = (id, data) => {
  return async function () {
    try {
      const response = await axios.put(`/campaigns/${id}`, data);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

export const updatePetAdm = (id, data) => {
  return async function () {
    try {
      const response = await axios.put(`/pets/${id}`, data);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

export const donation = (data) => {
  return async function () {
    try {
      const response = await axios.post(`/donations`, data);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateCollected = (id, data) => {
  return async function () {
    try {
      const response = await axios.put(`/donations/${id}`, data);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

export function getSearchCampaign(title) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/campaigns/Adm/Admin?title=${title}`);
      const allCampaignsAdm = response.data;

      return dispatch({
        type: GET_CAMPAIGNS,
        payload: allCampaignsAdm,
      });
    } catch (error) {
      swal({
        title: "Sorry!",
        text: "No se encontraron campañas con el título proporcionado",
        icon: "error",
        button: "Ok",
      });
      dispatch(getCampaignsAdm());
    }
  };
}

export function getSearchPet(name) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/pets/Adm/Admin?name=${name}`);
      const allPetsAdm = response.data;
      return dispatch({
        type: GET_PETS,
        payload: allPetsAdm,
      });
    } catch (error) {
      swal({
        title: "Sorry!",
        text: "No se encontraron mascotas con el nombre proporcionado",
        icon: "error",
        button: "Ok",
      });
      dispatch(getPetsAdm());
    }
  };
}

export function getSearchUser(name) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/users/Adm/Admin?name=${name}`);
      const allUsersAdm = response.data;
      return dispatch({
        type: GET_USERS,
        payload: allUsersAdm,
      });
    } catch (error) {
      swal({
        title: "Sorry!",
        text: "No se encontraron usuarios con el nombre proporcionado",
        icon: "error",
        button: "Ok",
      });
      dispatch(getUsersAdm());
    }
  };
}

export function getProvincias() {
  return async function (dispatch) {
    const resp = await axios.get(
      "https://apis.datos.gob.ar/georef/api/provincias"
    );
    const provincias = resp.data.provincias;

    return dispatch({
      type: GET_PROVINCIAS,
      payload: provincias,
    });
  };
}

export function getCiudades(id) {
  return async function (dispatch) {
    const resp = await axios.get(
      `https://apis.datos.gob.ar/georef/api/municipios?provincia=${id}&campos=id,nombre,centroide&max=150`
    );
    const ciudades = resp.data.municipios;

    return dispatch({
      type: GET_CIUDADES,
      payload: ciudades,
    });
  };
}

export const getDonations = () => {
  return async function (dispatch) {
    try {
      const donation = await axios.get("/donations");

      return dispatch({
        type: GET_DONATIONS,
        payload: donation.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export function getSearchFundation(name) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/users/Fundacion/Fund?name=${name}`);
      const allFundations = response.data;
      return dispatch({
        type: GET_FUNDACIONES,
        payload: allFundations,
      });
    } catch (error) {
      swal({
        title: "Sorry!",
        text: "No se encontraron fundaciones con el nombre proporcionado",
        icon: "error",
        button: "Ok",
      });
      dispatch(getFundaciones());
    }
  };
}

export function updateNotReadChats(cantidad) {
  return { type: UPDATE_NOT_READ_CHATS, payload: cantidad };
}

export const getDetail = (id) => {
  return async function (dispatch) {
    try {
      const get_detail = await axios.get(`/users/${id}`);
      const detailAll = get_detail.data;
      return dispatch({ type: GET_USERS_DETAIL, payload: detailAll });
    } catch (error) {
      console.log(error);
    }
  };
};
