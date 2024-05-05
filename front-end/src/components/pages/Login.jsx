import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/authContext";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (data?.success) {
        toast.success(data.message);

        setAuth({
          ...auth,
          user: data.user,
          token: data.token,
        });
        localStorage.setItem("auth", JSON.stringify(data));
        navigate("/dashboard");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container login">
      <div className="d-flex">
        <div className="col-md-6">
          <form className="login-form p-5" onSubmit={handleLogin}>
            <h1>Welcome Back</h1>
            <p>Welcom Back! Please Enter Your detailes below</p>

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
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
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
              <p>Not have an account?</p>
              <Link to="/register">click</Link>
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

export default Login;
