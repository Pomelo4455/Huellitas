import styles from "./DetailPet.module.css";

const DetailPet = ({ dataModal, defaultData, setModalDetailPet }) => {
  return (
    <div className={styles.modalUser}>
      <div className={styles.container}>
        <label>Detalles de la mascota </label>
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
        <label className={styles.description}>
          {dataModal.temperament ? dataModal.temperament : defaultData}
        </label>
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
        <button
          className={styles.button}
          onClick={() => setModalDetailPet(false)}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default DetailPet;
