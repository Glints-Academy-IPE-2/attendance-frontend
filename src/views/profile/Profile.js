import React from "react";
import { CImg, CRow, CCol } from "@coreui/react";
import AuthServices from "../../services/auth.service";

const Profile = () => {
  const user = AuthServices.getCurrentUser().user;

  return (
    <>
      <CRow className="text-center">
        <CCol>
          <CImg
            style={{ width: "300px" }}
            className="c-avatar-img"
            src={"avatars/" + user.avatar}
            alt="user-avatar"
          />
          <h3 className="display-4 mt-2" style={{ fontWeight: "600" }}>
            {user.username}
          </h3>
          <p style={{ color: "#768192" }}>{user.email}</p>
        </CCol>
      </CRow>
    </>
  );
};

export default Profile;
