import { Icon } from "@iconify/react";
import React from "react";
import { Link } from "react-router-dom";
import LogoutButton from "../LogoutButton/LogoutButton";

import styles from "./profileSideBar.module.css";

const ProfileSideBar = ({ handleEdit, noLeidos }) => {
    return (
        <div className={styles.sideBar}>

            <div 
                className={styles.closedSide}
                onClick={handleEdit}
            >
                <p>X</p>
            </div>

            <div>
                <Link
                    to="/Profile"
                    onClick={handleEdit}
                    className={styles.editBtnContainer}
                >
                    <button className={styles.buttonEdit}>Editar perfil</button>
                </Link>
            </div>
            <Link
                to="/chats"
                onClick={handleEdit}
                className={styles.editBtnContainer}
            >
                <button className={styles.buttonEdit}>
                    Ver mensajes
                    {noLeidos <= 0 ? null : noLeidos <= 9 ? (
                        <div>
                            <Icon
                                icon={`mdi:number-${noLeidos}-circle`}
                                width={"30px"}
                                height={"30px"}
                                style={{
                                    marginTop: "10px",
                                }}
                            />
                        </div>
                    ) : (
                        <div>
                            <Icon
                                icon="mdi:number-9-plus-circle"
                                width={"30px"}
                                height={"30px"}
                                style={{
                                    marginTop: "10px",
                                }}
                            />
                        </div>
                    )}
                </button>
            </Link>
            <div className={styles.logoutContainer} onClick={handleEdit}>
                <LogoutButton />
            </div>
        </div>
    );
};

export default ProfileSideBar;
