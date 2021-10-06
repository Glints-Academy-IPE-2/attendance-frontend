import React, { useState } from "react";
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
  CModalFooter
} from "@coreui/react";

import { ApproveUsersData } from "../../../data/Attendance";

const userFields = ["name", "action"];
const absentFields = ["name", "absent", "action"];

const DashboardAdmin = () => {
  const [modal, setModal] = useState(false);

  const [modalColor, setModalColor] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [modalTextColor, setModalTextColor] = useState("");

  const deleteHandler = () => {
    setModalMessage("Delete this user?");
    setModalColor("danger");
    setModalTextColor("text-danger text-center");
    setModal(!modal);
  };

  const resetLocationHandler = () => {
    setModalMessage("Reset user location?");
    setModalColor("warning");
    setModalTextColor("text-warning text-center");
    setModal(!modal);
  };

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
              <CDataTable
                items={ApproveUsersData}
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
                      >
                        Detail
                      </CButton>
                      <CButton
                        shape="pill"
                        color="warning"
                        size="sm"
                        className="mx-1 px-3"
                        onClick={resetLocationHandler}
                      >
                        Reset Location
                      </CButton>
                      <CButton
                        shape="pill"
                        color="danger"
                        size="sm"
                        className="mx-1 px-3"
                        onClick={deleteHandler}
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

      {/* Modal */}
      <CModal
        size="sm"
        show={modal}
        onClose={() => setModal(!modal)}
        color={modalColor}
      >
        <CModalBody className={modalTextColor}>
          <h4>{modalMessage}</h4>
        </CModalBody>
        <CModalFooter>
          <CButton color={modalColor} onClick={() => setModal(!modal)}>
            Okay
          </CButton>{" "}
          <CButton color="secondary" onClick={() => setModal(!modal)}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default DashboardAdmin;
