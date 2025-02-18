import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import logo from "../../../assets/images/logo.png";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        //  `${process.env.BASE_API_URL}/Users/Login`,
        "https://upskilling-egypt.com:3006/api/v1/Users/Login",
        data
      );

      console.log(response.data);
      toast.success("Login successful!", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "An error occurred. Please try again.",
        {
          position: "top-center",
          autoClose: 3000,
          theme: "colored",
        }
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="container-fluid bg-overlay">
        <div className="row vh-100 justify-content-center align-items-center">
          <div className="col-lg-4 col-md-6 bg-white rounded px-5 py-4 shadow"> 
            <div className="text-center mb-3">
              <img src={logo} alt="Logo" className="img-fluid" width={360} />
            </div> 
            <h2 className="h5 fs-4 fw-bold">Log In!</h2>
            <p className="text-muted mb-4">
              Please enter your details to log in.
            </p> 
            <form onSubmit={handleSubmit(onSubmit)}> 
              <div className="mb-4"> 
                <div className="input-group">
                  <span className="input-group-text">
                    <i
                      className="fa fa-envelope text-secondary"
                      aria-hidden="true"
                    ></i>
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                        message: "Invalid email address",
                      },
                    })}
                  />
                </div>
                {errors.email && (
                  <span className="text-danger">{errors.email.message}</span>
                )}
              </div> 
              <div className="mb-2"> 
                <div className="input-group">
                  <span className="input-group-text">
                    <i
                      className="fa fa-key text-secondary"
                      aria-hidden="true"
                    ></i>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Enter your password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  <button
                    type="button"
                    className="input-group-text"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    <i
                      className={`fa fa-eye${showPassword ? "-slash " : ""}`}
                      aria-hidden="true"
                    ></i>
                  </button>
                </div>
                {errors.password && (
                  <span className="text-danger">{errors.password.message}</span>
                )}
              </div> 
              <div className="d-flex justify-content-between mb-4">
                <Link
                  to="/register"
                  className="text-muted text-decoration-none"
                >
                  Create an account?
                </Link>
                <Link
                  to="/forget-password"
                  className="text-success text-decoration-none"
                >
                  Forgot password?
                </Link>
              </div> 
              <button className="btn btn-success w-100">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
