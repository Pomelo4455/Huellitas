import styles from "./EditProfile.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { updateUsersAdm } from "../../redux/actions";
import swal from "sweetalert";
const EditProfile = ({ dataModal, setModalEditProfile }) => {
  const dispatch = useDispatch();
  const [sent, setSent] = useState(false);
  const [valuess, setValues] = useState({
    name: dataModal.name,
    phone: dataModal.phone,
    address: dataModal.address,
    description: dataModal.description,
    facebook: dataModal.facebook,
    instagram: dataModal.instagram,
    tiktok: dataModal.tiktok,
    CVU: dataModal.CVU,
    image: dataModal.image,
  });

  useEffect(() => {
    setValues({
      name: dataModal.name,
      phone: dataModal.phone,
      address: dataModal.address,
      description: dataModal.description,
      facebook: dataModal.facebook,
      instagram: dataModal.instagram,
      tiktok: dataModal.tiktok,
      CVU: dataModal.CVU,
      image: dataModal.image,
    });
  }, [dataModal]);

  const checkChange = (e) => {
    setValues({ ...valuess, [e.target.name]: e.target.value });
  };

  const setDefault = (e) => {
    e.preventDefault();
    setValues({ ...valuess, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.modalUser}>
      <Formik
        initialValues={valuess}
        validate={(values) => {
          let errors = {};
          if (!valuess.name) {
            errors.name = "Por favor ingresa un nombre";
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valuess.name)) {
            errors.name = "El nombre solo puede contener letras y espacios";
          }
          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          // console.log(valuess);
          dispatch(updateUsersAdm(dataModal.id, valuess));
          resetForm();
          setSent(true);
          setTimeout(() => setSent(false), 2000);
          swal({
            title: "Congratulations!",
            text: "El usuario ha sido editado con exito",
            icon: "success",
            button: "Ok",
          }).then(() => setModalEditProfile(false));
        }}
        validateOnMount
      >
        {({ errors, setFieldValue }) => (
          <div className={styles.container}>
            <Form className={styles.form}>
              <label>Edicion del usuario</label>
              <br />
              <div className={styles.divinput}>
                <label htmlFor="">Nombre : </label>
                <br />
                <Field
                  className={styles.input}
                  type="text"
                  name="name"
                  onChange={checkChange}
                  value={valuess.name}
                ></Field>
                <ErrorMessage
                  name="name"
                  component={() => (
                    <div className={styles.error}>{errors.name}</div>
                  )}
                />
              </div>
              <div className={styles.divinput}>
                <label htmlFor="">Telefono : </label>
                <br />
                <Field
                  className={styles.input}
                  type="text"
                  name="phone"
                  onChange={checkChange}
                  value={valuess.phone}
                ></Field>
              </div>
              <div className={styles.divinput}>
                <label htmlFor="">Direccion : </label>
                <br />
                <Field
                  className={styles.input}
                  type="text"
                  name="address"
                  onChange={checkChange}
                  value={valuess.address}
                ></Field>
              </div>
              <div className={styles.divinput}>
                <label htmlFor="">Descripcion : </label>
                <br />
                <Field
                  // className={styles.input}
                  type="text"
                  name="description"
                  as="textarea"
                  rows="7"
                  cols="50"
                  onChange={checkChange}
                  value={valuess.description}
                  maxLength="255"
                ></Field>
              </div>
              <div className={styles.divinput}>
                <label htmlFor="">Facebook : </label>
                <br />
                <Field
                  className={styles.input}
                  type="text"
                  name="facebook"
                  onChange={checkChange}
                  value={valuess.facebook}
                ></Field>
              </div>
              <div className={styles.divinput}>
                <label htmlFor="">Instagram : </label>
                <br />
                <Field
                  className={styles.input}
                  type="text"
                  name="instagram"
                  onChange={checkChange}
                  value={valuess.instagram}
                ></Field>
              </div>
              <div className={styles.divinput}>
                <label htmlFor="">TikTok : </label>
                <br />
                <Field
                  className={styles.input}
                  type="text"
                  name="tiktok"
                  onChange={checkChange}
                  value={valuess.tiktok}
                ></Field>
              </div>
              <div className={styles.divinput}>
                <label htmlFor="">CVU : </label>
                <br />
                <Field
                  className={styles.input}
                  type="text"
                  name="CVU"
                  onChange={checkChange}
                  value={valuess.CVU}
                ></Field>
              </div>
              <div className={styles.divinput}>
                <label htmlFor="">Imagen de Perfil : </label>
                <br />
                <img
                  className={styles.imagen}
                  src={valuess.image}
                  alt={valuess.name}
                />
                <button
                  name="image"
                  value="https://thumbs.dreamstime.com/b/persona-inc%C3%B3gnita-desconocida-silueta-del-hombre-122006457.jpg"
                  onClick={setDefault}
                >
                  Set default
                </button>
              </div>
              {sent && (
                <p className={styles.exito}>Formulario enviado con exito!</p>
              )}
              <div className={styles.buttons}>
                <button className={styles.button} type="submit">
                  Aceptar Cambios
                </button>
                <button
                  className={styles.button}
                  onClick={() => setModalEditProfile(false)}
                >
                  Cerrar
                </button>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default EditProfile;
