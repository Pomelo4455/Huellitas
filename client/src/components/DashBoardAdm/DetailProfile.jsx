import styles from "./DetailProfile.module.css";

const DetailProfile = ({ dataModal, defaultData, setModalDetailProfile }) => {
  return (
    <div className={styles.modalUser}>
      <label>Detalles del </label>
      {dataModal.name}
      <p>Nombre :</p>
      {dataModal.name ? dataModal.name : defaultData}
      <p>Email :</p>
      {dataModal.email ? dataModal.email : defaultData}
      <p>Telefono :</p>
      {dataModal.phone ? dataModal.phone : defaultData}
      <p>Direccion :</p>
      {dataModal.address ? dataModal.address : defaultData}
      <br />
      <p>Descripcion :</p>
      {dataModal.description ? dataModal.description : defaultData}
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
      <button onClick={() => setModalDetailProfile(false)}>Cerrar Modal</button>
    </div>
  );
};

export default DetailProfile;
