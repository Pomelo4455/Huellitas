import React from "react";
import styles from "./form.module.css";
import BtnBlack from '../BtnBlack/BtnBlack';
import { useState} from "react";
export default function Form() {

const [value] = useState("default");

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.form}>

        <form>
            <label>¿Como se llama? </label>
            <br/>
            <input className={styles.input} type="text"></input>
            <br/>
            <label>¿Que tipo de mascota es? </label>
            <br/>
            <select className={styles.input} defaultValue={value}>
            <option value="default" disabled hidden>Elige una opción</option>
                <option value="dog">Perro</option>
                <option value="cat">Gato</option>
                <option value="goat">Cabra</option>
                <option value="other">Otro</option>
            </select>
            <br/>
            <label>¿Que rango de edad tiene? </label>
            <br/>
            <select className={styles.input} defaultValue={value}>
            <option value="default" disabled hidden>Elige una opción</option>
                <option value="less1">Menos de un año</option>
                <option value="1to2">Entre 1 y 2 años</option>
                <option value="2plus">Más de 2 años</option>
            </select >
            <br/>
            <label>¿Que tamaño alcanzará?: </label>
            <br/>
            <select className={styles.input} defaultValue={value}>
            <option value="default" disabled hidden>Elige una opción</option>
                <option value="small">Pequeño</option>
                <option value="medium">Mediano</option>
                <option value="large">Grande</option>
            </select>
            <br/>
            <label>¿Es macho o hembra? </label>
            <br/>
            <select className={styles.input} defaultValue={value}>
            <option value="default" disabled hidden>Elige una opción</option>
                <option value="male">Macho</option>
                <option value="female">Hembra</option>
            </select>
            <br/>
            <label>Cuentanos un poco sobre su personalidad</label>
            <textarea rows="10" cols="80" ></textarea>
            <br/>
            <label>Sube una linda foto (o varias): </label>
            <br/>
            <input type="file" accept="image/*"></input>
            <div>
            <BtnBlack text='Dar en adopción' type="submit"/>
            </div>
        </form>
        </div>
      </div>
    </div>
  );
}
