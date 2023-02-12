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
  getUsers,
  deleteUsers,
  deleteCampaigns,
  getCampaignsAdm,
  getPetsAdm,
  deletePets,
} from "../../redux/actions";
import DataTable from "react-data-table-component";

const DashBoardAdm = () => {
  const datos = useSelector((state) => state.users);
  const campañas = useSelector((state) => state.campaigns);
  const mascotas = useSelector((state) => state.pets);
  const [deletuse, setDelete] = useState(null);
  const [modalDetailProfile, setModalDetailProfile] = useState(false);
  const [modalEditProfile, setModalEditProfile] = useState(false);
  const [modalDetailCampaign, setModalDetailCampaign] = useState(false);
  const [modalEditCampaign, setModalEditCampaign] = useState(false);
  const [modalDetailPet, setModalDetailPet] = useState(false);
  const [modalEditPet, setModalEditPet] = useState(false);
  const defaultData = "No existe informacion";
  let dataModal = JSON.parse(localStorage.getItem("dataChange"));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
    dispatch(getCampaignsAdm());
    dispatch(getPetsAdm());
    setDelete(null);
  }, [deletuse, modalEditProfile, modalEditCampaign, modalEditPet]);

  const columnsUser = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
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
        <select onChange={(e) => handleSelectTypeUser(row, e)} value={row.type}>
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
        >
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
          <option value="baneado">Baneado</option>
        </select>
      ),
    },
    {
      name: "Detalles",
      cell: (row) => <button onClick={() => handleClick(row)}>Buscar</button>,
    },
    {
      name: "Editar",
      cell: (row) => (
        <button onClick={() => handleClickTwo(row)}>Editar</button>
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
        <button onClick={() => handleClickThree(row)}>Buscar</button>
      ),
    },
    {
      name: "Editar",
      cell: (row) => (
        <button onClick={() => handleClickFour(row)}>Editar</button>
      ),
    },
  ];

  const columnsPets = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Nombre",
      selector: (row) => row.name,
      sortable: true,
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
    },
    {
      name: "Edad",
      selector: (row) => row.age,
      sortable: true,
    },
    {
      name: "Donador",
      selector: (row) => row.giver,
      sortable: true,
    },
    {
      name: "ID de usuario",
      selector: (row) => row.userId,
      sortable: true,
    },
    {
      name: "Fue adoptado?",
      selector: (row) => row.adopted,
      sortable: true,
    },
    {
      name: "Deleted",
      selector: (row) => row.deleted,
      sortable: true,
    },
    {
      name: "Change Adopted",
      cell: (row) => (
        <select
          onChange={(e) => handleSelectAdoptedPets(row, e)}
          value={row.adopted}
        >
          <option value="si">Si</option>
          <option value="no">No</option>
        </select>
      ),
    },
    {
      name: "Change Deleted",
      cell: (row) => (
        <select
          onChange={(e) => handleSelectDeletedPets(row, e)}
          value={row.deleted}
        >
          <option value="si">Si</option>
          <option value="no">No</option>
        </select>
      ),
    },
    {
      name: "Detalles",
      cell: (row) => (
        <button onClick={() => handleClickFive(row)}>Buscar</button>
      ),
    },
    {
      name: "Editar",
      cell: (row) => (
        <button onClick={() => handleClickSix(row)}>Editar</button>
      ),
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

  const paginateOptions = {
    rowsPerPageText: "Filas por pagina",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

  return (
    <>
      {/* <NavBar /> */}
      <h2>DashBoard Administrador</h2>
      <DataTable
        title="Usuarios"
        columns={columnsUser}
        data={datos}
        pagination
        paginationComponentOptions={paginateOptions}
      />
      <DataTable
        title="Campañas"
        columns={columnsCampaigns}
        data={campañas}
        pagination
        paginationComponentOptions={paginateOptions}
      />
      <DataTable
        title="Mascotas"
        columns={columnsPets}
        data={mascotas}
        pagination
        paginationComponentOptions={paginateOptions}
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
    </>
  );
};

export default DashBoardAdm;
