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
    updateNotReadChats,
} from "../../redux/actions";
import swal from "sweetalert";
import { profileCreationInfo } from "../../Utils/profileFunctions";
// import { Icon } from '@iconify/react';
import axios from "axios";
import styles from "./navBar.module.css";
import RenderFavorites from "./RenderFavorites";
import { LINK_BACK } from "../../Utils/variablesDeploy";
import ProfileSideBar from "../ProfileSideBar/ProfileSideBar";

const NavBar = ({ loggedUser, setLoggedUser }) => {
    // console.log(loggedUser)
    const dispatch = useDispatch();
    const { user, isAuthenticated, isLoading } = useAuth0();
    const noLeidos = useSelector((state) => state.noLeidos);
    const profile = useSelector((state) => state.profile);
    useEffect(() => {}, [profile]);

    useEffect(() => {
        if (loggedUser?.id) {
            axios(
                `${LINK_BACK}/message/noleidos?userId=${loggedUser?.id}`
            ).then((data) => dispatch(updateNotReadChats(data.data.cantidad)));
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            let prof = profileCreationInfo(user);
            // console.log(user)
            // localStorage.setItem('user', JSON.stringify(prof))
            // console.log(prof)
            dispatch(sendProfileToDb(prof, setLoggedUser));
            dispatch(login_success());
        } else {
            // localStorage.setItem('user', JSON.stringify({}))
            // localStorage.setItem("loggedUser", JSON.stringify({}));
            // console.log("not logged in");
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

    const [viewFavorites, setViewFavorites] = useState(false);

    const handleViewFavorites = () => {
        setViewFavorites(!viewFavorites);
    };

    return (
        <nav className={styles.nav}>
            <button className={styles.dropdownButton} onClick={handleDropdown}>
                {showDropdown ? (
                    <Icon
                        icon="line-md:menu-to-close-alt-transition"
                        className={styles.iconClosed}
                    />
                ) : (
                    <Icon
                        icon="material-symbols:menu"
                        className={styles.iconOpen}
                    />
                )}
            </button>

            <div className={styles.listContainer}>
              <div className={showDropdown ? "" : styles.toggled}>

                <ul className={styles.leftContainer}>

                  <div className={styles.leftContainerList}>
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

                  </div>

                  <div className={styles.rightContainer}>
                    {
                      loggedUser && viewFavorites ? 
                      (
                        

                        // FAVS
                        <li>
                            <Icon
                                onClick={handleViewFavorites}
                                className={styles.followButton}
                                icon="ph:heart"
                            />
                            <div>
                              <div className={styles.infoSession}>
                                  <RenderFavorites
                                      handleOcultFavorites={
                                        handleViewFavorites
                                      }
                                      />
                              </div>
                            </div>
                        </li>
                      
                      ) 
                      : loggedUser ? 
                      (

                        <li>

                          <Icon
                            onClick={handleViewFavorites}
                            className={styles.followButton}
                            icon="ph:heart"
                          />
                          
                        </li>
                      ) 
                      : null
                    }

                      <div className={styles.buttonContainer}>
                        {
                          
                          // PROFILE
                          loggedUser ? 
                          (
                            <div className={styles.infoSession}>
                              <img
                                  src={loggedUser.image}
                                  onClick={handleEdit}
                              />
                              <div
                                className={
                                  showEdit
                                  ? styles.toggleUser
                                  : styles.toggleUserNone
                                }
                              >
                              
                              <ProfileSideBar 
                                handleEdit={handleEdit}
                                noLeidos={noLeidos}
                              />
                                        
                              </div>
                            </div>
                            ) : (
                                <>
                                    <LoginButton />

                                </>
                            )}
                        </div>
                    </div>
                  </ul>
              </div>
            </div>

            <div className={styles.title}>
                <div className={styles.txt}>
                <Icon className={styles.img} icon="material-symbols:pets" />
                    <Link to="/home" className={styles.txt}>
                        Huellitas
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
