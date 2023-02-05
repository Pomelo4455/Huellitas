import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Widget } from "@uploadcare/react-widget";
import { postNewPet } from "../../redux/actions";
import effects from "uploadcare-widget-tab-effects/react";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import swal from "sweetalert";
import validations from "./validation";
import style from "./campaignForm.module.css"

export default function CampaignForm() {
    const [sent, setSent] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
    <div className={style.campaign}>
        <NavBar />
        <Formik
            initialValues={{
                title: "",
                goal: '',
                reason: '',
                description: '',
                image: '',
            }}
            validate={(values) => {
                validations(values)
            }}
            onSubmit={(values, { resetForm }) => {
                dispatch(postNewPet(values));
                resetForm();
                setSent(true);
                setTimeout(() => setSent(false), 2000);
                swal({
                    title: "¡Felicidades!",
                    text: "La campaña ha sido creada con éxito",
                    icon: "success",
                    button: "Ok",
                }).then(() => navigate("/home"));
            }}
        >
        {({ errors, setFieldValue }) => (

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

                
                <label>Sube una foto (o varias) sobre tu campaña: </label>
                <div className={style.divInput}>
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

                </div>
                    {sent && (
                        <p className={style.exito}>Formulario enviado con exito!</p>
                    )}
                    <br />
                <div>
                <button className={style.btn} type="submit">
                    {" "}
                    Publicar
                </button>
                </div>
                    <br />
                    </Form>
                </div>
            )}
        </Formik>
        <Footer />
    </div>
    );
}