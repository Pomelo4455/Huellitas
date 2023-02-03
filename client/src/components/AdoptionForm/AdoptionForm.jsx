import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "./adoptionForm.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function AdoptionForm() {
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <Formik
        initialValues={{
          name: "",
          type: "",
          age: "",
          size: "",
          gender: "",
          temper: "",
          img: "",
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
          if (!values.temper) {
            errors.temper = "Por favor escribe una descripcion";
          }

          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          // Agregar action para mandar a la db
          console.log(values);
          resetForm();
          setSent(true);
          setTimeout(() => setSent(false), 2000);
          setTimeout(() => navigate("/home"), 2000);
        }}
      >
        {({ errors }) => (
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
                <Field as="select" className={styles.input} name="type">
                  <option disabled hidden value="">
                    Elige una opción
                  </option>
                  <option value="dog">Perro</option>
                  <option value="cat">Gato</option>
                  <option value="goat">Cabra</option>
                  <option value="other">Otro</option>
                </Field>
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
                  <option value="small">Pequeño</option>
                  <option value="medium">Mediano</option>
                  <option value="large">Grande</option>
                </Field>
              </div>
              <label>¿De que sexo es? </label>
              <div className={styles.divradio}>
                <hr />
                <label>
                  <Field type="radio" name="gender" value="male" /> Macho
                </label>
                <label>
                  <Field type="radio" name="gender" value="female" /> Hembra
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
                  name="temper"
                  className={styles.textArea}
                  placeholder="Descripción"
                ></Field>
                <ErrorMessage
                  name="temper"
                  component={() => (
                    <div className={styles.error}>{errors.temper}</div>
                  )}
                />
              </div>
              <label>Sube una linda foto (o varias): </label>
              <div className={styles.divradio}>
                <hr />
                <Field type="file" accept="image/*" name="img" multiple></Field>
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
