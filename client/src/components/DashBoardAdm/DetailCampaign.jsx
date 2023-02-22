import styles from "./DetailCampaign.module.css";
import { useEffect } from "react";
const DetailCampaign = ({ dataModal, defaultData, setModalDetailCampaign }) => {
  useEffect(() => {
    return () => {
      localStorage.setItem("dataChange", JSON.stringify({}));
    };
  }, []);
  return (
    <div className={styles.modalUser}>
      <div className={styles.container}>
        <label>Detalles de la campaña </label>
        <p>Titulo :</p>
        {dataModal.title ? dataModal.title : defaultData}
        <p>Razon :</p>
        {dataModal.reason ? dataModal.reason : defaultData}
        <p>Descripcion :</p>
        <label className={styles.description}>
          {dataModal.description ? dataModal.description : defaultData}
        </label>
        <p>Meta :</p>
        {dataModal.goal ? dataModal.goal : defaultData}
        <p>Estado :</p>
        {dataModal.status ? dataModal.status : defaultData}
        <p>Imagen</p>
        <img
          className={styles.imagen}
          src={dataModal.image}
          alt={dataModal.name}
        />
        <br />
        <button
          className={styles.button}
          onClick={() => setModalDetailCampaign(false)}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default DetailCampaign;
