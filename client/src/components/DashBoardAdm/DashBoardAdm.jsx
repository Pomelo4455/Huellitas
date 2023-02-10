import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import styles from "./dashBoardAdm.module.css";
// import NavBar from "../NavBar/NavBar";
import { getUsers, getCampaigns, getPets } from "../../redux/actions";
import ReactDataTable from "react-data-table-component";
import DataTable from "react-data-table-component";

const DashBoardAdm = () => {
  const datos = useSelector((state) => state.users);
  const campañas = useSelector((state) => state.campaigns);
  const mascotas = useSelector((state) => state.pets);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
    dispatch(getCampaigns());
    dispatch(getPets());
  }, []);
  // console.log(datos);
  // console.log(campañas);
  // console.log(mascotas);
  const columnsUser = [
    {
      name: "ID",
      selector: "id",
      sortable: true,
    },
    {
      name: "Type",
      selector: "type",
      sortable: true,
    },
    {
      name: "Name",
      selector: "name",
      sortable: true,
    },
    {
      name: "Email",
      selector: "email",
      sortable: true,
    },
    {
      name: "Status",
      selector: "status",
      sortable: true,
    },

    {
      name: "Change type",
      cell: (row) => (
        <select onChange={(e) => handleSelect(row, e)}>
          <option value="">Seleccione una opcion</option>
          <option value="usuario">Usuario</option>
          <option value="fundacion">Fundacion</option>
          <option value="admin">Administrador</option>
        </select>
      ),
    },
    {
      name: "Change status",
      cell: (row) => (
        <select onChange={(e) => handleSelect(row, e)}>
          <option value="">Seleccione una opcion</option>
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
      selector: "id",
      sortable: true,
    },
    {
      name: "Title",
      selector: "title",
      sortable: true,
    },
    {
      name: "UserID",
      selector: "userId",
      sortable: true,
    },
    {
      name: "Goal",
      selector: "goal",
      sortable: true,
    },
    {
      name: "Status",
      selector: "status",
      sortable: true,
    },
  ];

  const columnsPets = [
    {
      name: "ID",
      selector: "id",
      sortable: true,
    },
    {
      name: "Name",
      selector: "name",
      sortable: true,
    },
    {
      name: "Species",
      selector: "species",
      sortable: true,
    },
    {
      name: "Sex",
      selector: "sex",
      sortable: true,
    },
    {
      name: "Size",
      selector: "size",
      sortable: true,
    },
    {
      name: "Color",
      selector: "color",
      sortable: true,
    },
    {
      name: "Age",
      selector: "age",
      sortable: true,
    },
    {
      name: "Giver",
      selector: "giver",
      sortable: true,
    },
    {
      name: "UserId",
      selector: "userId",
      sortable: true,
    },
    {
      name: "Adopted",
      selector: "adopted",
      sortable: true,
      cell: (row) => (row.adopted ? "Yes" : "No"),
    },
  ];
  const handleClick = (row) => {
    console.log("Este es el id del usuario", row.id);
  };
  const handleSelect = (row, e) => {
    console.log(row, e.target.value, row.id);
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
