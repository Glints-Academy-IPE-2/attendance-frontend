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
  CImg
} from "@coreui/react";

import { ApproveUsersData } from "../../../data/Attendance";
import UserServices from "../../../../services/admin.services";

const userFields = ["username", "action"];
const absentFields = ["name", "absent", "action"];

const DashboardAdmin = () => {
  const [users, setUsers] = useState(null);
  const [userId, setUserId] = useState(null);

  const [userDetail, setUserDetail] = useState({});

  // modal detail
  const [modalDetail, setModalDetail] = useState(false);

  // modal reset and delete
  const [modal, setModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [modalButtonText, setModalBmodalButtonText] = useState("");

  const [alertType, setAlertType] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);

  const modalDetailHandler = data => {
    setModalDetail(!modalDetail);
    setUserDetail(data);
  };

  const userButtonHandler = (type, item) => {
    setModal(!modal);
    setUserId(item.id);
    if (type === "danger") {
      setModalMessage("Delete this user?");
      setModalType("danger");
      setModalBmodalButtonText("Delete");
    } else {
      setModalMessage("Reset user location? *coming soon :)");
      setModalType("warning");
      setModalBmodalButtonText("Reset");
    }
  };

  const deleteResetHandler = () => {
    setModal(!modal);
    if (modalType === "danger") {
      UserServices.deleteUser(userId)
        .then(res => {
          setAlertType("success");
          setAlertMessage("User deleted successfully");
          getAlluser();
        })
        .catch(err => {
          setAlertType("success");
          setAlertMessage("User failed to delete");
        });
    }
  };

  const getAlluser = () => {
    UserServices.getAllUsers().then(res => {
      const users = res.data.data.users.rows;
      const filteredUsers = users.filter(
        user => user.isApproved === true && user.isVerified === true
      );
      setUsers(filteredUsers);
    });
  };

  useEffect(() => {
    getAlluser();
  }, []);

  return (
    <>
      <CRow>
        <CCol xl={6}>
          <CCard>
            <CCardHeader
              style={{
                backgroundColor: "#6C63FF",
                color: "white",
                fontWeight: "600",
                borderRadius: "10px 10px 0 0",
                marginTop: "-10px"
              }}
            >
              Users
            </CCardHeader>
            <CCardBody>
              {alertType && (
                <CAlert color={alertType} closeButton>
                  {alertMessage}
                </CAlert>
              )}
              <CDataTable
                items={users}
                fields={userFields}
                bordered
                itemsPerPage={5}
                pagination
                scopedSlots={{
                  action: item => (
                    <td>
                      <CButton
                        shape="pill"
                        color="info"
                        size="sm"
                        className="mx-1 px-3"
                        onClick={() => modalDetailHandler(item)}
                      >
                        Detail
                      </CButton>
                      <CButton
                        shape="pill"
                        color="warning"
                        size="sm"
                        className="mx-1 px-3"
                        onClick={() => userButtonHandler("warning", item)}
                      >
                        Reset Location
                      </CButton>
                      <CButton
                        shape="pill"
                        color="danger"
                        size="sm"
                        className="mx-1 px-3"
                        onClick={() => userButtonHandler("danger", item)}
                      >
                        Delete
                      </CButton>
                    </td>
                  )
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xl={6}>
          <CCard>
            <CCardHeader
              style={{
                backgroundColor: "#6C63FF",
                color: "white",
                fontWeight: "600",
                borderRadius: "10px 10px 0 0",
                marginTop: "-10px"
              }}
            >
              Absent more than 2 days this month
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={ApproveUsersData}
                fields={absentFields}
                bordered
                itemsPerPage={5}
                pagination
                scopedSlots={{
                  action: item => (
                    <td>
                      <CButton
                        shape="pill"
                        color="info"
                        size="sm"
                        className="mx-1 px-3"
                      >
                        Detail
                      </CButton>
                    </td>
                  )
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Modal Reset and Delete */}
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
          <CButton color={modalType} onClick={() => deleteResetHandler()}>
            {modalButtonText}
          </CButton>{" "}
          <CButton color="secondary" onClick={() => setModal(!modal)}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Modal detail */}
      <CModal
        size="sm"
        show={modalDetail}
        onClose={() => setModalDetail(!modalDetail)}
      >
        <CModalBody className="text-center">
          <CImg
            style={{ width: "200px" }}
            className="c-avatar-img"
            src={"avatars/" + userDetail.avatar}
            alt="user-avatar"
          />
          <h4>{userDetail.username}</h4>
          <p>{userDetail.email}</p>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => setModalDetail(!modalDetail)}
          >
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default DashboardAdmin;
