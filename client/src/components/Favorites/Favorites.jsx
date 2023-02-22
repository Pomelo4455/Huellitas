import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LINK_BACK } from "../../Utils/variablesDeploy";

// import styles from "../NavBar/navBar.module.css";
import styles from './favorites.module.css'

const Favorites = ({handleOcultFavorites}) => {
  let [favorites, setFavorites] = useState([])
  let user = JSON.parse(window.localStorage.getItem("loggedUser"))?.data;
  let navigate = useNavigate();
  let [more, setMore] = useState(false);

  useEffect(() => {
      if (user?.id) {
          axios(`${LINK_BACK}/follow?userId=${user.id}`)
          .then(data => setFavorites(data.data.splice(0,5)))
      }
  },[])

  const handleShowMore = () => {
      setMore(!more)
      if (!more && user?.id) {
          axios(`${LINK_BACK}/follow?userId=${user.id}`)
          .then(data => setFavorites(data.data))
      }
      else if (user?.id) {
          axios(`${LINK_BACK}/follow?userId=${user.id}`)
          .then(data => setFavorites(data.data.splice(0,5)))
      }
  }

  const handleClickFavorite = (pet) => {
      // handleOcultFavorites()
      console.log(pet.id)
      navigate(`/detail/${pet.id}`)
  }
  return (
    <div className={styles.listContainer}>
      
      {
        favorites.length <= 0 
        ?
          <h3 
            className={styles.textNoList}
          >
            No tienes favoritos
          </h3>
        :
        <div 
          className={styles.allList}
          // style={{display:"flex", justifyContent:"center", alignItems: "center", textAlign:"center", margin: "10px 0px 10px 0px"}}
        >

          <div className={styles.listItem}>
            {
              favorites.map((pet, i) => {
                pet = pet.seguido;
                return (
                    <div 
                      onClick={() => handleClickFavorite(pet)} 
                      key={i} 
                      className={styles.petInList}
                    >
                      <div className={styles.petImage}>
                        <img 
                          src={pet.image} 
                          alt={pet.name} 
                        />
                      </div>

                      <div className={styles.petInfo}>
                        <div className={styles.petInfoName}>
                            {pet.name}
                        </div>
                        <div className={styles.petInfoAdopted}>  
                            Adoptado : {pet.adopted}
                        </div>
                      </div>
                          
                    </div>
                  )
              })
            }

            {
                more ?
                <button onClick={handleShowMore} className={styles.buttonEdit}>Ver menos</button>
                :
                <button onClick={handleShowMore} className={styles.buttonEdit}>Ver mas</button>
            }

          </div>

        </div>
      }
    </div>
  )
}

export default Favorites