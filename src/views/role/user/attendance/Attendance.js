import React from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow
} from "@coreui/react";

import { UserAttendanceData } from "../../../data/Attendance";

const fields = ["date", "checkIn", "checkOut", "workingHour"];

const Attendance = () => {
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
              Attendance History
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={UserAttendanceData}
                fields={fields}
                bordered
                itemsPerPage={10}
                pagination
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Attendance;
