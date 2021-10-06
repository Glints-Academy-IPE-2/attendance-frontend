import React from "react";
import { Link } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CRow,
  CLabel,
  CFormGroup,
  CFormText,
} from "@coreui/react";

const Reset = () => {
  return (
    <div
      className="c-app c-default-layout flex-row align-items-center"
      style={{ backgroundColor: "white" }}
    >
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="6">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1 className="text-center" style={{ fontWeight: "bold" }}>
                      Reset Password
                    </h1>
                    <CFormGroup className="my-4">
                      <CLabel htmlFor="newPassword" style={{ opacity: "50%" }}>
                        New Password
                      </CLabel>
                      <CInput type="password" id="newPassword" />
                    </CFormGroup>
                    <CFormGroup className="my-4">
                      <CLabel
                        htmlFor="cofirmNewPassword"
                        style={{ opacity: "50%" }}
                      >
                        Confirm New Password
                      </CLabel>
                      <CInput type="password" id="cofirmNewPassword" />
                    </CFormGroup>
                    <CRow>
                      <CCol>
                        <CButton
                          className="py-2"
                          shape="pill"
                          style={{
                            backgroundColor: "#6C63FF",
                            border: "#6C63FF",
                            color: "white",
                            width: "100%",
                          }}
                        >
                          Reset
                        </CButton>
                        <CFormText className="mb-2 mt-2 text-center">
                          Back to&nbsp;
                          <Link to="/login" style={{ color: "#6C63FF" }}>
                            Login
                          </Link>
                        </CFormText>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Reset;
