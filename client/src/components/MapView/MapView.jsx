import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Circle, LayerGroup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useLocation } from "react-router-dom";

const MapView = () => {
    const fillBlueOptions = { fillColor: 'blue' }
    const fillRedOptions = { fillColor: 'red' }
    
    const [state, setState] = useState({
        currentLocation: {lat: '-36.89180006651577', lng:'-65.5118360741946'},
        zoom: 3.5
    })

    //const location = useLocation();
   // console.log('Location: ', location);

    // const navigate = useNavigate();

    useEffect(() => {
        //if (location) {
           // const currentLocation = {
               // lat: location.state.userLocation.lat,
              //  lng: location.state.userLocation.lng
         //   }
         //   setState({ ...state, currentLocation })
      //7  }
    }, [])

    return (
        <MapContainer
            center={state.currentLocation}
            zoom={state.zoom}
            //scrollWheelZoom={false}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <LayerGroup>
                <Circle center={state.currentLocation} pathOptions={fillBlueOptions} radius={20000} />
                <Circle
                    center={state.currentLocation}
                    pathOptions={fillRedOptions}
                    radius={100000}
                    stroke={false}
                />
            </LayerGroup>
        </MapContainer>
    )
}

export default MapView;