import React, { useEffect, useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow
} from "@coreui/react";

import UserServices from "../../../../services/user.services";

const fields = ["date", "checkin", "checkout", "workingHour"];

const Attendance = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userId = UserServices.getCurrentUser().user.id;
    UserServices.getAttendance(userId)
      .then(res => {
        const timeFormat = time => {
          return time == null ? "--:--" : time.slice(11, 16);
        };

        const dateFormat = (checkin, checkout) => {
          return checkin ? checkin : checkout;
        };

        const attendances = res.data.data.user.attendance.map(attendance => {
          return {
            ...attendance,
            checkin: timeFormat(attendance.checkin),
            checkout: timeFormat(attendance.checkout),
            date: dateFormat(attendance.checkin, attendance.checkout)
          };
        });

        attendances.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        const usertAttendance = attendances.map(d => {
          return {
            ...d,
            date: d.date
              .slice(0, 10)
              .split("-")
              .reverse()
              .join("-")
          };
        });

        setUser(usertAttendance);
      })
      .catch(err => console.log(err));
  }, []);

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
                items={user}
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
