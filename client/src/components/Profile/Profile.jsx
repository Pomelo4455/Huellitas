import './profile.css'
import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Icon } from "@iconify/react";
import { profileCreationInfo } from "../../Utils/profileFunctions";
import { useDispatch, useSelector } from 'react-redux';
import { updateUsers, sendProfileToDb } from "../../redux/actions";
import { Widget } from "@uploadcare/react-widget"
import NavBar from '../NavBar/NavBar';
import MapView from "../MapView/MapView";
import axios from "axios";
import swal from "sweetalert";
import {useNavigate, navigate } from 'react-router-dom';
import RenderizarEnAdopcion from './RenderEnAdopcion';
import RenderizarAdoptados from './RenderAdoptados';
import RenderizarCampaigns from './RenderCampaigns';
import RenderizarDonations from './RenderDonations';
import { LINK_BACK } from '../../Utils/variablesDeploy';
import effects from "uploadcare-widget-tab-effects/react";



const Profile = ({setLoggedUser}) => {

    const dispatch = useDispatch()
    let profile = useSelector(state => state.profile)
    useEffect(() => {}, [profile])
    const latitude = profile?.latitude
    const longitude = profile?.longitude
    
    let userId = JSON.parse(localStorage.getItem("loggedUser"));

    // useEffect(() => {
    //   if (userId) {
    //     dispatch(updateUsers());
    //   }
    // }, [userId]);
  
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate()
    const adminId = 1
    const [formData, setFormData] = useState({
      name: userId.data.name,
      email: userId.data.email,
      phone: userId.data.phone,
      image: userId.data.image,
      adopciones: "No realizaste adopciones",
      donaciones: "No realizaste donaciones",
      status: userId.data.status,
      type: userId.data.type,
      id: userId.data.id
    });
    const handleSendMail = async () => {
      try {
        const userLocalStorage = JSON.parse(localStorage.getItem("loggedUser"));
        const userId = userLocalStorage.data.id;
        swal("¿Estas seguro que deseas solicitar tu cambio de usuario a fundacion?", {
          buttons: {
            chat: {
              text: "Chat en vivo",
              value: "chat",
            },
          },
        })
        .then((value) => {
          switch (value) {
        //     case "email":
        //       axios.post(`${LINK_BACK}/mails`, {
        //         idUser: userId,
        //       })
        //       .then(() => {
        //         swal(
        //           "Enviado.",
        //           "Se ha informado su interés en cambiar su cuenta a fundacion.",
        //           "success"
        //         );
        //       })
              // break;
            case "chat":
              navigate(`../chat/${userId}/${adminId}`)
              break;
          }
        });
      } catch (error) {
        swal(
          "No es posible que cambies tu perfil a fundacion.",
          "Debe registrarse para poder hacerlo.",
          "error"
        );
      }
    };
    const handleEdit = () => {
      setEditMode(true);
    };
    const handleFileChange = (file) => {
      if (!file) {
        setFormData({ ...formData, image: "" });
        return
      }
      setFormData({ ...formData, image: file.cdnUrl });
    };

    const handleStatusChange = () => {
      setFormData({
        ...formData,
        status: formData.status === "Activo" ? "Inactivo" : "Activo"
      });
      dispatch(updateUsers(userId.data.id, formData, setLoggedUser));
      dispatch(sendProfileToDb(formData, setLoggedUser));
    };

    const handleCancel = () => {
      setEditMode(false);
      setFormData({
        ...formData,
        name: userId.data.name,
        email: userId.data.email,
        phone: userId.data.phone,
        image: userId.data.image
      });

    };
  
    const handleSave = () => {
      setEditMode(false);
      dispatch(updateUsers(userId.data.id, formData, setLoggedUser));
      dispatch(sendProfileToDb(formData, setLoggedUser));
      localStorage.setItem("loggedUser", JSON.stringify({data: formData}));
    };
  
    const handleChange = (event) => {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value
      });
    };

    return(
     <div className='page-container'>
        <img src={formData.image} className="profile-avatar"/>
          {editMode ? (
            <React.Fragment> 
              <div className="widget-container">

                <Widget 
                locale="es"
                name="image"
                publicKey="d00f029a60bdde9dafab"
                previewStep
                customTabs={{ preview: effects }}
                clearable
                id='image' 
                value={formData.image}
                onChange={handleFileChange} 
                />
                {/* <div className={style.error}>{errors.image}</div> */}
              </div>
              <input type="text" name="name" value={formData.name} placeholder="Agregar Nombre" onChange={handleChange} className="profile-input"/>
              <input type="text" name="phone" placeholder='agregar telefono' value={formData.phone} onChange={handleChange} className="profile-input"/>
              {/* <button onClick={handleStatusChange} className="profile-action-button">{formData.status}</button> */}
            </React.Fragment>
          ) : (
            <React.Fragment>
              <h1 className="profile-name">{formData.name}</h1>
              <p className="profile-email"><strong>Email:</strong> {formData.email}</p>
              {formData?.phone?.length > 0 ? <p className="profile-phone" ><strong>Telefono:</strong> {formData.phone}</p> : null}
              {/* <p className="profile-phone"><strong>Status:</strong> {formData.status} </p> */}
              {latitude && longitude ? <div style={{width: "100vw"}}><MapView latitude={latitude} longitude={longitude}/></div>: null}
              <RenderizarEnAdopcion user={formData}/>
              <RenderizarAdoptados user={formData}/>
              <RenderizarDonations user={formData}/>
              {formData.type === "fundacion" && <RenderizarCampaigns user={formData}/>}
            </React.Fragment>
          )}
        <div className="profile-actions">
          {editMode ? (
            <React.Fragment>
              <button onClick={handleSave} className="profile-action-button">Save</button>
              <button onClick={handleCancel} className="profile-action-button2">Cancel</button>
              { formData.type === "usuario" && <button onClick={handleSendMail} className="profile-action-button3"> Solicitar cambio a fundacion</button>}
            </React.Fragment>
          ) : (
            <React.Fragment>
            <button onClick={handleEdit} className="profile-action-button">Edit</button>
            </React.Fragment>
          )}
        </div>
    </div>
      
)}

export default Profile 