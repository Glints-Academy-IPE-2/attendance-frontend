import React, { useEffect, useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CBadge,
  CSpinner
} from "@coreui/react";

import UserServices from "../../../../services/user.services";

const fields = ["date", "checkin", "checkout", "workDuration"];

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

const Attendance = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userId = UserServices.getCurrentUser().user.id;
    UserServices.getAttendance(userId)
      .then(res => {
        const dateFormat = (checkin, checkout) => {
          return checkin ? checkin : checkout;
        };

        const data = res.data.data.user.attendance.map(attendance => {
          return {
            ...attendance,
            date: dateFormat(attendance.checkin, attendance.checkout)
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
            return time === "--:--"
              ? "--:--"
              : new Date(time).toTimeString().slice(0, 5);
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
      .catch();
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
                Attendance History
              </CCardHeader>
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

export default Attendance;
