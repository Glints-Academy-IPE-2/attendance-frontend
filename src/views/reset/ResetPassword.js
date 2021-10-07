import React, { useState } from "react";
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
  CSpinner,
  CAlert,
} from "@coreui/react";

import { useLocation, Link } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import AuthServices from "../../services/auth.service";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Reset = () => {
  let query = useQuery();

  const [isResponding, setIsResponding] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [responseType, setResponseType] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object().shape({
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

    const email = query.get("email");
    const token = query.get("token");

    AuthServices.resetPassword(email, token, data.password)
      .then((res) => {
        reset();
        setIsResponding(true);
        setResponseType("success");
        setResponseMessage("Reset password successfull");
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
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <h1
                      className="text-center mb-4"
                      style={{ fontWeight: "bold" }}
                    >
                      Reset Password
                    </h1>
                    {isResponding && (
                      <CAlert
                        color={responseType}
                        onClick={() => {
                          setIsResponding(false);
                        }}
                        closeButton
                      >
                        {responseMessage}
                      </CAlert>
                    )}
                    <CFormGroup className="my-2">
                      <CLabel htmlFor="password" style={{ opacity: "50%" }}>
                        New Password
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
                        Confirm New Password
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
                    <CRow>
                      <CCol>
                        <CButton
                          className="py-2 mt-2"
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
                          <span>Reset</span>
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

export default Reset;
