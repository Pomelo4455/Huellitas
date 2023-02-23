import React from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./footer.module.css";
import swal from "sweetalert";
import UserBaneado from '../UserBanedo/UserBaneado';
import {useDispatch, useSelector} from "react-redux"

import Swal from "sweetalert2";
import axios from "axios";
import { updateReview } from "../../redux/actions";
import { LINK_BACK } from "../../Utils/variablesDeploy";

const ADMIN_ID = 1;

function Footer() {
  let user = JSON.parse(window.localStorage.getItem("loggedUser"));
  const { loginWithPopup } = useAuth0();
  const dispatch = useDispatch();
  const flagReview = useSelector(state => state.flagReview);

  const handleContact = () => {
    user.data?.status === 'baneado' ? <UserBaneado /> :
    swal({
      title: "No es posible contactarse.",
      text: "Debe iniciar sesión para hacerlo.",
      icon: "info",
      button: "Ok",
    }).then(() => loginWithPopup());
  };

  const handleNotReview = () => {
    user.data?.status === 'baneado' ? <UserBaneado /> :
    swal({
      title: "No puede dar su opinión.",
      text: "Debe iniciar sesión para hacerlo.",
      icon: "info",
      button: "Ok",
    }).then(() => loginWithPopup());
  };

  const handleReview = async () => {
    if ( user.data?.status === 'baneado' ) return null;
    else {
      let { value: stars } = await Swal.fire({
      title: "Puntúanos",
      input: "range",
      inputAttributes: {
        min: 1,
        max: 5,
        step: 1,
      },
      inputValue: 5,
      showCancelButton: true,
    });

    let { value: review } = await Swal.fire({
      input: "textarea",
      inputLabel: "Dejanos tu opinión",
      inputPlaceholder: "Aqui...",
      inputAttributes: {
        "aria-label": "Type your message here",
      },
      showCancelButton: true,
    });

    if (review || stars) {
      if (!review) review = "";
      if (!stars) stars = 0;
      await axios.put(`${LINK_BACK}/users/${user.data.id}`, {
        stars,
        review,
      });
      Swal.fire("Datos enviados", "", "success");
      dispatch(updateReview(flagReview))
    } else {
      Swal.fire("Datos no enviados", "", "info");
    }
  }
};

  return (
    <div className={styles.footer}>
      <div className={styles.box}>
        {/* <Link to={"/home"} className={styles.texts}>
          <h4 className={styles.texts}>Home</h4>
        </Link>
        <Link to={"/sobreNosotros"} className={styles.texts}>
          <h4 className={styles.texts}>Sobre Nosotros</h4>
        </Link> */}
        {user?.data?.id ? (
          <>
            <h4
              onClick={handleReview}
              className={styles.texts}
              style={{ cursor: "pointer" }}
            >
              ¡Dejanos tu opinión! ❤
            </h4>
            <Link
              to={`/chat/${user.data.id}/${ADMIN_ID}`}
              target="_blank"
              className={styles.texts}
            >
              <h4 className={styles.texts}>Contactanos 💬</h4>
            </Link>
          </>
        ) : (
          <>
            <h4
              onClick={handleNotReview}
              className={styles.texts}
              style={{ cursor: "pointer" }}
            >
              ¡Dejanos tu opinión! ❤
            </h4>
            <h4
              onClick={handleContact}
              className={styles.texts}
              style={{ cursor: "pointer" }}
            >
              Contactanos 💬
            </h4>
          </>
        )}
      </div>
      <div className={styles.box}>
        <figure>
          {user?.data?.type === "admin" ? (
            <Link to={"/DashBoardAdm"}>
              <Icon
                className={styles.feeticon}
                icon="dashicons:admin-generic"
              />
            </Link>
          ) : (
            <Icon className={styles.feeticon} icon="material-symbols:pets" />
          )}
        </figure>
      </div>
      <div className={styles.box1}>
        <div className={styles.box1Icons}>
          <a
            href={"https://www.instagram.com/huellitaswebpets/"}
            target="_blank"
            rel="noreferrer"
          >
            <Icon className={styles.iconSocial} icon="mdi:instagram" />
          </a>
          <a
            href={"https://twitter.com/huellitasweb"}
            target="_blank"
            rel="noreferrer"
          >
            <Icon className={styles.iconSocial} icon="mdi:twitter" />
          </a>
          <Link
            to={
              "https://www.facebook.com/profile.php?viewas=100000686899395&id=100090543606081"
            }
          >
            <Icon className={styles.iconSocial} icon="ic:baseline-facebook" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
