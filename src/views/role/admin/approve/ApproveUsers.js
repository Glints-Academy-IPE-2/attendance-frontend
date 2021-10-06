import React, { useState, useEffect } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CAlert,
  CSpinner,
} from "@coreui/react";

import UserServices from "../../../../services/user.services";
const fields = ["username", "email", "action"];

const ApproveUsers = () => {
  const [notApprovedUsers, setNotApprovedUsers] = useState(null);

  const [modal, setModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [modalButton, setModalButton] = useState("");

  const [token, setToken] = useState("");

  const [alertType, setAlertType] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);

  const getAlluser = () => {
    UserServices.getAllUsers().then((res) => {
      const users = res.data.data.users.rows;
      const filteredUsers = users.filter((user) => user.isApproved === false);
      setNotApprovedUsers(filteredUsers);
    });
  };

  const modalHandler = (type, verifiedToken) => {
    setModal(!modal);
    setModalType(type);
    setToken(verifiedToken);

    if (type === "danger") {
      setModalMessage("Reject this user?");
      setModalButton("Reject");
    } else {
      setModalMessage("Approve this user?");
      setModalButton("Approve");
    }
  };

  const approveRejectHandler = () => {
    setModal(!modal);
    if (modalType === "danger") {
      console.log("hapus");
    } else {
      UserServices.approveUser(token)
        .then((res) => {
          console.log(res);
          getAlluser();
          setAlertType("success");
          setAlertMessage("Approve successfull");
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    getAlluser();
  }, []);

  return (
    <>
      <CRow>
        <CCol>
          {!notApprovedUsers && <CSpinner color="info" />}
          <CCard>
            <CCardHeader
              style={{
                backgroundColor: "#6C63FF",
                color: "white",
                fontWeight: "600",
                borderRadius: "10px 10px 0 0",
                marginTop: "-10px",
              }}
            >
              Approve Users
            </CCardHeader>
            <CCardBody>
              {alertType && (
                <CAlert color={alertType} closeButton>
                  {alertMessage}
                </CAlert>
              )}
              <CDataTable
                items={notApprovedUsers}
                fields={fields}
                bordered
                itemsPerPage={5}
                pagination
                scopedSlots={{
                  action: (item) => (
                    <td>
                      <CButton
                        shape="pill"
                        color="success"
                        size="sm"
                        className="mx-1 px-3"
                        onClick={() =>
                          modalHandler("success", item.verifiedToken)
                        }
                      >
                        Approve
                      </CButton>
                      <CButton
                        shape="pill"
                        color="danger"
                        size="sm"
                        className="mx-1 px-3"
                        onClick={() => modalHandler("danger")}
                      >
                        Reject
                      </CButton>
                    </td>
                  ),
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Modal */}
      <CModal
        size="sm"
        show={modal}
        onClose={() => setModal(!modal)}
        color={modalType}
      >
        <CModalBody className={`text-${modalType} text-center`}>
          <h4>{modalMessage}</h4>
        </CModalBody>
        <CModalFooter>
          <CButton color={modalType} onClick={approveRejectHandler}>
            {modalButton}
          </CButton>{" "}
          <CButton color="secondary" onClick={() => setModal(!modal)}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default ApproveUsers;
