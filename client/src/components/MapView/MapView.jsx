import React from "react";
import {
  MapContainer,
  TileLayer,
  Circle,
  LayerGroup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useRef } from "react";


const MapView = ({ latitude, longitude }) => {
  const fillBlueOptions = { fillColor: "blue" };
  const mapRef = useRef();

  function MyComponent() {
    const map = useMap();
    map.setView([latitude, longitude],11);
    return null;
  }

  return (
    <>
    
      <MapContainer ref={mapRef} zoom={4} center={[latitude, longitude]}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
        <LayerGroup>
          <MyComponent />
          <Circle
            center={[latitude, longitude]}
            pathOptions={fillBlueOptions}
            radius={8000}
            />
        </LayerGroup>
      </MapContainer>
          
    </>
  );
};

export default MapView;
