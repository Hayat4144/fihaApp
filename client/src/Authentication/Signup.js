import { React, useState } from "react";
function Signup(props) {
  // initialize all state
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setemail] = useState("");
	const [msg,setsmsg] = useState("");
  // Change state
  const NameChange = (e) => {
    setName(e.target.value);
  };
  const eamilChange = (e) => {
    setemail(e.target.value);
  };

  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  // declare variable
  var response;

  //  Post the data to the backend using post method
  const submitForm = async (e) => {
    e.preventDefault();
    
	  response = await fetch("/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    }).then((res) => res.json());
    console.log(response);
    //  check the response from backend if successful alert message
    if (response.status === "ok") {
      const errorShow = document.getElementById("MessageShow");
      errorShow.style.display = "block";
      errorShow.classList.add("alert-success");
      setsmsg(response.data);
	    setTimeout(()=>{
		setName("");
		setemail("");
		    setPassword("");
		    setsmsg('');
		    window.location.href ='/signin';
	    },3000);
    } 
    else {
      const errorShow = document.getElementById("MessageShow");
      errorShow.style.display = "block";
	    setsmsg(response.errors);
      errorShow.classList.add("alert-warning");
	    setTimeout(()=>{
		    errorShow.classList.remove('alert-warning');
		    setsmsg('');
	    },3000)
    }
  };
  return (
    <div>
      <div className="container">
        <div
          className="alert my-4 "
          id="MessageShow"
          style={{ display: "none" }}
          role="alert"
        >{msg}</div>

        <h1 className="my-4 ">{props.auth} </h1>
        <form onSubmit={submitForm} method="POST">
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Name
            </label>
            <input
              type="text"
              onChange={NameChange}
              value={username}
              className="form-control"
              placeholder=" Enter your Username"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email
            </label>
            <input
              type="text"
              onChange={eamilChange}
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
    </div>
  );
}

export default Signup;
