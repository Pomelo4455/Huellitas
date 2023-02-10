import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import styles from "./dashBoardAdm.module.css";
// import NavBar from "../NavBar/NavBar";
import {
  getUsers,
  getCampaigns,
  getPets,
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

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
    dispatch(getCampaignsAdm());
    dispatch(getPetsAdm());
    setDelete(null);
  }, [deletuse]);

  const columnsUser = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },

    {
      name: "Change type",
      cell: (row) => (
        <select onChange={(e) => handleSelectTypeUser(row, e)} value={row.type}>
          <option value="usuario">Usuario</option>
          <option value="fundacion">Fundacion</option>
          <option value="admin">Administrador</option>
        </select>
      ),
    },
    {
      name: "Change status",
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
  ];

  const columnsCampaigns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "UserID",
      selector: (row) => row.userId,
      sortable: true,
    },
    {
      name: "Goal",
      selector: (row) => row.goal,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Change status",
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
  ];

  const columnsPets = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Species",
      selector: (row) => row.species,
      sortable: true,
    },
    {
      name: "Sex",
      selector: (row) => row.sex,
      sortable: true,
    },
    {
      name: "Size",
      selector: (row) => row.size,
      sortable: true,
    },
    {
      name: "Color",
      selector: (row) => row.color,
      sortable: true,
    },
    {
      name: "Age",
      selector: (row) => row.age,
      sortable: true,
    },
    {
      name: "Giver",
      selector: (row) => row.giver,
      sortable: true,
    },
    {
      name: "UserId",
      selector: (row) => row.userId,
      sortable: true,
    },
    {
      name: "Adopted",
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
  ];
  const handleClick = (row) => {
    console.log(
      "Este boton te redirigira al perfil del usuario con el id:",
      row.id
    );
  };
  const handleSelectTypeUser = (row, e) => {
    dispatch(
      deleteUsers(
        `http://localhost:3001/users/${row.id}?type=${e.target.value}`
      )
    );
    setDelete(`${e.target.value}`);
  };
  const handleSelectStatusUser = (row, e) => {
    dispatch(
      deleteUsers(
        `http://localhost:3001/users/${row.id}?status=${e.target.value}`
      )
    );
    setDelete(`${e.target.value}`);
  };
  const handleSelectStatusCampaigns = (row, e) => {
    dispatch(
      deleteCampaigns(
        `http://localhost:3001/campaigns/${row.id}?status=${e.target.value}`
      )
    );
    setDelete(`${e.target.value}`);
  };
  const handleSelectAdoptedPets = (row, e) => {
    dispatch(
      deletePets(
        `http://localhost:3001/pets/${row.id}?adopted=${e.target.value}`
      )
    );
    setDelete(`${e.target.value}`);
  };
  const handleSelectDeletedPets = (row, e) => {
    dispatch(
      deletePets(
        `http://localhost:3001/pets/${row.id}?deleted=${e.target.value}`
      )
    );
    setDelete(`${e.target.value}`);
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
    </>
  );
};

export default DashBoardAdm;
