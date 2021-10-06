import React, { useState } from "react";

// coreui
import {
  CButton,
  CCol,
  CRow,
  CModal,
  CModalBody,
  CModalFooter
} from "@coreui/react";

// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const CheckInOut = ({
  isCheckedIn,
  isLocationSet,
  isCheckedOut,
  checkInOutHandler
}) => {
  const [modal, setModal] = useState(false);
  const [modalAttribute, setModalAttribute] = useState({});

  const buttonHandler = (color, message, colorMessage, button) => {
    setModal(!modal);
    setModalAttribute({
      color,
      message,
      colorMessage,
      button
    });
  };

  const modalButtonHandler = () => {
    setModal(!modal);
    checkInOutHandler();
  };

  return (
    <>
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
