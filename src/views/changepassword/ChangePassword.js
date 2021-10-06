import React from "react";
import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CForm,
  CFormGroup,
  CInput,
  CFormText,
  CCardFooter,
  CButton
} from "@coreui/react";

import CIcon from "@coreui/icons-react";

const ChangePassword = () => {
  return (
    <>
      <CRow>
        <CCol xl={6}>
          <CCard>
            <CCardHeader>Change Password</CCardHeader>
            <CCardBody>
              <CForm>
                <CFormGroup>
                  <CInput type="password" placeholder="Your Password" />
                  <CFormText className="help-block">
                    Please enter your email
                  </CFormText>
                </CFormGroup>
                <CFormGroup>
                  <CInput type="password" placeholder="New Password" />
                </CFormGroup>
                <CFormGroup>
                  <CInput type="password" placeholder="Confirm New Password" />
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" size="sm" color="primary">
                <CIcon name="cil-scrubber" /> Submit
              </CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default ChangePassword;
