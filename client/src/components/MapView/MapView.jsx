import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Circle, LayerGroup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
//import { useLocation } from "react-router-dom";

const MapView = () => {
    const fillBlueOptions = { fillColor: 'blue' }
    const fillRedOptions = { fillColor: 'red' }
    
    const [state, setState] = useState({
        currentLocation: {lat: '-38.57855194702073', lng: '-58.72306625389777'},
        zoom: 13
    })

    const currentLocationProvider = state.currentLocation;
    console.log('state de GeoLocProvider: ', currentLocationProvider)

    //const location = useLocation();
    //console.log('Location: ', location.state.latitude, location.state.longitude);

    // const navigate = useNavigate();

    //useEffect(() => {
        //if (!location.state.latitude && !location.state.longitude) {
            //const currentLocation = {
                //lat: '51.52438',
                //lng: '-58.72306625389777'
            //}
            //setState({ ...state, currentLocation })
            // navigate("../mapview", { state: {} }, { replace: true }); // Cuando se refresca la página vuelven las coords al estado inicial.
        //} else {
            //setState({...state})
        //}
    //}, [])

    return (
        <MapContainer
            center={['-38.57855194702073', '-58.72306625389777']}
            zoom={state.zoom}
            scrollWheelZoom={false}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <LayerGroup>
                <Circle center={['-38.57855194702073', '-58.72306625389777']} pathOptions={fillBlueOptions} radius={1000} />
                <Circle
                    center={['-38.57855194702073', '-58.72306625389777']}
                    pathOptions={fillRedOptions}
                    radius={500}
                    stroke={false}
                />
            </LayerGroup>
        </MapContainer>
    )
}

export default MapView;