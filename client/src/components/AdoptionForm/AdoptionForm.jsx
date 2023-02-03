import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "./adoptionForm.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Widget } from "@uploadcare/react-widget";
import { postNewPet } from "../../redux/actions";
import effects from 'uploadcare-widget-tab-effects/react'

export default function AdoptionForm() {
  
  const [sent, setSent] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  return (
    <>
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

          // Validacion temper
          if (!values.temperament) {
            errors.temperament = "Por favor escribe una descripcion";
          }

          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          
          dispatch(postNewPet(values));
          resetForm();
          setSent(true);
          setTimeout(() => setSent(false), 2000);
          setTimeout(() => navigate("/home"), 2000);
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
              </div>
              <div className={styles.divinput}>
                <label>¿Que rango de edad tiene? </label>
                <br />
                <Field as="select" className={styles.input} name="age">
                  <option disabled hidden value="">
                    Elige una opción
                  </option>
                  <option value="less1">Menos de un año</option>
                  <option value="1to2">Entre 1 y 2 años</option>
                  <option value="2plus">Más de 2 años</option>
                </Field>
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
                  tabs='file url'
                  locale='es'
                  name="image"
                  publicKey="d00f029a60bdde9dafab"
                  previewStep
                  customTabs={{ preview: effects }}
                  clearable
                  onFileSelect={(file) => {
                    if (!file) {
                      setFieldValue('image',"");
                      return;
                    }
                    file.done((fileInfo) => {
                      setFieldValue('image',fileInfo.cdnUrl)
                     
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
    </>
  );
}
