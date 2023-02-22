import styles from "./EditPet.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { updatePetAdm } from "../../redux/actions";
import swal from "sweetalert";
import { Widget } from "@uploadcare/react-widget";
import effects from "uploadcare-widget-tab-effects/react";
const EditPet = ({ dataModal, setModalEditPet }) => {
  const dispatch = useDispatch();
  const [sent, setSent] = useState(false);

  const [valuess, setValues] = useState({
    name: dataModal.name,
    age: dataModal.age,
    species: dataModal.species,
    size: dataModal.size,
    image: dataModal.image,
    color: dataModal.color,
    sex: dataModal.sex,
    temperament: dataModal.temperament,
  });

  useEffect(() => {
    setValues({
      name: dataModal.name,
      age: dataModal.age,
      species: dataModal.species,
      size: dataModal.size,
      image: dataModal.image,
      color: dataModal.color,
      sex: dataModal.sex,
      temperament: dataModal.temperament,
    });
  }, [dataModal]);

  const checkChange = (e) => {
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
          if (!valuess.age) {
            errors.age = "Por favor selecciona un rango de edad";
          }
          if (!valuess.species) {
            errors.species = "Por favor selecciona un tipo de animal";
          }
          if (!valuess.size) {
            errors.size = "Por favor selecciona un tamaño";
          }
          if (!valuess.color) {
            errors.color = "Por favor escribe un color";
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valuess.color)) {
            errors.color = "El color solo puede contener letras y espacios";
          }
          if (!valuess.sex) {
            errors.sex = "Por favor selecciona una opción";
          }
          if (!valuess.temperament) {
            errors.temperament = "Por favor escribe una descripcion";
          } else if (valuess.temperament.length > 250) {
            errors.temperament =
              "Por favor escribe una descripcion más detallada (Menor a 250 caracteres)";
          }
          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          dispatch(updatePetAdm(dataModal.id, valuess));
          resetForm();
          setSent(true);
          setTimeout(() => setSent(false), 2000);
          swal({
            title: "Congratulations!",
            text: "La mascota ha sido editada con exito",
            icon: "success",
            button: "Ok",
          }).then(() => setModalEditPet(false));
        }}
        validateOnMount
      >
        {({ errors, setFieldValue }) => (
          <div className={styles.container}>
            <Form className={styles.form}>
              <label>Edicion de la mascota</label>
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
                <label htmlFor="">Especie : </label>
                <br />
                <Field
                  component="select"
                  value={valuess.species}
                  className={styles.input}
                  name="species"
                  onChange={checkChange}
                >
                  <option disabled hidden value="">
                    Elige una opción
                  </option>
                  <option value="perro">Perro</option>
                  <option value="gato">Gato</option>
                  <option value="conejo">Conejo</option>
                  <option value="tortuga">Tortuga</option>
                  <option value="cobayo">Cobayo</option>
                </Field>
                <ErrorMessage
                  name="species"
                  component={() => (
                    <div className={styles.error}>{errors.species}</div>
                  )}
                />
              </div>
              <div className={styles.divinput}>
                <label htmlFor="">Edad : </label>
                <br />
                <Field
                  as="select"
                  value={valuess.age}
                  className={styles.input}
                  name="age"
                  onChange={checkChange}
                >
                  <option disabled hidden value="">
                    Elige una opción
                  </option>
                  <option value="Menos de un año">Menos de un año</option>
                  <option value="Entre 1 y 2 años">Entre 1 y 2 años</option>
                  <option value="Mas de 2 años">Más de 2 años</option>
                </Field>
                <ErrorMessage
                  name="age"
                  component={() => (
                    <div className={styles.error}>{errors.age}</div>
                  )}
                />
              </div>
              <div className={styles.divinput}>
                <label htmlFor="">Tamaño : </label>
                <br />
                <Field
                  as="select"
                  value={valuess.size}
                  className={styles.input}
                  name="size"
                  onChange={checkChange}
                >
                  <option disabled hidden value="">
                    Elige una opción
                  </option>
                  <option value="pequeño">Pequeño</option>
                  <option value="mediano">Mediano</option>
                  <option value="grande">Grande</option>
                </Field>
                <ErrorMessage
                  name="size"
                  component={() => (
                    <div className={styles.error}>{errors.size}</div>
                  )}
                />
              </div>
              <div className={styles.divinput}>
                <label htmlFor="">Sexo : </label>
                <br />
                <Field
                  as="select"
                  value={valuess.sex}
                  className={styles.input}
                  name="sex"
                  onChange={checkChange}
                >
                  <option disabled hidden value="">
                    Elige una opción
                  </option>
                  <option value="macho">Macho</option>
                  <option value="hembra">Hembra</option>
                </Field>
                <ErrorMessage
                  name="sex"
                  component={() => (
                    <div className={styles.error}>{errors.sex}</div>
                  )}
                />
              </div>
              <div className={styles.divinput}>
                <label htmlFor="">Color : </label>
                <br />
                <Field
                  className={styles.input}
                  type="text"
                  name="color"
                  onChange={checkChange}
                  value={valuess.color}
                ></Field>
                <ErrorMessage
                  name="color"
                  component={() => (
                    <div className={styles.error}>{errors.color}</div>
                  )}
                />
              </div>
              <div className={styles.divinput}>
                <label htmlFor="">Descripcion : </label>
                <br />
                <Field
                  className={styles.input}
                  type="text"
                  name="temperament"
                  as="textarea"
                  rows="7"
                  cols="50"
                  onChange={checkChange}
                  value={valuess.temperament}
                  maxLength="255"
                ></Field>
                <ErrorMessage
                  name="temperament"
                  component={() => (
                    <div className={styles.error}>{errors.temperament}</div>
                  )}
                />
              </div>
              <div className={styles.divinput}>
                <label htmlFor="">Imagen de Perfil : </label>
                <br />
                <img
                  className={styles.imagen}
                  src={valuess.image}
                  alt={valuess.name}
                />
                <br />
                <label>Deseas cambiar la foto actual?</label>
                <div className={styles.divinput}>
                  <Widget
                    tabs="file url"
                    locale="es"
                    name="image"
                    publicKey="d00f029a60bdde9dafab"
                    previewStep
                    customTabs={{ preview: effects }}
                    clearable
                    onFileSelect={(file) => {
                      if (!file) {
                        setFieldValue("image", "");
                        return;
                      }
                      file.done((fileInfo) => {
                        setFieldValue("image", fileInfo.cdnUrl);
                        setValues({
                          ...valuess,
                          image: fileInfo.cdnUrl,
                        });
                      });
                    }}
                    onChange={(file) => {
                      setFieldValue("image", file);
                    }}
                  />
                </div>
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
                  onClick={() => setModalEditPet(false)}
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

export default EditPet;
