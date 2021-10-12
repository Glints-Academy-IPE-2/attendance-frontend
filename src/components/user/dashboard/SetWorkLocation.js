import React, {
  useState,
  useRef,
  useCallback,
  useMemo,
  useEffect
} from "react";

// coreui
import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter
} from "@coreui/react";

// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

// api
import UserServices from "../../../services/user.services";
import AuthServices from "../../../services/auth.service";

// map
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents
} from "react-leaflet";
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

// handler get the location based on the marker
// the marker also can be draggable
function DraggableMarker({ workLocation, setWorkLocation }) {
  const zoomLevel = 16;

  const [draggable, setDraggable] = useState(false);
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setWorkLocation(marker.getLatLng());
        }
      }
    }),
    [setWorkLocation]
  );
  const toggleDraggable = useCallback(() => {
    setDraggable(d => !d);
  }, []);

  // handler get and zoom location
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setWorkLocation(e.latlng);
      map.flyTo(e.latlng, zoomLevel);
    }
  });

  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={workLocation}
      ref={markerRef}
    >
      <Popup minWidth={90}>
        <span style={{ cursor: "pointer" }} onClick={toggleDraggable}>
          {draggable
            ? "Marker is draggable"
            : "Click here to make marker draggable"}
        </span>
      </Popup>
    </Marker>
  );
}

const SetWorkLocation = ({
  isLocationSet,
  setIsLocationSet,
  workLocation,
  setWorkLocation,
  setMap,
  indonesiaLocation
}) => {
  const [modalLocation, setModalLocation] = useState(!isLocationSet);
  const [userId, setUserId] = useState(null);

  const modalButtonHandler = () => {
    setModalLocation(!modalLocation);
    setIsLocationSet(!isLocationSet);
    UserServices.setLocation(userId, workLocation.lat, workLocation.lng)
      .then(res => {
        // update workLocation in local storage
        const user = AuthServices.getCurrentUser();
        const updatedData = {
          token: user.token,
          user: {
            ...user.user,
            latitude: workLocation.lat,
            longitude: workLocation.lng
          }
        };
        localStorage.setItem("user", JSON.stringify(updatedData));
      })
      .catch();
  };

  useEffect(() => {
    const user = UserServices.getCurrentUser().user;
    setUserId(user.id);
    if (user.latitude !== 0 && user.longitude !== 0) {
      setModalLocation(false);
    }
  }, []);

  return (
    <>
      <CModal show={modalLocation} size="lg">
        <CModalHeader>
          <CModalTitle>Set Working Location</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <ul
            className="mb-2 ml-1"
            style={{ listStyleType: "none", padding: 0, margin: 0 }}
          >
            <li className="mt-1 text-primary">
              <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
              Click anywhere to get your location
            </li>
            <li className="mt-1 text-primary">
              <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
              Click the marker to make it draggable
            </li>
          </ul>
          <MapContainer
            whenCreated={setMap}
            center={indonesiaLocation}
            zoom={4}
            scrollWheelZoom={false}
            style={{ height: "50vh", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <DraggableMarker
              workLocation={workLocation}
              setWorkLocation={setWorkLocation}
            />
          </MapContainer>
        </CModalBody>
        <CModalFooter>
          <CButton color="dark" onClick={modalButtonHandler}>
            Set Location
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default SetWorkLocation;
