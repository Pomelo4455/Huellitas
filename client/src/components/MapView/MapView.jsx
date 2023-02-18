import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Circle, LayerGroup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapView = ({ latitude, longitude }) => {
  const fillBlueOptions = { fillColor: "blue" };
  const fillRedOptions = { fillColor: "red" };
  const [map, setMap] = useState({currentLocation: {lat: '-35.89180006651545', lng:'-64.5118360741946'}});

 // function loadState(e) {
    
  //console.log({'lat':latitude, 'lng': longitude})

  useEffect(() => {
    if (latitude && longitude) {
      const currentLocation = {
        lat: latitude, 
        lng: longitude 
      }
      setMap({ ...map, currentLocation });
    }
  }, [])
  //<button  onClick={(e) => loadState(e)} >Usar mi ubicación</button>

  return (
    <>  
    <MapContainer
      zoom={7}
      center={map.currentLocation}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      <LayerGroup> 
        <Circle
          center={map.currentLocation}
          pathOptions={fillBlueOptions}
          radius={20000}
          />
        <Circle
          center={map.currentLocation}
          pathOptions={fillRedOptions}
          radius={100}
          stroke={false} 
          />
      </LayerGroup>
    </MapContainer>
          </>
  );
};

export default MapView;
