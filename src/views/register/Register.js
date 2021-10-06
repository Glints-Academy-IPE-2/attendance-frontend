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
  CImg,
  CLabel,
  CFormGroup,
  CFormText,
  CAlert,
  CSpinner,
} from "@coreui/react";

import AuthServices from "../../services/auth.service";

const Register = () => {
  const [isResponding, setIsResponding] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [responseType, setResponseType] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username is required")
      .min(6, "Username must be at least 6 characters")
      .max(20, "Username must not exceed 20 characters"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
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

    const { username, email, password } = data;
    AuthServices.register(username, email, password)
      .then((res) => {
        const responseMessage =
          "Register success. Please check your email to verify your account";
        reset();
        setIsResponding(true);
        setResponseType("success");
        setResponseMessage(responseMessage);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsResponding(true);
        setResponseType("danger");
        setResponseMessage(err.response.data.errorMessage);
        setIsLoading(false);
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
            <CImg
              src={"img/splash.png"}
              style={{ width: "100%", height: "auto" }}
            />
          </CCol>
          <CCol md="4">
            <CCardGroup>
              <CCard className="p-2">
                <CCardBody>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <h1
                      className="text-center mb-3"
                      style={{ fontWeight: "bold" }}
                    >
                      Worker&apos;s Attendance
                    </h1>
                    {isResponding ? (
                      <CAlert
                        color={responseType}
                        onClick={() => {
                          setIsResponding(false);
                        }}
                        closeButton
                      >
                        {responseMessage}
                      </CAlert>
                    ) : (
                      <></>
                    )}
                    <CFormGroup className="my-2">
                      <CLabel htmlFor="username" style={{ opacity: "50%" }}>
                        Username
                      </CLabel>
                      <input
                        type="text"
                        {...register("username")}
                        className={`form-control ${
                          errors.username ? "is-invalid" : ""
                        }`}
                      />
                      <div className="invalid-feedback">
                        {errors.username ? errors.username.message : ""}
                      </div>
                    </CFormGroup>
                    <CFormGroup className="my-2">
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
                    <CFormGroup className="my-2">
                      <CLabel htmlFor="password" style={{ opacity: "50%" }}>
                        Password
                      </CLabel>
                      <input
                        name="password"
                        type="password"
                        {...register("password")}
                        className={`form-control ${
                          errors.password ? "is-invalid" : ""
                        }`}
                      />
                      <div className="invalid-feedback">
                        {errors.password ? errors.password.message : ""}
                      </div>
                    </CFormGroup>
                    <CFormGroup className="my-2">
                      <CLabel
                        htmlFor="confirm-password"
                        style={{ opacity: "50%" }}
                      >
                        Confirm Password
                      </CLabel>
                      <input
                        name="confirmPassword"
                        type="password"
                        {...register("confirmPassword")}
                        className={`form-control ${
                          errors.confirmPassword ? "is-invalid" : ""
                        }`}
                      />
                      <div className="invalid-feedback">
                        {errors.confirmPassword
                          ? errors.confirmPassword.message
                          : ""}
                      </div>
                    </CFormGroup>
                    <CRow className="pt-2">
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
                          Register
                        </CButton>
                        <CFormText className="mb-2 mt-2">
                          Already have an account?&nbsp;
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

export default Register;
