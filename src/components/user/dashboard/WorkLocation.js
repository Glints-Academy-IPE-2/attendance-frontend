import React from "react";

// coreui
import { CCard, CCardBody } from "@coreui/react";

// map
import { MapContainer, TileLayer, Marker, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

// Fix the marker icon that doesnt show up
let DefaultIcon = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: icon,
  shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

const WorkLocation = ({ workLocation, userLocation }) => {
  return (
    <CCard
      style={{
        borderRadius: "10px",
        boxShadow:
          "0 4px 4px 0 rgba(0, 0, 0, 0.2), 0 4px 4px 0 rgba(0, 0, 0, 0.19)"
      }}
    >
      <CCardBody className="p-1" style={{ padding: 0 }}>
        <MapContainer
          center={workLocation}
          zoom={16}
          minZoom={0}
          maxZoom={20}
          scrollWheelZoom={false}
          style={{ height: "50vh", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Circle
            center={workLocation}
            pathOptions={{ fillColor: "blue" }}
            radius={100}
          />
          {userLocation ? (
            <Marker position={userLocation} icon={DefaultIcon}></Marker>
          ) : (
            <></>
          )}
        </MapContainer>
      </CCardBody>
    </CCard>
  );
};

export default WorkLocation;
