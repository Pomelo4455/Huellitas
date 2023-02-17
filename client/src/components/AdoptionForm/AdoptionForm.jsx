import React, { useEffect, useCallback, useRef } from "react";
import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import styles from "./adoptionForm.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Widget } from "@uploadcare/react-widget";
import { postNewPet, getProvincias, getCiudades } from "../../redux/actions";
import effects from "uploadcare-widget-tab-effects/react";
import swal from "sweetalert";

export default function AdoptionForm() {
  const [sent, setSent] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let userId = JSON.parse(localStorage.getItem("loggedUser"));
  let newid = userId.data ? userId.data.id : null;
  // newid ? (newid = newid) : (newid = null);
  const [userLocation, setLocation] = useState({ latitude: 0, longitude: 0 });
  const provincias = useSelector((state) => state.provincias);
  const ciudades = useSelector((state) => state.ciudades);
  const isMounted = useRef(false);
  const formRef = useRef();

  useEffect(() => {
    if (isMounted.current === true) {
      dispatch(getProvincias());

      console.log("cargado");
    } else isMounted.current = true;
  }, []);

  const handleGeo = (event) => {
    event.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position.coords.latitude, position.coords.longitude);
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      return "no tenés geolocalización";
    }
  };

  let aux1 = "";
  const handleChangeProv = (provincia) => {
    if (provincia !== aux1) {
      dispatch(getCiudades(provincia));
      aux1 = provincia;
    }
  };

  // let aux2 = "";
  // const handleChangeCiudad = (ciudad) => {

  //   if (ciudad !== aux2) {
  //     const location = ciudades.filter(city => city.id === ciudad);
  //     let latitude = location[0].centroide.lat;
  //     let longitude = location[0].centroide.lon;
  //     console.log(latitude);
  //     console.log(longitude);
  //     // setLocation({ latitude, longitude })
  //     aux2 = ciudad;
  //   }
  // }

  return (
    <div className={styles.body}>
      <Formik
        innerRef={formRef}
        initialValues={{
          name: "",
          age: "",
          species: "",
          image: "",
          size: "",
          color: "",
          sex: "",
          temperament: "",
          provincia: "",
          ciudad: "",
          latitude: 0,
          longitude: 0,
          userId: newid,
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
          if (!values.image) {
            errors.image = "Por favor selecciona una imagen";
          }
          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          // dispatch(postNewPet(values,userLocation));
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
        validateOnMount
      >
        {({ values, errors, setFieldValue, handleBlur }) => (
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
                  maxLength="255"
                ></Field>
                <ErrorMessage
                  name="temperament"
                  component={() => (
                    <div className={styles.error}>{errors.temperament}</div>
                  )}
                />
              </div>
              <label>¿Donde se encuentra nuestro amiguito? </label>
              <button onClick={(event) => handleGeo(event)}>
                Geolocalizacion
              </button>
              <div className={styles.region}>
                <div className={styles.input2}>
                  <Field as="select" name="provincia">
                    <option disabled hidden value="">
                      Provincia
                    </option>
                    {provincias.map((prov) => {
                      return (
                        <option key={prov.id} value={prov.id}>
                          {prov.nombre}
                        </option>
                      );
                    })}
                  </Field>
                  {handleChangeProv(values.provincia)}
                </div>
                <div className={styles.input2}>
                  <Field as="select" name="ciudad">
                    <option disabled hidden value="">
                      Ciudad
                    </option>
                    {ciudades.map((ciudad) => {
                      return (
                        <option key={ciudad.id} value={ciudad.id}>
                          {ciudad.nombre}
                        </option>
                      );
                    })}
                  </Field>
                  {ciudades
                    ?.filter((city) => city.id === values.ciudad)
                    .map((ciudad) => {
                      if (values.latitude === 0)
                        return setFieldValue("latitude", ciudad.centroide.lat);
                    })}
                  <Field
                    type="number"
                    name="latitude"
                    value={values.latitude}
                  ></Field>
                  {ciudades
                    ?.filter((city) => city.id === values.ciudad)
                    .map((ciudad) => {
                      if (values.longitude === 0)
                        return setFieldValue("longitude", ciudad.centroide.lon);
                    })}
                  <Field
                    type="number"
                    name="longitude"
                    value={values.longitude}
                  ></Field>
                </div>
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
                  onChange={(file) => {
                    setFieldValue("image", file);
                  }}
                />
                <ErrorMessage
                  name="image"
                  component={() => (
                    <div className={styles.error}>{errors.image}</div>
                  )}
                />
              </div>
              {sent && (
                <p className={styles.exito}>Formulario enviado con exito!</p>
              )}
              <br />
              <div className={styles.divinput}>
                <button
                  type="submit"
                  className={
                    errors.name ||
                    errors.age ||
                    errors.species ||
                    errors.size ||
                    errors.color ||
                    errors.sex ||
                    errors.temperament ||
                    errors.image
                      ? styles.btn_disabled
                      : styles.btn
                  }
                  disabled={
                    errors.name ||
                    errors.age ||
                    errors.species ||
                    errors.size ||
                    errors.color ||
                    errors.sex ||
                    errors.temperament ||
                    errors.image
                  }
                >
                  {" "}
                  Dar en adopción
                </button>
              </div>
              <br />
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
}
