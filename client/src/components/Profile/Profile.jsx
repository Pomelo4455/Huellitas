import './profile.css'
import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Icon } from "@iconify/react";
import { profileCreationInfo } from "../../Utils/profileFunctions";
import { useDispatch } from 'react-redux';
import { updateUsers, sendProfileToDb } from "../../redux/actions";
import { Widget } from "@uploadcare/react-widget"
import NavBar from '../NavBar/NavBar';


const Profile = () => {

    const dispatch = useDispatch()
  
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
      phone: "+54 9 543 522-7434",
      avatar: userId.data.avatar,
      adopciones: "No realizaste adopciones",
      donaciones: "No realizaste donaciones"
    });
  
    const handleEdit = () => {
      setEditMode(true);
    };
  
    const handleCancel = () => {
      setEditMode(false);
      localStorage.setItem("loggedUser", JSON.stringify({data: formData}));
  dispatch(updateUsers())

    };
  
    const handleSave = () => {
      setEditMode(false);
      console.log(userId.data)
      dispatch(updateUsers(userId.data.id, formData))
      dispatch(sendProfileToDb(formData))
      console.log(formData);
    };
  
    const handleChange = (event) => {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value
      });
    };

    return(
     <>
     {/* <NavBar /> */}
      <div className="profile-container">
         
      <img src={formData.avatar} alt={formData.image} className="profile-avatar"/>
      <div className="profile-info">
        {editMode ? (
          <React.Fragment>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="profile-input"/>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="profile-input"/>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <h1 className="profile-name">{formData.name}</h1>
            <p className="profile-email"><strong>Email:</strong> {formData.email}</p>
            <p className="profile-phone"><strong>Telefono:</strong> {formData.phone}</p>
            <p className="profile-phone"><strong>Adopciones:</strong> {formData.adopciones} </p>
            <p className="profile-phone"><strong>Mis donaciones:</strong> {formData.donaciones} </p>
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
          <button onClick={handleEdit} className="profile-action-button">Edit</button>
        )}
      </div>
    </div>
    </>
      
)}

export default Profile 