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



const Profile = ({setLoggedUser}) => {

    const dispatch = useDispatch()
    let profile = useSelector(state => state.profile)
    useEffect(() => {}, [profile])
  
    let userId = JSON.parse(localStorage.getItem("loggedUser"));

    // useEffect(() => {
    //   if (userId) {
    //     dispatch(updateUsers());
    //   }
    // }, [userId]);
  
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
      name: userId.data.name,
      email: userId.data.email,
      phone: userId.data.phone,
      image: userId.data.image,
      adopciones: "No realizaste adopciones",
      donaciones: "No realizaste donaciones",
      status: userId.data.status
    });
  
    const handleEdit = () => {
      setEditMode(true);
    };
    const handleFileChange = (file) => {
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
      console.log(userId.data);
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
     
      <div className="profile-container">
         
      <img src={formData.image} className="profile-avatar"/>
      <div className="profile-info">
        {editMode ? (
          <React.Fragment>
            <Widget publicKey="d00f029a60bdde9dafab" id='image' onChange={handleFileChange} value={formData.image}  />
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="profile-input"/>
            <input type="text" name="phone" placeholder='agregar telefono' value={formData.phone} onChange={handleChange} className="profile-input"/>
            <button onClick={handleStatusChange} className="profile-action-button">{formData.status}</button>
            
          </React.Fragment>
        ) : (
          <React.Fragment>
            <h1 className="profile-name">{formData.name}</h1>
            <p className="profile-email"><strong>Email:</strong> {formData.email}</p>
            <p className="profile-phone" ><strong>Telefono:</strong> {formData.phone}</p>
            <p className="profile-phone"><strong>Adopciones:</strong> {formData.adopciones} </p>
            <p className="profile-phone"><strong>Mis donaciones:</strong> {formData.donaciones} </p>
            {/* <p className="profile-phone"><strong>Status:</strong> {formData.status} </p> */}
          </React.Fragment>
        )}
      </div>
      <div className="profile-actions">
        {editMode ? (
          <React.Fragment>
            <button onClick={handleSave} className="profile-action-button">Save</button>
            <button onClick={handleCancel} className="profile-action-button2">Cancel</button>
          </React.Fragment>
        ) : (
          <React.Fragment>
          <button onClick={handleEdit} className="profile-action-button">Edit</button>

          </React.Fragment>
        )}
      </div>
      <MapView/>

    </div>
    </div>
      
)}

export default Profile 