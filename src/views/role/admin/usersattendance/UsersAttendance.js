import React from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CBadge
} from "@coreui/react";

import { UsersAttendanceData } from "../../../data/Attendance";

const fields = ["name", "type", "time", "date"];

const getBadge = type => {
  switch (type) {
    case "Check-In":
      return "success";
    default:
      return "danger";
  }
};

const UsersAttendance = () => {
  return (
    <>
      <CRow>
        <CCol>
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
              Users Attendance
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={UsersAttendanceData}
                fields={fields}
                bordered
                itemsPerPage={5}
                pagination
                scopedSlots={{
                  type: item => (
                    <td>
                      <CBadge color={getBadge(item.type)}>{item.type}</CBadge>
                    </td>
                  )
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default UsersAttendance;
