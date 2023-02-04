import axios from 'axios';

export const GET_PETS = 'GET_PETS';
export const GET_PETS_DETAIL = 'GET_PETS_DETAIL';
export const GET_PET_NAME = 'GET_PET_NAME'; 

export const getPets = () => {
    return async function(dispatch) {
        try {
            const pets = await axios.get('http://localhost:3001/pets');
            // console.log(pets.data)

            return dispatch({
                type: GET_PETS,
                payload: pets.data
            })
        } catch (error) {
            console.log(error)
        }
    }
};

export const getPetsDetail = (id) => {
    return async function(dispatch) {
        try {
            const { data } = await axios.get(`http://localhost:3001/pets/${id}`);
            return dispatch({
                type: GET_PETS_DETAIL,
                payload: data
            });
        } catch (error) {
            console.log(error)
            return dispatch ({
                type: GET_PETS_DETAIL,
                payload: []
            })
        };
    };
};

export const getPetName = (name) => {
    return async function(dispatch){
        try {
            
        } catch (error) {
            
        }
    };
};


export function postNewPet(payload) {
    return async function () {
      const newDog = await axios.post("http://localhost:3001/pets",payload);
      return newDog;
    };
  }

// export function getFilterPets(url) {
//     return async function () {
//         const pets = await axios.get(url);
//         return dispatch(
//             {type: "FILTER_PETS",
//             payload: pets}
//         )
//     }
// }