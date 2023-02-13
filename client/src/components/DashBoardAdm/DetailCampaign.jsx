import styles from "./DetailCampaign.module.css";

const DetailCampaign = ({ dataModal, defaultData, setModalDetailCampaign }) => {
  return (
    <div className={styles.modalUser}>
      <label>Detalles de </label>
      {dataModal.title}
      <p>Titulo :</p>
      {dataModal.title ? dataModal.title : defaultData}
      <p>Razon :</p>
      {dataModal.reason ? dataModal.reason : defaultData}
      <p>Descripcion :</p>
      {dataModal.description ? dataModal.description : defaultData}
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
      <button onClick={() => setModalDetailCampaign(false)}>
        Cerrar Modal
      </button>
    </div>
  );
};

export default DetailCampaign;
