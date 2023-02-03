import React from 'react'
import styles from './paginado.module.css'

function Paginado({dogsPerPage, allPets, paginado }) {
    const pageNumber = [];

    for (let i = 0; i < Math.ceil (allPets / dogsPerPage); i++){
        pageNumber.push(i + 1)
    }
  return (
    <box className={styles.paginado}>
        <ul className={styles.paginacion}>
            {
                pageNumber?.map(number => (
                    <li className={styles.numberPaginado} >
                        <button className={styles.buttonPaginated} onClick={() => paginado(number)}> {number} </button>
                    </li>
                ))
            }
        </ul>
    </box>
  )
}

export default Paginado