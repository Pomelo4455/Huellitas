import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCampaigns, setCurrentPage } from "../../redux/actions";
import Campaña from "./Campaing";
import { Icon } from "@iconify/react";
import Paginado from "../Paginado/Paginado";
import styles from "./campaigns.module.css";

const Campañas = () => {
  const dispatch = useDispatch();
  const allCampaigns = useSelector((state) => state.campaigns);

  const currentPage = useSelector((state) => state.page);
    const [campPerPage, setCampPerPage] = useState(8);
    const indexLastCamp = currentPage * campPerPage;
    const indexFirstCamp = indexLastCamp - campPerPage;
    const currentCamp = allCampaigns.slice(indexFirstCamp, indexLastCamp);
    const campMax = Math.ceil(allCampaigns.length / campPerPage);

    function setPage(pageNumber) {
      dispatch(setCurrentPage(pageNumber));
  }

  const paginado = (pageNumber) => {
      setPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getCampaigns());
    
  }, [dispatch]);

  return (
    <div className={styles.body}>
     
      <div className={styles.divIcon}>
        <Link to={"/Home"} className={styles.icon}>
          <Icon icon="pajamas:go-back" width="50px" />
        </Link>
      </div>
      <div className={styles.container}>
        {
          currentCamp.map((camp) => {
              return (
                <Campaña
                  key={camp.id}
                  id={camp.id}
                  title={camp.title}
                  reason={camp.reason}
                  description={camp.description}
                  image={camp.image}
                  goal={camp.goal}
                />
              );
          })
        }
      </div>
      <Paginado paginado={paginado} currentPage={currentPage} petMax={campMax} />


    
    </div>
  );
};

export default Campañas;
