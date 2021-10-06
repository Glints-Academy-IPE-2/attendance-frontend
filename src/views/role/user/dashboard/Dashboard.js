import React, { useState, useEffect } from "react";

// coreui
import { CCard, CCardBody, CCol, CRow } from "@coreui/react";

// components
import DateTime from "../../../../components/user/dashboard/DateTime";
import WorkLocation from "../../../../components/user/dashboard/WorkLocation";
import SetWorkLocation from "../../../../components/user/dashboard/SetWorkLocation";
import CheckInOut from "../../../../components/user/dashboard/CheckInOut";

const Dashboard = () => {
  // checkin-out
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isCheckedOut, setIsCheckedOut] = useState(true);

  // error
  const [error, setError] = useState(null);

  // set location
  const [isLocationSet, setIsLocationSet] = useState(false);
  const indonesiaLocation = { lat: -2.548926, lng: 118.0148634 };
  const [workLocation, setWorkLocation] = useState(indonesiaLocation);
  const [userLocation, setUserLocation] = useState(null);

  // map state
  const [map, setMap] = useState(null);

  // checkin-out button handler
  const checkInOutHandler = () => {
    getUserLocation().then(res => {
      const userLat = res.coords.latitude;
      const userLng = res.coords.longitude;
      const workLat = workLocation.lat;
      const workLng = workLocation.lng;

      setUserLocation({ lat: userLat, lng: userLng });

      const distance = parseInt(
        calculateDistance(userLat, userLng, workLat, workLng)
      );
      if (distance > 100) {
        setError(
          `Your distance from the office is ${distance -
            100}m from what is allowed`
        );
      } else {
        setIsCheckedIn(!isCheckedIn);
        setIsCheckedOut(!isCheckedOut);
      }
    });
  };

  // get user current location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  // calcute distance between user location and work location
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const p = 0.017453292519943295; // Math.PI / 180
    const c = Math.cos;
    const a =
      0.5 -
      c((lat2 - lat1) * p) / 2 +
      (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;

    return 12742000 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371000 m
  };

  useEffect(() => {
    // fix map doesn't display completely
    // it needs to resize the window for loading completely the map
    window.dispatchEvent(new Event("resize"));
  }, []);

  useEffect(() => {
    getUserLocation()
      .then(res => {
        const { coords: { latitude: lat, longitude: lng } = {} } = res;

        setWorkLocation({ lat, lng });
        if (map) {
          map.flyTo([lat, lng], 16);
        }
      })
      .catch();
  }, [map]);

  return (
    <>
      <SetWorkLocation
        isLocationSet={isLocationSet}
        setIsLocationSet={setIsLocationSet}
        workLocation={workLocation}
        setWorkLocation={setWorkLocation}
        setMap={setMap}
        indonesiaLocation={indonesiaLocation}
      />

      <CRow>
        <CCol xs="12" sm="12" md="8">
          <CCard
            style={{
              borderRadius: "10px",
              boxShadow:
                "0 4px 4px 0 rgba(0, 0, 0, 0.2), 0 4px 4px 0 rgba(0, 0, 0, 0.19)"
            }}
          >
            <CCardBody className="text-center">
              <DateTime />
              <p className="mt-2 text-danger">{error}</p>
              <CheckInOut
                isCheckedIn={isCheckedIn}
                isLocationSet={isLocationSet}
                isCheckedOut={isCheckedOut}
                checkInOutHandler={checkInOutHandler}
              />
            </CCardBody>
          </CCard>
        </CCol>

        <CCol xs="12" sm="12" md="4">
          {isLocationSet ? (
            <WorkLocation
              workLocation={workLocation}
              userLocation={userLocation}
            />
          ) : (
            <></>
          )}
        </CCol>
      </CRow>
    </>
  );
};

export default Dashboard;
