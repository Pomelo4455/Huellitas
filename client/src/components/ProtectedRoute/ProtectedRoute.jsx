import React from "react"
// import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

export const AdminProtectedRoute=({children})=>{
    let profile=JSON.parse(window.localStorage.getItem('loggedUser'))
    console.log(profile.data && profile.data.type)

    if (!profile.data || profile.data.type!=="admin") {return <Navigate to="/unauthRedirect/admin"/>}
    return children
}

export const FoundationProtectedRoute=({children})=>{
    let profile=JSON.parse(window.localStorage.getItem('loggedUser'))
    console.log(profile.data && profile.data.type)

    if (!profile.data || profile.data.type!=="fundacion") {return <Navigate to="/unauthRedirect/foundation"/>}
    return children
}

export const UserProtectedRoute=({children})=>{
    let profile=JSON.parse(window.localStorage.getItem('loggedUser'))
    console.log(profile.data && profile.data.type)

    if (!profile.data) {return <Navigate to="/unauthRedirect/user"/>}
    return children
}