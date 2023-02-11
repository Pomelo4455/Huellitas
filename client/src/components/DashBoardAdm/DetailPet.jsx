import styles from "./DetailPet.module.css";

const DetailPet = ({ dataModal, defaultData, setModalDetailPet }) => {
  return (
    <div className={styles.modalUser}>
      <label>Detalles de </label>
      {dataModal.name}
      <p>Nombre :</p>
      {dataModal.name ? dataModal.name : defaultData}
      <p>Edad :</p>
      {dataModal.age ? dataModal.age : defaultData}
      <p>Especie :</p>
      {dataModal.species ? dataModal.species : defaultData}
      <p>Tamaño :</p>
      {dataModal.size ? dataModal.size : defaultData}
      <br />
      <p>Color :</p>
      {dataModal.color ? dataModal.color : defaultData}
      <p>Sexo :</p>
      {dataModal.sex ? dataModal.sex : defaultData}
      <p>Descripcion :</p>
      {dataModal.temperament ? dataModal.temperament : defaultData}
      <p>Fue adoptado? :</p>
      {dataModal.adopted ? dataModal.adopted : defaultData}
      <p>Eliminado? :</p>
      {dataModal.deleted ? dataModal.deleted : defaultData}
      <p>Imagen</p>
      <img
        className={styles.imagen}
        src={dataModal.image}
        alt={dataModal.name}
      />
      <br />
      <button onClick={() => setModalDetailPet(false)}>Cerrar Modal</button>
    </div>
  );
};

export default DetailPet;
