import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Widget } from "@uploadcare/react-widget";
import { postNewCampaign } from "../../redux/actions";
import effects from "uploadcare-widget-tab-effects/react";
// import Footer from "../Footer/Footer";
// import NavBar from "../NavBar/NavBar";
import swal from "sweetalert";
import style from "./campaignForm.module.css"

export default function CampaignForm() {
    const [inputs, setInputs] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let user = JSON.parse(window.localStorage.getItem("loggedUser"));

    return (
    <div className={style.campaign}>
        {/* <NavBar /> */}
        <Formik
            initialValues={{
                title: "",
                goal: '',
                reason: '',
                description: '',
                image: '',
                collected: 0,
            }}
            validate={(values) => {
                let errors = {};

                if (!values.title) errors.title = "Por favor ingresa un título";
                else if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]*$/.test(values.title)) errors.title = "Título inválido";
                else if (/^\s/.test(values.title)) errors.title = 'El título no puede empezar con espacios en blanco';
                else if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]{10,45}$/.test(values.title)) errors.title = 'Debe tener entre 10 y 45 carácteres';

                if (!values.reason) errors.reason = "Por favor ingresa una causa";
                else if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]*$/.test(values.reason)) errors.reason = "Causa inválida";
                else if (/^\s/.test(values.reason)) errors.reason = 'La causa no puede empezar con espacios en blanco';
                else if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]{10,150}$/.test(values.reason)) errors.reason = 'Debe tener entre 10 y 150 carácteres';

                if (!values.description) errors.description = "Por favor haz una decripción";
                else if (/^\s/.test(values.description)) errors.description = 'La descripción no puede empezar con espacios en blanco';
                else if (values.description.length < 30)  errors.description =
                "Por favor escribe una descripcion más detallada (30 caracteres al menos)";

                if (!values.goal) errors.goal = "Por favor ingresa una meta";
                else if (values.goal <= 0) errors.goal = 'La meta no puede ser igual o menor a 0';
                else if (!/^[0-9]*$/.test(values.goal)) errors.goal = "Tiene que ser un número";
                else if (!/^[0-9]{1,9}$/.test(values.goal)) errors.goal = 'Debe tener entre 1 y 9 dígitos';

                return errors;
            }}

            onSubmit={(values, { resetForm }) => {
                dispatch(postNewCampaign({...values, userId : user?.data?.id}));
                resetForm();
                setInputs(true);
                setTimeout(() => setInputs(false), 2000);
                swal({
                    title: "¡Felicidades!",
                    text: "La campaña ha sido creada con éxito",
                    icon: "success",
                    button: "Ok",
                }).then(() => navigate("/home"));
            }}
        >
        {({ errors, setFieldValue}) => (

        <div className={style.container}>
            <Form className={style.form}>
                <div className={style.divInput}>
                    <label>Título de la campaña: </label>
                    <br/>
                    <Field
                        className={style.input}
                        type="text"
                        name="title"
                        placeholder="Título de la campaña"
                    ></Field>
                    <ErrorMessage
                        name="title"
                        component={() => (
                            <div className={style.error}>{errors.title}</div>
                        )}
                    />
                </div>

                <div className={style.divInput}>
                    <label>¿Cuál es la causa de tu campaña? </label>
                    <br />
                    <Field
                        className={style.input}
                        type="text"
                        name="reason"
                        placeholder="Causa de la campaña"
                    ></Field>
                    <ErrorMessage
                        name="reason"
                        component={() => (
                            <div className={style.error}>{errors.reason}</div>
                        )}
                    />
                </div>

                <div className={style.divInput}>
                    <label>Haz una descripción de tu campaña: </label>
                    <br />
                    <Field
                        as="textarea"
                        rows="7"
                        cols="50"
                        className={style.textArea}
                        name="description"
                        placeholder="Descripción de la campaña"
                    ></Field>
                    <ErrorMessage
                        name="description"
                        component={() => (
                            <div className={style.error}>{errors.description}</div>
                        )}
                    />
                </div>

                <div className={style.divInput}>
                    <label>¿Cuál es la meta de tu campaña?</label>
                    <br />
                    <Field
                        className={style.input}
                        type="number"
                        name="goal"
                        placeholder="Meta de la campaña"
                    ></Field>
                    <ErrorMessage
                        name="goal"
                        component={() => (
                            <div className={style.error}>{errors.goal}</div>
                        )}
                    />
                </div>

                <label>Sube una foto sobre tu campaña: </label>
                <div className={style.divInput}>
                    <hr />
                    <Widget
                        tabs="file url"
                        locale="es"
                        name="image"
                        publicKey="343b407282916d9bf627"
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
                    <div className={style.error}>{errors.image}</div>
                )}
                />
                </div>

                {inputs && (
                    <p className={style.exito}>Formulario enviado con exito!</p>
                )}

                <br />
                <div className={style.divinput}>
                    <button
                        type="submit"
                        className={
                            errors.title ||
                            errors.reason ||
                            errors.description ||
                            errors.image
                            ? style.btn_disabled
                            : style.btn
                        }
                        disabled={
                            errors.title ||
                            errors.reason ||
                            errors.description ||
                            errors.image
                        }
                    >
                        {" "}
                        Publicar
                    </button>
                </div>
                <br />
            </Form>
        </div>
        )}
        </Formik>
        {/* <Footer /> */}
    </div>
)}