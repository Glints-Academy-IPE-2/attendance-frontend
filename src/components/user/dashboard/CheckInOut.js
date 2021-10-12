import React, { useState } from "react";

// coreui
import {
  CButton,
  CCol,
  CRow,
  CModal,
  CModalBody,
  CModalFooter,
  CAlert
} from "@coreui/react";

// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import UserServices from "src/services/user.services";
import AuthServices from "src/services/auth.service";

const CheckInOut = ({
  isCheckedIn,
  isLocationSet,
  isCheckedOut,
  checkInOutHandler
}) => {
  const [modal, setModal] = useState(false);
  const [modalAttribute, setModalAttribute] = useState({});
  const [type, setType] = useState("");
  const [isResponse, setIsResponse] = useState(false);
  const [resType, setResType] = useState("");
  const [resMessage, setResMessage] = useState("");

  const buttonHandler = (color, message, colorMessage, button) => {
    setModal(!modal);
    setType(color);
    setModalAttribute({
      color,
      message,
      colorMessage,
      button
    });
  };

  const modalButtonHandler = () => {
    setModal(!modal);
    const userId = AuthServices.getCurrentUser().user.id;
    if (type === "primary") {
      UserServices.checkin(userId)
        .then(res => {
          setIsResponse(true);
          setResType("success");
          setResMessage("Checkin success");
        })
        .catch(err => {
          setIsResponse(true);
          setResType("danger");
          setResMessage("An error has occured");
        });
    } else {
      UserServices.checkout(userId)
        .then(res => {
          setIsResponse(true);
          setResType("success");
          setResMessage("Checkout success");
        })
        .catch(err => {
          setIsResponse(true);
          setResType("danger");
          setResMessage("An error has occured");
        });
    }
    checkInOutHandler();
  };

  return (
    <>
      {isResponse && (
        <CAlert
          color={resType}
          onClick={() => {
            setIsResponse(false);
          }}
          closeButton
        >
          {resMessage}
        </CAlert>
      )}
      <CRow className="justify-content-center mt-2">
        <CCol md="4" className="mt-2">
          <CButton
            block
            shape="pill"
            className="py-2"
            color="primary"
            disabled={isCheckedIn || !isLocationSet}
            onClick={() => {
              buttonHandler(
                "primary",
                "Sure to check in?",
                "text-primary text-center",
                "Check in"
              );
            }}
          >
            <FontAwesomeIcon icon={faSignInAlt} />
            &nbsp;Check In
          </CButton>
        </CCol>
        <CCol md="4" className="mt-2">
          <CButton
            block
            shape="pill"
            disabled={isCheckedOut}
            className="py-2"
            color="danger"
            onClick={() => {
              buttonHandler(
                "danger",
                "Sure to check out?",
                "text-danger text-center",
                "Check out"
              );
            }}
          >
            Check Out &nbsp;
            <FontAwesomeIcon icon={faSignOutAlt} />
          </CButton>
        </CCol>
      </CRow>
      {/* Modal */}
      <CModal
        size="sm"
        show={modal}
        onClose={() => setModal(!modal)}
        color={modalAttribute.color}
      >
        <CModalBody className={modalAttribute.colorMessage}>
          <h4>{modalAttribute.message}</h4>
        </CModalBody>
        <CModalFooter>
          <CButton color={modalAttribute.color} onClick={modalButtonHandler}>
            {modalAttribute.button}
          </CButton>{" "}
          <CButton color="secondary" onClick={() => setModal(!modal)}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default CheckInOut;
