import styles from "./UserDetail.module.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDetail } from "../../redux/actions";
import Card from "../Card/Card";
import Campaing from "../Campaigns/Campaing";
import facebookIcon from "../../img/facebookIcon.jpg";
import instagramIcon from "../../img/instagramIcon.webp";
import tiktokIcon from "../../img/tiktokIcon.png";

const UserDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(id));
  }, [id, dispatch]);

  const detail = useSelector((state) => state.userDetail);
  console.log(detail);
  return (
    <>
      <div className={styles.detailUserContainer}>
        <div className={styles.detailUserInformation}>
          {detail.type === "usuario" ? (
            <div className={styles.userStatus}>
              <h2>Detalle del usuario</h2>
            </div>
          ) : detail.type === "fundacion" ? (
            <div className={styles.userStatus}>
              <h2>Detalle de la fundacion</h2>
            </div>
          ) : (
            <div className={styles.userStatus}>
              <h2>Detalle del administrador</h2>
            </div>
          )}
          <div className={styles.userImage}>
            <img src={detail.image} alt={detail.name} />
          </div>
          <div className={styles.btnContainer}>
            <button
              onClick={() => window.history.back()}
              className={styles.btnContactBack}
            >
              VOLVER
            </button>
          </div>
        </div>

        <div className={styles.detailUserDescription}>
          <div className={styles.descriptionUserContainer}>
            {detail.name !== "" && (
              <p>
                <span>Nombre :</span> {detail.name}
              </p>
            )}

            {detail.email !== "" && (
              <p>
                <span>Email :</span> {detail.email}
              </p>
            )}

            {detail.phone !== "" && (
              <p>
                <span>Telefono :</span> {detail.phone}
              </p>
            )}

            {detail.address !== "" && (
              <p>
                <span>Direccion :</span> {detail.address}
              </p>
            )}

            {detail.description !== "" && (
              <p>
                <span>Descripcion :</span> {detail.description}
              </p>
            )}

            {detail.CVU !== "" && (
              <p>
                <span>CVU :</span> {detail.CVU}
              </p>
            )}

            {detail.instagram !== "" ||
            detail.tiktok !== "" ||
            detail.facebook !== "" ? (
              <div>
                <p>
                  <span>Redes sociales :</span>
                </p>
                <div className={styles.redes}>
                  {detail.facebook !== "" && (
                    <div>
                      <a
                        href={detail.facebook}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          className={styles.img_icon}
                          src={facebookIcon}
                          alt={detail.facebook}
                        />
                      </a>
                    </div>
                  )}
                  {detail.instagram !== "" && (
                    <div>
                      <a
                        href={detail.instagram}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          className={styles.img_icon}
                          src={instagramIcon}
                          alt={detail.instagram}
                        />
                      </a>
                    </div>
                  )}
                  {detail.tiktok !== "" && (
                    <div>
                      <a href={detail.tiktok} target="_blank" rel="noreferrer">
                        <img
                          className={styles.img_icon}
                          src={tiktokIcon}
                          alt={detail.tiktok}
                        />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      {detail.giver && detail.giver.length > 0 && (
        <div>
          <div className={styles.userStatus}>
            <h2>Mascotas en adopcion : </h2>
          </div>
          <div className={styles.container}>
            <div className={styles.adoptar}>
              {detail.giver.map((pet) => (
                <Card pets={pet} key={pet.id} />
              ))}
            </div>
          </div>
        </div>
      )}
      {detail.campaigns && detail.campaigns.length > 0 && (
        <div>
          <div className={styles.userStatus}>
            <h2>Campañas activas : </h2>
          </div>
          <div className={styles.container}>
            <div className={styles.adoptar}>
              {detail.campaigns.map((campaign) => (
                <Campaing
                  key={campaign.id}
                  id={campaign.id}
                  title={campaign.title}
                  reason={campaign.reason}
                  description={campaign.description}
                  image={campaign.image}
                  goal={campaign.goal}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      {detail.adoptante && detail.adoptante.length > 0 && (
        <div>
          <div className={styles.userStatus}>
            <h2>Mascotas adoptadas : </h2>
          </div>
          <div className={styles.container}>
            <div className={styles.adoptar}>
              {detail.adoptante.map((pet) => (
                <Card pets={pet} key={pet.id} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserDetail;
