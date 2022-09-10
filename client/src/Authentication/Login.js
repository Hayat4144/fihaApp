import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
 const [msg,setsmsg] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Change state
  const emailChange = (e) => {
    setemail(e.target.value);
  };

  const passwordChange = (e) => {
    setPassword(e.target.value);
  };
  // const checkUser = useContext(NoteContext) ;
  // const{Islogin, LoginForm} = checkUser ;

  var response;
  const LoginForm = async (email, password) => {
	  response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
      });
   
    // check if the response is ok or not
    if (response.status === "ok") {
      dispatch({ type: "IsLogin" });
      const errorShow = document.getElementById("MessageShow");
      errorShow.style.display = "block";
      errorShow.classList.add("alert-success");
      setsmsg(response.data);
      // if the login successfull set the token in sessionstorage
      sessionStorage.setItem("token", response.token);

      // redirect to the home user page after 5 second
      setTimeout(() => {
        navigate("/Note");
	errorShow.classList.remove('alert-success');
	setsmsg('') ;
      }, 5000);
    } else {
      //  if the login is not successfull show error
      const errorShow = document.getElementById("MessageShow");
      errorShow.style.display = "block";
      errorShow.classList.add("alert-warning");
      setsmsg(response.error);
      setTimeout(() => {
        errorShow.style.display = "none";
	    errorShow.classList.remove('alert-warning')
	 setsmsg('') ;
      }, 5000);
    }
  };

  // console.log(Islogin)
  return (
    
	    <div className="container">
        <div
          className="alert my-4 "
          id="MessageShow"
          style={{ display: "none" }}
          role="alert"
        >{msg}</div>

        <h1 className="my-4 ">Login </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // submitForm(email,password);
            LoginForm(email, password);
          }}
          method="POST"
        >
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email </label>
            <input
              type="text"
              onChange={emailChange}
              value={email}
              className="form-control"
              placeholder="Email address"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="">
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                onChange={passwordChange}
                value={password}
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary my-3">
            Submit
          </button>
        </form>
      </div>
    
  );
}

export default Login;
