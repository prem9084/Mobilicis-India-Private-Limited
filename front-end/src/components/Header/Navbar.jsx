import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logged out successfully");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand">
          <i>dribbble</i>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse " id="navbarNav">
          <ul className="navbar-nav ms-auto p-2">
            {auth?.user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page">
                    <i>Home</i>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link">
                    <i>Name</i>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    onClick={handleLogout}
                    to={"/login"}
                  >
                    <i>Logout</i>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to={"/register"}
                  >
                    <i>Regiter</i>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/login"}>
                    <i>Login</i>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
