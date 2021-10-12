import React, { useState, useEffect } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CAlert,
  CBadge,
  CSpinner
} from "@coreui/react";

import UserServices from "../../../../services/admin.services";

const fields = ["username", "checkin", "checkout", "workDuration", "date"];

const getBadge = duration => {
  if (duration >= 8) {
    return "success";
  } else if (duration < 8 && duration >= 6) {
    return "warning";
  } else if (duration < 6) {
    return "danger";
  } else {
    return "";
  }
};

const UsersAttendance = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // pls dont ask anything :')
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
          const dateFormat = (checkin, checkout) => {
            return checkin ? checkin : checkout;
          };

          return {
            ...attendance,
            date: dateFormat(attendance.checkin, attendance.checkout),
            username: usersUsername.find(user => attendance.UserId === user.id)
              .username
          };
        });
        const mergeData = data
          .map((attendance, id) => {
            const checkoutValue = val => {
              if (val) {
                return val;
              } else {
                const checkout = data.find(
                  (d, index) =>
                    d.username === attendance.username &&
                    d.date.slice(0, 10) === attendance.date.slice(0, 10) &&
                    d.checkout !== null &&
                    index !== id
                );
                return checkout ? checkout.checkout : "--:--";
              }
            };

            return {
              ...attendance,
              checkout: checkoutValue(attendance.checkout)
            };
          })
          .filter(data => data.checkin)
          .map(data => {
            const workDurationHandler = ({ checkout, checkin }) => {
              if (checkout === "--:--") {
                return "-";
              }
              return Math.floor(
                (new Date(checkout) - new Date(checkin)) / 3600000
              );
            };

            return {
              ...data,
              workDuration: workDurationHandler(data)
            };
          });
        mergeData.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        const usertAttendance = mergeData.map(d => {
          const timeFormat = time => {
            return time === "--:--" ? "--:--" : new Date(time).toTimeString().slice(0, 5);
          };

          return {
            ...d,
            checkin: timeFormat(d.checkin),
            checkout: timeFormat(d.checkout),
            date: d.date
              .slice(0, 10)
              .split("-")
              .reverse()
              .join("-")
          };
        });
        setIsLoading(false);
        setUser(usertAttendance);
      })
      .catch(err => {
        setIsLoading(false);
        setError(err);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <CSpinner color="info" />
      ) : (
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
                  scopedSlots={{
                    workDuration: item => (
                      <td>
                        <CBadge color={getBadge(item.workDuration)}>
                          {item.workDuration > 1
                            ? `${item.workDuration} hours`
                            : `${item.workDuration} hour`}
                        </CBadge>
                      </td>
                    )
                  }}
                />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      )}
    </>
  );
};

export default UsersAttendance;
