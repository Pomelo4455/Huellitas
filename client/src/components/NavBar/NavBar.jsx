import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import LoginButton from "../LoginButton/LoginButton";
import LogoutButton from "../LogoutButton/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import { handleSelectedFilter } from "../Sidebar/handlersSideBar";
import { useDispatch, useSelector } from "react-redux";
import {
  restoreSearch,
  sendProfileToDb,
  clearProfile,
  login_success,
} from "../../redux/actions";
import swal from "sweetalert";
import { profileCreationInfo } from "../../Utils/profileFunctions";
// import { Icon } from '@iconify/react';

import styles from "./navBar.module.css";


const NavBar = (
  {loggedUser,setLoggedUser}
  ) => {
  // console.log(loggedUser)
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading } = useAuth0();
  
  const profile = useSelector((state) => state.profile);
    useEffect(() => {}, [profile]);

  useEffect(() => {
    if (isAuthenticated) {
      let prof = profileCreationInfo(user);
      // console.log(user)
      // localStorage.setItem('user', JSON.stringify(prof))
      // console.log(prof)
      dispatch(sendProfileToDb(prof,setLoggedUser));
      dispatch(login_success());
    } else {
      // localStorage.setItem('user', JSON.stringify({}))
      // localStorage.setItem("loggedUser", JSON.stringify({}));

      console.log("not logged in");
      // clearProfile()
    }
  }, [isAuthenticated]);

  // useEffect(()=>
  // setLoggedUser(JSON.parse(window.localStorage.getItem('loggedUser'))),
  // [window.localStorage]
  // )

  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const [showEdit, setShowEdit] = useState(false);

  const handleEdit = () => {
    setShowEdit(!showEdit);
  };


  return (
    <nav className={styles.nav}>

      <button 
        className={styles.dropdownButton} 
        onClick={handleDropdown}
      >
        {
          showDropdown 
          ? <Icon 
              icon="line-md:menu-to-close-alt-transition" 
              className={styles.iconClosed}
            />
          : <Icon 
              icon="material-symbols:menu" 
              className={styles.iconOpen}
            />
        }
      </button>

      <div className={showDropdown ? '' : styles.toggled}>

        <ul className={styles.leftContainer}>

          <li onClick={handleDropdown}>
            <Link to="/home" className={styles.leftLinks}>
              Home
            </Link>
          </li>
          <li onClick={handleDropdown}>
            <Link to="/sobreNosotros" className={styles.leftLinks}>
              Sobre Nosotros
            </Link>
          </li>
        </ul>
      </div>

        <div className={styles.title}>
          <Icon className={styles.img} icon="material-symbols:pets"  />
          <div className={styles.txt}>
            <Link to="/home" className={styles.txt}>
              Huellitas
            </Link>
          </div>
        </div>

        <div className={styles.buttonContainer}>
          {loggedUser ? (
            <div className={styles.infoSession}>
              {/* <h4>Ha iniciado sesión como: {loggedUser.name.toUpperCase()}</h4> */}
              <img 
                src={loggedUser.image}
                onClick={handleEdit}
              />
              <div 
                className=
                {
                  showEdit ? styles.toggleUser : styles.toggleUserNone
                }
              >
                <div>
                  <Link 
                    to='/Profile' 
                    onClick={handleEdit}
                    className={styles.editBtnContainer}
                  >
                    <button className={styles.buttonEdit}>
                      Editar perfil
                    </button>
                  </Link>
                </div>
                <div 
                  className={styles.logoutContainer} 
                  onClick={handleEdit}
                >
                  <LogoutButton />
                </div>
              </div>
            </div>
          ) : (
            <>
              <LoginButton />
            </>
          )}
        </div>

    </nav>
  );
};

export default NavBar;
