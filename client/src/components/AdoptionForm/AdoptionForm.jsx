import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "./adoptionForm.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Widget } from "@uploadcare/react-widget";
import { postNewPet } from "../../redux/actions";
import effects from "uploadcare-widget-tab-effects/react";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import swal from "sweetalert";

export default function AdoptionForm() {
  const [sent, setSent] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <NavBar />
      <Formik
        initialValues={{
          name: "",
          age: "",
          species: "",
          image: "",
          size: "",
          color: "",
          sex: "",
          temperament: "",
        }}
        validate={(values) => {
          let errors = {};

          // Validacion name
          if (!values.name) {
            errors.name = "Por favor ingresa un nombre";
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.name)) {
            errors.name = "El nombre solo puede contener letras y espacios";
          }
          if (!values.age) {
            errors.age = "Por favor selecciona un rango de edad";
          }
          if (!values.species) {
            errors.species = "Por favor selecciona un tipo de animal";
          }
          if (!values.size) {
            errors.size = "Por favor selecciona un tamaño";
          }
          if (!values.color) {
            errors.color = "Por favor escribe un color";
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.color)) {
            errors.color = "El color solo puede contener letras y espacios";
          }
          if (!values.sex) {
            errors.sex = "Por favor selecciona una opción";
          }
          if (!values.temperament) {
            errors.temperament = "Por favor escribe una descripcion";
          } else if (values.temperament.length < 80) {
            errors.temperament =
              "Por favor escribe una descripcion más detallada (80 caracteres al menos)";
          }

          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          dispatch(postNewPet(values));
          resetForm();
          setSent(true);
          setTimeout(() => setSent(false), 2000);
          swal({
            title: "Congratulations!",
            text: "El perrito ha sido creado con exito",
            icon: "success",
            button: "Ok",
          }).then(() => navigate("/home"));
        }}
      >
        {({ errors, setFieldValue }) => (
          <div className={styles.container}>
            <Form className={styles.form}>
              <div className={styles.divinput}>
                <label>¿Como se llama? </label>
                <br />
                <Field
                  className={styles.input}
                  type="text"
                  name="name"
                  placeholder="Nombre"
                ></Field>
                <ErrorMessage
                  name="name"
                  component={() => (
                    <div className={styles.error}>{errors.name}</div>
                  )}
                />
              </div>
              <div className={styles.divinput}>
                <label>¿Que tipo de mascota es? </label>
                <br />
                <Field as="select" className={styles.input} name="species">
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
                <label>¿De que color es? </label>
                <br />
                <Field
                  className={styles.input}
                  type="text"
                  name="color"
                  placeholder="color"
                ></Field>
                <ErrorMessage
                  name="color"
                  component={() => (
                    <div className={styles.error}>{errors.color}</div>
                  )}
                />
              </div>
              <div className={styles.divinput}>
                <label>¿Que rango de edad tiene? </label>
                <br />
                <Field as="select" className={styles.input} name="age">
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
                <label>¿Que tamaño alcanzará? </label>
                <br />
                <Field as="select" className={styles.input} name="size">
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
              <label>¿De que sexo es? </label>
              <div className={styles.divradio}>
                <hr />
                <label>
                  <Field type="radio" name="sex" value="macho" /> Macho
                </label>
                <label>
                  <Field type="radio" name="sex" value="hembra" /> Hembra
                </label>
                <ErrorMessage
                  name="sex"
                  component={() => (
                    <div className={styles.error}>{errors.sex}</div>
                  )}
                />
              </div>
              <div className={styles.divinput}>
                <label>Cuentanos un poco sobre su personalidad:</label>
                <br />
                <hr />
                <Field
                  as="textarea"
                  rows="7"
                  cols="50"
                  name="temperament"
                  className={styles.textArea}
                  placeholder="Descripción"
                  maxlength="255"
                ></Field>
                <ErrorMessage
                  name="temperament"
                  component={() => (
                    <div className={styles.error}>{errors.temperament}</div>
                  )}
                />
              </div>
              <label>Sube una linda foto (o varias): </label>
              <div className={styles.divinput}>
                <hr />
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
                    });
                  }}
                />
                ;
              </div>
              {sent && (
                <p className={styles.exito}>Formulario enviado con exito!</p>
              )}
              <br />
              <div className={styles.divinput}>
                <button type="submit" className={styles.btn}>
                  {" "}
                  Dar en adopción
                </button>
              </div>
              <br />
            </Form>
          </div>
        )}
      </Formik>
      <Footer />
    </>
  );
}
