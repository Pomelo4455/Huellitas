import React, { useEffect, useState } from "react";
import { getDetailCamp, donate } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import style from "./detailCampaign.module.css";
import ProgressBar from "@ramonak/react-progress-bar";

const Detail = (props) => {
  const dispatch = useDispatch();
  const campaignId = useSelector((state) => state.detailCamp);
  const { id } = useParams();
  const navigate = useNavigate();
  const [input, setInput] = useState(false);

  useEffect(() => {
    dispatch(getDetailCamp(id));
  }, [dispatch]);

  return (
    <>
      <div className={style.body}>
        <NavBar />
        {campaignId.length !== 0 ? (
          <div className={style.campaignContainer}>
            <h1>{campaignId[0].title}</h1>

            <img
              src={campaignId[0].image}
              alt={campaignId[0].id}
              className={style.img}
            />

            <h3>Meta: {campaignId[0].goal}</h3>
            <h3>Recaudado: {campaignId[0].collected}</h3>

            <ProgressBar
              completed={50}
              
            //   completed={(campaignId[0].goal / 100) * campaignId[0].collected}
              bgColor= "#646bff"
              baseBgColor="#000000"
              height="30px"
              width="500px"
              transitionDuration= "2s"
              animateOnRender = {true}
              labelAlignment="outside"
              labelColor ="#000000"
            />

            <h3>Descripción:</h3>
            <p> {campaignId[0].description}</p>

            <Formik
              initialValues={{
                id: campaignId[0].id,
                title: campaignId[0].title,
                currency_id: "ARS",
                picture_url: campaignId[0].image,
                description: campaignId[0].description,
                category_id: "don",
                quantity: "",
                unit_price: 1,
              }}
              validate={(values) => {
                let errors = {};
                if (!values.quantity)
                  errors.quantity = "Por favor ingrese la cantidad a donar";
                else if (!/^[0-9]*$/.test(values.quantity))
                  errors.quantity = "Debe ser un número";
                return errors;
              }}
              onSubmit={(values, { resetForm }) => {
                dispatch(donate(values));
                resetForm();
              }}
              validateOnMount
            >
              {({ errors, setFieldValue }) => {
                return (
                  <Form>
                    <Field
                      type="number"
                      name="quantity"
                      placeholder="Cantidad"
                    ></Field>
                    <ErrorMessage
                      name="quantity"
                      component={() => <div>{errors.quantity}</div>}
                    />
                    <button>Donar</button>
                  </Form>
                );
              }}
            </Formik>
            <Link to={"/campañas"}>
              <button>Volver</button>
            </Link>
          </div>
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Detail;
