import { updateFilters, setCurrentPage } from "../../redux/actions";
import { LINK_BACK } from "../../Utils/variablesDeploy";

export const handleSelectedFilter = (e, filtros, dispatch) => {
    e.preventDefault();
    dispatch(updateFilters({...filtros, [e.target.name]: e.target.value}));
    dispatch(setCurrentPage(1));
}

export const handleCleanFilter = (e, filtros, dispatch) => {
    e.preventDefault();
    if (e.target.name === "delete filters") dispatch(updateFilters({...filtros, size: "", species: "", sex: "", order: ""}));
   // else if (e.target.name === "delete order") dispatch(updateFilters({...filtros, order: ""}));
    else dispatch(updateFilters({...filtros, name: ""}));
    dispatch(setCurrentPage(1));
}

export const combinarFiltros = (filtros) => {
    return `${LINK_BACK}/pets?sex=${filtros.sex}&size=${filtros.size}&species=${filtros.species}&order=${filtros.order}&name=${filtros.name}&giverId=${filtros.giverId}&adopted=no`;
}
  