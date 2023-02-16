import React, { useEffect, useState } from "react";
import Fundation from "./CardFundacion";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFundaciones, restoreSearch } from "../../redux/actions";
import { Icon } from "@iconify/react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

// agregar card de fundacion en el return pasando por props los argumentos necesarios

export default function Fundations() {
    const allFundaciones = useSelector((state) => state.fundaciones);
    console.log(allFundaciones)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        dispatch(getFundaciones());
    }, [dispatch])

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };
    
    const inputSearch = (e) => {
        e.preventDefault();
        if (searchTerm === "") {
            swal({
                title: "Sorry!",
                text: "Debe escribir el nombre de una organizacion",
                icon: "warning",
                button: "Ok",
            });
            setSearchTerm("");
        } else {
            setSearchTerm("");
        }
        //navigate("/home");
    };
    
    const resetSearch = (e) => {
        e.preventDefault();
        dispatch(restoreSearch());
    };
    
    return (
        <div>
            <form onSubmit={inputSearch}>
                <div>
                    <div>
                    <input
                        type="text"
                        placeholder="Buscar fundación:"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <button
                        name="name"
                        value={searchTerm}
                        onClick={inputSearch}
                    >
                        <Icon icon="fa6-solid:magnifying-glass" />
                    </button>
                    </div>
                <button onClick={resetSearch}>
                    Eliminar Búsqueda
                </button>
            </div>
        </form>
            {
            allFundaciones.length ? 
            allFundaciones.map(fundacion => {
                return <Fundation fundacion={fundacion} key={fundacion.id} /> 
            })
            : 'no hay fundaciones'}
        </div>
    )
}
