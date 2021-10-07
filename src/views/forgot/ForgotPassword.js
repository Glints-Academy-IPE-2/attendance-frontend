import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { Link } from "react-router-dom";

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CRow,
  CLabel,
  CFormGroup,
  CFormText,
  CAlert,
  CSpinner,
} from "@coreui/react";

import AuthServices from "../../services/auth.service";

const Forgot = () => {
  const [responseType, setResponseType] = useState(null);
  const [responseMessage, setResponseMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    setIsLoading(true);
    const { email } = data;
    AuthServices.forgotPassword(email)
      .then(() => {
        reset();
        setIsLoading(false);
        setResponseType("success");
        setResponseMessage(
          "Reset password confirmation has been sent to your email address"
        );
      })
      .catch((err) => {
        setIsLoading(false);
        setResponseType("danger");
        setResponseMessage("An error has occurred");
      });
  };

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
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <h1
                      className="text-center mb-4"
                      style={{ fontWeight: "bold" }}
                    >
                      Forgot Password
                    </h1>
                    {responseMessage && (
                      <CAlert color={responseType} closeButton>
                        {responseMessage}
                      </CAlert>
                    )}
                    <CFormGroup className="my-4">
                      <CLabel htmlFor="email" style={{ opacity: "50%" }}>
                        Email
                      </CLabel>
                      <input
                        name="email"
                        type="text"
                        {...register("email")}
                        className={`form-control ${
                          errors.email ? "is-invalid" : ""
                        }`}
                      />
                      <div className="invalid-feedback">
                        {errors.email ? errors.email.message : ""}
                      </div>
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
                          type="submit"
                          disabled={isLoading}
                        >
                          {isLoading && (
                            <CSpinner
                              color="white"
                              size="sm"
                              className="mr-1"
                            />
                          )}
                          <span>Send</span>
                        </CButton>
                        <CFormText className="mb-2 mt-2 text-center">
                          Back to&nbsp;
                          <Link to="/login" style={{ color: "#6C63FF" }}>
                            Login
                          </Link>
                        </CFormText>
                      </CCol>
                    </CRow>
                  </form>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Forgot;
