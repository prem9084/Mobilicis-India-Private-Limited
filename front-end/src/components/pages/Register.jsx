import React, { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post("/api/v1/auth/register", {
        fullName,
        username,
        email,
        password,
      });
      if (data?.success) {
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container register">
      <div className="d-flex">
        <div className="col-md-6">
          <form className="register-form p-5" onSubmit={handleRegister}>
            <h1>Welcome to my Website !!</h1>
            <p>Welcom Back! Please Enter Your detailes below</p>

            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputText1"
                aria-describedby="emailHelp"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputUsername" className="form-label">
                username
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-dark w-100 m-auto">
              Login
            </button>
            <div className="d-flex mt-3 justify-content-end">
              <p>Already have an account?</p>
              <Link to="/login">click?</Link>
            </div>
          </form>
        </div>
        <div className="col-md-6">
          <img
            src="https://cdn.pixabay.com/photo/2020/08/26/16/15/taj-mahal-5519945_1280.jpg"
            alt="logo"
            height="700vh"
            width="650px"
            className="rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
