import React, { useState, useEffect } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CAlert
} from "@coreui/react";

import UserServices from "../../../../services/admin.services";

const fields = ["username", "checkin", "checkout", "date"];

const UsersAttendance = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    UserServices.getAllAttendance()
      .then(res => {
        const users = res.data.data.user;
        // username
        const usersUsername = users.map(user => {
          return {
            username: user.username,
            id: user.id
          };
        });
        // attendance
        const attendance = users
          .map(user => user.attendance)
          .filter(arr => arr.length !== 0);
        const arrAttendances = []
          .concat(...attendance)
          .filter(
            attendance =>
              attendance.checkin !== null || attendance.checkout !== null
          );
        const data = arrAttendances.map(attendance => {
          const timeFormat = time => {
            return time == null ? null : time.slice(11, 16);
          };

          const dateFormat = (checkin, checkout) => {
            // return checkin ? checkin.slice(0, 10) : checkout.slice(0, 10);
            return checkin ? checkin : checkout;
          };

          return {
            ...attendance,
            checkin: timeFormat(attendance.checkin),
            checkout: timeFormat(attendance.checkout),
            date: dateFormat(attendance.checkin, attendance.checkout),
            username: usersUsername.find(user => attendance.UserId === user.id)
              .username
          };
        });
        data.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        const usertAttendance = data.map(d => {
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
      .catch(err => setError(err));
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
              Users Attendance
            </CCardHeader>
            {error && (
              <CAlert color="danger" closeButton>
                {error}
              </CAlert>
            )}
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

export default UsersAttendance;
