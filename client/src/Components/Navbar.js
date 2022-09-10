import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux' ;

export default function Navbar() {
  let Location = useLocation();
  const dispatch = useDispatch() ;

  const Navigate = useNavigate();
  const {IsLogdin} = useSelector(state => state.Logdin);
	

  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark position-sticky bg-dark shadow">
          <div className="container-fluid">
            <a className="navbar-brand mx-4" href="/">
              FihaBook
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      Location.pathname === "/" ? "active" : ""
                    }`}
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      Location.pathname === "/blog" ? "active" : ""
                    }`}
                    to="/yournotes"
                  >
                    Notes
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link `} to="/Contactdetails">
                    Your Contact
                  </Link>
                </li>

                {/* Contact details url end */}

                <li className="nav-item">
                  <Link className={`nav-link`} to="/contact">
                    Contact
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className={`nav-link `} to="/Note">
                    Create Notes
                  </Link>
                </li>
              </ul>
              {/* if the user is not logdin show login and  button */}
 	<div className="d-flex">
              <Link
                className={`btn btn-primary mx-3 ${
                 IsLogdin === true ? "d-block" : "d-none"
                }`}
                onClick={() => {
                  sessionStorage.removeItem("token");
			dispatch({type:"IsLogin"}) ;
                  Navigate("/signin");
                }}
                to="/signin"
              >
                logout
              </Link>
              {/* if the user is logdin show logout btn */}
              <Link
                to="/signin"
                className={`btn btn-primary ${
                  IsLogdin === false ? "d-block" : "d-none"
                }`}
              >
                Login
              </Link>

              <Link className={`btn btn-primary mx-4 ${IsLogdin === true ? "d-none" : "d-block"}`} to="/signup">
                Signup
              </Link>
  	</div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
