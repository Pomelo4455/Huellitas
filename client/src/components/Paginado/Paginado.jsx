import React, { useState } from "react";
import styles from "./paginado.module.css";

function Paginado({ paginado, currentPage, petMax }) {
  const [input, setInput] = useState(1);
  const pageNumber = [];
  const nextPage = () => {
    setInput(input + 1);
    paginado(currentPage + 1);
  };
  const previusPage = () => {
    setInput(input - 1);
    paginado(currentPage - 1);
  };

  const firstPage = () => {
    setInput(1);
    paginado(1);
  };

  const lastPage = () => {
    setInput(petMax);
    paginado(petMax);
  };

  for (let i = 0; i < petMax; i++) {
    pageNumber.push(i + 1);
  }
  return (
    <div className={styles.paginado}>
      <button
        title="firstPage"
        onClick={firstPage}
        className={styles.buttonPaginated}
      >
        {"<<"}
      </button>
      <button
        title="previusPage"
        onClick={previusPage}
        className={styles.buttonPaginated}
        disabled={currentPage === 1 || currentPage < 1}
      >
        {"<"}
      </button>
      <ul className={styles.paginacion}>
        {pageNumber?.map((number, index) => (
          <li key={index} className={styles.numberPaginado}>
            <button
              className={
                index === currentPage - 1
                  ? styles.buttonPaginatedActive
                  : styles.buttonPaginated
              }
              onClick={() => paginado(number)}
            >
              {" "}
              {number}{" "}
            </button>
          </li>
        ))}
      </ul>
      <button
        title="nextPage"
        onClick={nextPage}
        className={styles.buttonPaginated}
        disabled={currentPage === petMax}
      >
        {">"}
      </button>
      <button
        title="lastPage"
        onClick={lastPage}
        className={styles.buttonPaginated}
      >
        {">>"}
      </button>
    </div>
  );
}

export default Paginado;
