import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import EditProfile from "./EditProfile.jsx";
import DetailProfile from "./DetailProfile.jsx";
import EditCampaign from "./EditCampaign.jsx";
import DetailCampaign from "./DetailCampaign.jsx";
import EditPet from "./EditPet.jsx";
import DetailPet from "./DetailPet.jsx";
import styles from "./dashBoardAdm.module.css";
import swal from "sweetalert";
// import NavBar from "../NavBar/NavBar";
import {
  deleteUsers,
  getCampaignsAdm,
  getPetsAdm,
  getSearchCampaign,
  getSearchPet,
  getUsersAdm,
  getSearchUser,
  getDonations,
} from "../../redux/actions";
import DataTable, { createTheme } from "react-data-table-component";

const DashBoardAdm = () => {
  const datos = useSelector((state) => state.users);
  const campañas = useSelector((state) => state.campaigns);
  const mascotas = useSelector((state) => state.pets);
  const donaciones = useSelector((state) => state.donations);
  const [deletuse, setDelete] = useState(null);
  const [modalDetailProfile, setModalDetailProfile] = useState(false);
  const [modalEditProfile, setModalEditProfile] = useState(false);
  const [modalDetailCampaign, setModalDetailCampaign] = useState(false);
  const [modalEditCampaign, setModalEditCampaign] = useState(false);
  const [modalDetailPet, setModalDetailPet] = useState(false);
  const [modalEditPet, setModalEditPet] = useState(false);
  const [searchUser, setSearchUser] = useState("");
  const [searchCampaign, setSearchCampaign] = useState("");
  const [searchPet, setSearchPet] = useState("");
  const defaultData = "No existe informacion";
  let dataModal = JSON.parse(localStorage.getItem("dataChange"));
  const handleSearchUser = (event) => {
    setSearchUser(event.target.value);
  };
  const handleSearchCampaign = (event) => {
    setSearchCampaign(event.target.value);
  };
  const handleSearchPet = (event) => {
    setSearchPet(event.target.value);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsersAdm());
    dispatch(getCampaignsAdm());
    dispatch(getPetsAdm());
    dispatch(getDonations());
    setDelete(null);
  }, [deletuse, modalEditProfile, modalEditCampaign, modalEditPet]);

  const inputSearchUser = (e) => {
    e.preventDefault();
    if (searchUser === "") {
      swal({
        title: "Sorry!",
        text: "Debe escribir el nombre de un usuario",
        icon: "warning",
        button: "Ok",
      });
      setSearchUser("");
    } else {
      dispatch(getSearchUser(searchUser));
      setSearchUser("");
    }
  };

  const resetUser = (e) => {
    e.preventDefault();
    dispatch(getUsersAdm());
  };

  const inputSearchCampaign = (e) => {
    e.preventDefault();
    if (searchCampaign === "") {
      swal({
        title: "Sorry!",
        text: "Debe escribir el titulo de una campaña",
        icon: "warning",
        button: "Ok",
      });
      setSearchCampaign("");
    } else {
      dispatch(getSearchCampaign(searchCampaign));
      setSearchCampaign("");
    }
  };

  const resetCampaign = (e) => {
    e.preventDefault();
    dispatch(getCampaignsAdm());
  };

  const inputSearchPet = (e) => {
    e.preventDefault();
    if (searchPet === "") {
      swal({
        title: "Sorry!",
        text: "Debe escribir el nombre de una mascota",
        icon: "warning",
        button: "Ok",
      });
      setSearchPet("");
    } else {
      dispatch(getSearchPet(searchPet));
      setSearchPet("");
    }
  };

  const resetPet = (e) => {
    e.preventDefault();
    dispatch(getPetsAdm());
  };

  const columnsUser = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      width: "70px",
    },
    {
      name: "Tipo",
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: "Nombre",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Estado",
      selector: (row) => row.status,
      sortable: true,
    },

    {
      name: "Cambio de Tipo",
      cell: (row) => (
        <select
          onChange={(e) => handleSelectTypeUser(row, e)}
          value={row.type}
          className={styles.dashBoardAdm_select_Table}
        >
          <option value="usuario">Usuario</option>
          <option value="fundacion">Fundacion</option>
          <option value="admin">Administrador</option>
        </select>
      ),
    },
    {
      name: "Cambio de Estado",
      cell: (row) => (
        <select
          onChange={(e) => handleSelectStatusUser(row, e)}
          value={row.status}
          className={styles.dashBoardAdm_select_Table}
        >
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
          <option value="baneado">Baneado</option>
        </select>
      ),
    },
    {
      name: "Detalles",
      cell: (row) => (
        <button
          className={styles.dashBoardAdm_button_Table}
          onClick={() => handleClick(row)}
        >
          Ver
        </button>
      ),
    },
    {
      name: "Editar",
      cell: (row) => (
        <button
          className={styles.dashBoardAdm_button_Table}
          onClick={() => handleClickTwo(row)}
        >
          Editar
        </button>
      ),
    },
  ];

  const columnsCampaigns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Titulo",
      selector: (row) => row.title,
      sortable: true,
      grow: 3,
    },
    {
      name: "ID de Usuario",
      selector: (row) => row.userId,
      sortable: true,
    },
    {
      name: "Meta",
      selector: (row) => row.goal,
      sortable: true,
    },
    {
      name: "Recolectado",
      selector: (row) => row.collected,
      sortable: true,
    },
    {
      name: "Estado",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Cambio de Estado",
      cell: (row) => (
        <select
          onChange={(e) => handleSelectStatusCampaigns(row, e)}
          value={row.status}
          className={styles.dashBoardAdm_select_Table}
        >
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
          <option value="baneado">Baneado</option>
        </select>
      ),
    },
    {
      name: "Detalles",
      cell: (row) => (
        <button
          className={styles.dashBoardAdm_button_Table}
          onClick={() => handleClickThree(row)}
        >
          Ver
        </button>
      ),
    },
    {
      name: "Editar",
      cell: (row) => (
        <button
          className={styles.dashBoardAdm_button_Table}
          onClick={() => handleClickFour(row)}
        >
          Editar
        </button>
      ),
    },
  ];

  const columnsPets = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      width: "70px",
    },
    {
      name: "Nombre",
      selector: (row) => row.name,
      sortable: true,
      width: "150px",
    },
    {
      name: "Especie",
      selector: (row) => row.species,
      sortable: true,
    },
    {
      name: "Sexo",
      selector: (row) => row.sex,
      sortable: true,
    },
    {
      name: "Tamaño",
      selector: (row) => row.size,
      sortable: true,
    },
    {
      name: "Color",
      selector: (row) => row.color,
      sortable: true,
      width: "210px",
    },
    {
      name: "Edad",
      selector: (row) => row.age,
      sortable: true,
      width: "160px",
    },
    {
      name: "Donador",
      selector: (row) => row.giver,
      sortable: true,
      grow: 3,
    },
    {
      name: "ID de usuario",
      selector: (row) => row.userId,
      sortable: true,
      width: "120px",
    },
    {
      name: "Fue adoptado?",
      selector: (row) => row.adopted,
      sortable: true,
      width: "130px",
    },
    {
      name: "Fue eliminado?",
      selector: (row) => row.deleted,
      sortable: true,
      width: "130px",
    },
    {
      name: "Cambiar adopcion",
      cell: (row) => (
        <select
          onChange={(e) => handleSelectAdoptedPets(row, e)}
          value={row.adopted}
          className={styles.dashBoardAdm_select_Table}
        >
          <option value="si">Si</option>
          <option value="no">No</option>
        </select>
      ),
      width: "150px",
    },
    {
      name: "Cambiar eliminacion",
      cell: (row) => (
        <select
          onChange={(e) => handleSelectDeletedPets(row, e)}
          value={row.deleted}
          className={styles.dashBoardAdm_select_Table}
        >
          <option value="si">Si</option>
          <option value="no">No</option>
        </select>
      ),
      width: "150px",
    },
    {
      name: "Detalles",
      cell: (row) => (
        <button
          className={styles.dashBoardAdm_button_Table}
          onClick={() => handleClickFive(row)}
        >
          Ver
        </button>
      ),
    },
    {
      name: "Editar",
      cell: (row) => (
        <button
          className={styles.dashBoardAdm_button_Table}
          onClick={() => handleClickSix(row)}
        >
          Editar
        </button>
      ),
    },
  ];

  const columnsDonations = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Estado",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Cantidad",
      selector: (row) => row.amount,
      sortable: true,
    },
    {
      name: "UserId",
      selector: (row) => row.userId,
      sortable: true,
    },
    {
      name: "CampaignId",
      selector: (row) => row.campaignId,
      sortable: true,
    },
  ];
  const handleClick = (row) => {
    localStorage.setItem("dataChange", JSON.stringify(row));
    setModalDetailProfile(true);
  };
  const handleClickTwo = (row) => {
    localStorage.setItem("dataChange", JSON.stringify(row));
    setModalEditProfile(true);
  };
  const handleClickThree = (row) => {
    localStorage.setItem("dataChange", JSON.stringify(row));
    setModalDetailCampaign(true);
  };
  const handleClickFour = (row) => {
    localStorage.setItem("dataChange", JSON.stringify(row));
    setModalEditCampaign(true);
  };
  const handleClickFive = (row) => {
    localStorage.setItem("dataChange", JSON.stringify(row));
    setModalDetailPet(true);
  };
  const handleClickSix = (row) => {
    localStorage.setItem("dataChange", JSON.stringify(row));
    setModalEditPet(true);
  };
  const handleSelectTypeUser = (row, e) => {
    let userId = row.id;
    let value = e.target.value;
    swal({
      title: "Estas seguro?",
      text: "Al presionar el botón 'OK', se aplicará el cambio de tipo del usuario.",
      icon: "warning",
      dangerMode: false,
      buttons: ["Cancelar", "Ok"],
    }).then((willDelete) => {
      if (willDelete) {
        swal("El cambio de tipo ha sido efectuado", {
          icon: "success",
        }).then(() => {
          dispatch(
            deleteUsers(`http://localhost:3001/users/${userId}?type=${value}`)
          );
          setDelete(`${value}`);
        });
      } else {
        swal("No se efectuo ningun cambio");
      }
    });
  };
  const handleSelectStatusUser = (row, e) => {
    let userId = row.id;
    let value = e.target.value;
    swal({
      title: "Estas seguro?",
      text: "Al presionar el botón 'OK', se aplicará el cambio de estado del usuario.",
      icon: "warning",
      buttons: ["Cancelar", "Ok"],
      dangerMode: false,
    }).then((willDelete) => {
      if (willDelete) {
        swal("El cambio de estado ha sido efectuado", {
          icon: "success",
        }).then(() => {
          dispatch(
            deleteUsers(`http://localhost:3001/users/${userId}?status=${value}`)
          );
          setDelete(`${value}`);
        });
      } else {
        swal("No se efectuo ningun cambio");
      }
    });
  };
  const handleSelectStatusCampaigns = (row, e) => {
    let CampaignId = row.id;
    let value = e.target.value;
    swal({
      title: "Estas seguro?",
      text: "Al presionar el botón 'OK', se aplicará el cambio de estado de la campaña.",
      icon: "warning",
      dangerMode: false,
      buttons: ["Cancelar", "Ok"],
    }).then((willDelete) => {
      if (willDelete) {
        swal("El cambio de estado ha sido efectuado", {
          icon: "success",
        }).then(() => {
          dispatch(
            deleteUsers(
              `http://localhost:3001/campaigns/${CampaignId}?status=${value}`
            )
          );
          setDelete(`${value}`);
        });
      } else {
        swal("No se efectuo ningun cambio");
      }
    });
  };
  const handleSelectAdoptedPets = (row, e) => {
    let petId = row.id;
    let value = e.target.value;
    swal({
      title: "Estas seguro?",
      text: "Al presionar el botón 'OK', se aplicará el cambio de adopcion de la mascota.",
      icon: "warning",
      buttons: ["Cancelar", "Ok"],
      dangerMode: false,
    }).then((willDelete) => {
      if (willDelete) {
        swal("El cambio de adopcion ha sido efectuado", {
          icon: "success",
        }).then(() => {
          dispatch(
            deleteUsers(`http://localhost:3001/pets/${petId}?adopted=${value}`)
          );
          setDelete(`${value}`);
        });
      } else {
        swal("No se efectuo ningun cambio");
      }
    });
  };
  const handleSelectDeletedPets = (row, e) => {
    let petId = row.id;
    let value = e.target.value;
    swal({
      title: "Estas seguro?",
      text: "Al presionar el botón 'OK', se aplicará el cambio de estado de la mascota.",
      icon: "warning",
      buttons: ["Cancelar", "Ok"],
      dangerMode: false,
    }).then((willDelete) => {
      if (willDelete) {
        swal("El cambio de estado ha sido efectuado", {
          icon: "success",
        }).then(() => {
          dispatch(
            deleteUsers(`http://localhost:3001/pets/${petId}?deleted=${value}`)
          );
          setDelete(`${value}`);
        });
      } else {
        swal("No se efectuo ningun cambio");
      }
    });
  };

  createTheme("solarized", {
    text: {
      primary: "#268bd2",
      secondary: "#2aa198",
    },
    background: {
      default: "#c2f4ff",
    },
    context: {
      background: "#cb4b16",
      text: "#FFFFFF",
    },
    divider: {
      default: "#073642",
    },
    button: {
      default: "#2aa198",
      hover: "rgba(0,0,0,.08)",
      focus: "rgba(255,255,255,.12)",
      disabled: "rgba(255, 255, 255, .34)",
    },
    sortFocus: {
      default: "#2aa198",
    },
  });

  const paginateOptions = {
    rowsPerPageText: "Filas por pagina",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

  return (
    <div className={styles.dashBoardAdm_container}>
      {/* <h2>DashBoard Administrador</h2> */}
      <div className={styles.dashBoardAdm_searchbar}>
        <input
          type="text"
          placeholder="Buscar al usuario :"
          value={searchUser}
          onChange={handleSearchUser}
          className={styles.dashBoardAdm_search}
        />
        <button
          className={styles.dashBoardAdm_button}
          value={searchUser}
          onClick={inputSearchUser}
        >
          Buscar Usuario
        </button>
        <button onClick={resetUser} className={styles.dashBoardAdm_button}>
          Eliminar busqueda
        </button>
      </div>
      <DataTable
        title="Usuarios"
        columns={columnsUser}
        data={datos}
        pagination
        paginationComponentOptions={paginateOptions}
        theme="solarized"
      />
      <div className={styles.dashBoardAdm_searchbar}>
        <input
          type="text"
          placeholder="Buscar la campaña :"
          value={searchCampaign}
          onChange={handleSearchCampaign}
          className={styles.dashBoardAdm_search}
        />
        <button
          value={searchCampaign}
          onClick={inputSearchCampaign}
          className={styles.dashBoardAdm_button}
        >
          Buscar Campaña
        </button>
        <button onClick={resetCampaign} className={styles.dashBoardAdm_button}>
          Eliminar busqueda
        </button>
      </div>
      <DataTable
        title="Campañas"
        columns={columnsCampaigns}
        data={campañas}
        pagination
        paginationComponentOptions={paginateOptions}
        theme="solarized"
      />
      <div className={styles.dashBoardAdm_searchbar}>
        <input
          type="text"
          placeholder="Buscar la mascota :"
          value={searchPet}
          onChange={handleSearchPet}
          className={styles.dashBoardAdm_search}
        />
        <button
          value={searchPet}
          onClick={inputSearchPet}
          className={styles.dashBoardAdm_button}
        >
          Buscar Mascota
        </button>
        <button onClick={resetPet} className={styles.dashBoardAdm_button}>
          Eliminar busqueda
        </button>
      </div>
      <DataTable
        title="Mascotas"
        columns={columnsPets}
        data={mascotas}
        pagination
        paginationComponentOptions={paginateOptions}
        theme="solarized"
      />
      <DataTable
        title="Donaciones"
        columns={columnsDonations}
        data={donaciones}
        pagination
        paginationComponentOptions={paginateOptions}
        theme="solarized"
      />

      {modalDetailProfile && (
        <DetailProfile
          dataModal={dataModal}
          defaultData={defaultData}
          setModalDetailProfile={setModalDetailProfile}
        />
      )}

      {modalEditProfile && (
        <EditProfile
          dataModal={dataModal}
          setModalEditProfile={setModalEditProfile}
        />
      )}

      {modalDetailCampaign && (
        <DetailCampaign
          dataModal={dataModal}
          defaultData={defaultData}
          setModalDetailCampaign={setModalDetailCampaign}
        />
      )}

      {modalEditCampaign && (
        <EditCampaign
          dataModal={dataModal}
          setModalEditCampaign={setModalEditCampaign}
        />
      )}

      {modalDetailPet && (
        <DetailPet
          dataModal={dataModal}
          defaultData={defaultData}
          setModalDetailPet={setModalDetailPet}
        />
      )}

      {modalEditPet && (
        <EditPet dataModal={dataModal} setModalEditPet={setModalEditPet} />
      )}
    </div>
  );
};

export default DashBoardAdm;
