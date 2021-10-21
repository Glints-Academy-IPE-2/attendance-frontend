import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { Link, useHistory, useLocation } from "react-router-dom";

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

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Login = () => {
  let query = useQuery();
  const token = query.get("token");

  const [isErrorResponse, setIsErrorResponse] = useState(false);
  const [errorResponseMessage, setErrorResponseMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string().required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const loginHandler = (data, element) => {
    const { email, password } = data;
    AuthServices.login(email, password)
      .then(
        ({
          data: {
            user: { isAdmin },
          },
        }) => {
          setIsLoading(false);
          history.push("/dashboard");
        }
      )
      .catch((err) => {
        // empty password field
        element.target[1].value = "";
        setIsErrorResponse(true);
        setErrorResponseMessage(err.response.data.errorMessage);
        setIsLoading(false);
      });
  };

  const onSubmit = (data, element) => {
    setIsLoading(true);
    if (token) {
      AuthServices.verifyUser(token)
        .then(() => {
          loginHandler(data, element);
        })
        .catch((err) => {
          setIsErrorResponse(true);
          setErrorResponseMessage(err.response.data.errorMessage);
          setIsLoading(false);
        });
    } else {
      loginHandler(data, element);
    }
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
              <CCard className="p-4">
                <CCardBody>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="text-center" style={{ fontWeight: "bold" }}>
                      Worker&apos;s Attendance
                    </h1>
                    {isErrorResponse ? (
                      <CAlert
                        color="danger"
                        onClick={() => {
                          setIsErrorResponse(false);
                        }}
                        closeButton
                      >
                        {errorResponseMessage}
                      </CAlert>
                    ) : (
                      <></>
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
                    <CFormGroup className="my-4">
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
                      <div className="text-right mt-1">
                        <Link to="/forgot" style={{ color: "#6C63FF" }}>
                          Forgot password?
                        </Link>
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
                          <span>Login</span>
                        </CButton>
                        <CFormText className="mb-2 mt-2">
                          Need an account?&nbsp;
                          <Link to="/register" style={{ color: "#6C63FF" }}>
                            Register
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

export default Login;
