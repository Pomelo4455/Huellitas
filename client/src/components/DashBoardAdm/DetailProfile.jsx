import styles from "./DetailProfile.module.css";
import { useEffect } from "react";

const DetailProfile = ({ dataModal, defaultData, setModalDetailProfile }) => {
  useEffect(() => {
    return () => {
      localStorage.setItem("dataChange", JSON.stringify({}));
    };
  }, []);
  return (
    <div className={styles.modalUser}>
      <div className={styles.container}>
        <label>Detalles del usuario</label>
        <p>Nombre :</p>
        <label>{dataModal.name ? dataModal.name : defaultData}</label>
        <p>Email :</p>
        {dataModal.email ? dataModal.email : defaultData}
        <p>Telefono :</p>
        {dataModal.phone ? dataModal.phone : defaultData}
        <p>Direccion :</p>
        {dataModal.address ? dataModal.address : defaultData}
        <br />
        <p>Descripcion :</p>
        <label className={styles.description}>
          {dataModal.description ? dataModal.description : defaultData}
        </label>
        <p>Facebook :</p>
        {dataModal.facebook ? dataModal.facebook : defaultData}
        <p>Instagram :</p>
        {dataModal.instagram ? dataModal.instagram : defaultData}
        <p>Tik tok :</p>
        {dataModal.tiktok ? dataModal.tiktok : defaultData}
        <p>CVU :</p>
        {dataModal.CVU ? dataModal.CVU : defaultData}
        <p>Imagen</p>
        <img
          className={styles.imagen}
          src={dataModal.image}
          alt={dataModal.name}
        />
        <br />
        <button
          className={styles.button}
          onClick={() => setModalDetailProfile(false)}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default DetailProfile;
