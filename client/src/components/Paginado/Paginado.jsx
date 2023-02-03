import React from 'react'
import styles from './paginado.module.css'

function Paginado({dogsPerPage,dogs, paginado }) {
    const pageNumber = [];

    for (let i = 0; i < Math.ceil (dogs / dogsPerPage); i++){
        pageNumber.push(i + 1)
    }
  return (
    <box>
        <ul>
            {
                pageNumber?.map(number => (
                    <li>
                        <button  className={styles.paginated} onClick={() => paginado(number)}> {number} </button>
                    </li>
                ))
            }
        </ul>
    </box>
  )
}

export default Paginado