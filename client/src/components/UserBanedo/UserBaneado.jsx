import React from "react";
import style from './userBaneado.module.css';

export default function UserBaneado () {
    return (
        <div className={style.body}>
            <h1 className={style.baneado}>Su cuenta fue baneada</h1>
            <img className={style.img} src={"https://i.pinimg.com/236x/ff/53/93/ff53935e6607a7fa92c7dce5e8748c88.jpg"} alt='user baneado'/>
        </div>
    )
}