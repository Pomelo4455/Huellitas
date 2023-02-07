import React, { useEffect, useState } from "react";
import { donate } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

import style from "./campaigns.module.css";

const Detail = (props) => {
    const dispatch = useDispatch();
    const campaignId = useSelector(state => state.detailCamp);
    console.log(campaignId)
    const { id } = useParams();
    const navigate = useNavigate();

    const [input, setInput] = useState(false)

    useEffect(() => {
        dispatch(getDetailCamp(id));
    }, [dispatch])

    return (
        <div className={style.containerDetailCampaign}>
            <NavBar/>
            {
                campaignId.length !== 0 ?
                <div className={style.campaignContainer}>

                    <div className={style.titleCampaign}>
                        <h1>{campaignId[0].title}</h1>
                    </div>

                    <div className={style.detailInfoCampaign}>
                        <img src={campaignId[0].image} alt={campaignId[0].id} width='250px' height='250px'/>
                        
                        <div className={style.infoCampaign}>
                            <div className={style.goalCampaign}>
                                <h3>Meta: {campaignId[0].goal}</h3> 
                            </div>

                            <div className={style.descriptionCampaign}>
                                <h3>Descripción: {campaignId[0].description}</h3> 
                            </div>

                            <div className={style.btnsCampaign}>

                            <Formik
                            initialValues={{
                                cantidad: ""
                            }}
                            validate={(values) => {
                                let errors = {};
                                if (!values.cantidad) errors.cantidad = "Por favor ingrese la cantidad a donar";
                                else if (!/^[0-9]*$/.test(values.cantidad)) errors.cantidad = 'Debe ser un número';
                                return errors;
                            }}
                            onSubmit={(values, { resetForm }) => {
                                dispatch(donate(values));
                                resetForm();
                                setInput(true);
                                setTimeout(() => setInput(false), 2000);
                                swal({
                                    title: "¡Felicidades!",
                                    text: "Su donación ha sido enviada con exito",
                                    icon: "success",
                                    button: "Ok",
                                }).then(() => navigate("/home"));
                            }}
                            validateOnMount
                            >
                            {({ errors, setFieldValue }) => {
                                return (
                                    <div>
                                        <Form>
                                        <div>
                                            <label>¿Como se llama? </label>
                                            <br />
                                <Field
                                    type="text"
                                    name="cantidad"
                                    placeholder="Cantidad"
                                ></Field>
                                <ErrorMessage
                                    name="cantidad"
                                    component={() => (
                                        <div>{errors.cantidad}</div>
                                    )}
                                />
                            <button>Donar</button>
                                        </div>
                                        </Form>
                                    </div>
                                )
                            }}
                            </Formik>
                                <Link to={'/campañas'}>
                                    <button>Volver</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                : <h2>Loading...</h2>
            }

            <Footer/>
        </div>
    )
}

export default Detail;