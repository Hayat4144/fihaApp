import React, { useEffect, useState } from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";


export default function UserContact() {

  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [address, setaddress] = useState("");
  const [city, setcity] = useState("");
  const [zip, setzipcode] = useState("");
  const [mobile, setmobile] = useState("");
  const [states, setstates] = useState();

  const firstnamechange = (e) => {
    setfirstname(e.target.value);
  };
  const lastnamechange = (e) => {
    setlastname(e.target.value);
  };
  const emailchange = (e) => {
    setemail(e.target.value);
  };
  const addresschange = (e) => {
    setaddress(e.target.value);
  };

  const citychange = (e) => {
    setcity(e.target.value);
  };
  const mobilechange = (e) => {
    setmobile(e.target.value);
  };
  const zipcodechange = (e) => {
    setzipcode(e.target.value);
  };
  const navigate = useNavigate() ;
	const {IsLogdin} = useSelector(state => state.Logdin) ;
	

	useEffect(()=>{
		if (IsLogdin !== true){
			alert('You are not authenticated . We are redirecting you to login page.');
			navigate('/signin') ;
		}
	})

  const contactForm = async (event) => {
    event.preventDefault();
	  const response = await fetch("/CreateContact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
	    body: JSON.stringify({
        firstname,
        lastname,
        email,
        city,
        zip,
        state: states,
        mobile,
        address,
      })
    }).then((res) => res.json());
    
    if (response.status === "ok") {
      setaddress("");
      setzipcode("");
      setmobile("");
      setlastname("");
      setfirstname("");
      setcity("");
      setemail("");
      setaddress("");
      let message = document.getElementById("message");
      message.classList.add("alert-success");
      message.style.display = "block";
      message.innerText = response.data;
      setTimeout(() => {
        message.style.display = "none";
      }, 5000);

      // call the fethc  function
    } else {
      let message = document.getElementById("message");
      message.classList.add("alert-danger");
      message.style.display = "block";
      message.innerText = response.error;
      setTimeout(() => {
        message.classList.remove('alert-danger')
        message.style.display = "none";
      }, 5000);
     
    }
  };

  return (
    <>
      <div className="container ">
        <div
          className="alert my-2 "
          id="message"
          style={{ display: "block" }}
          role="alert"
        ></div>
        <h1>Enter your contact details</h1>
        <form className="row g-3" onSubmit={contactForm}>
          <div className="col-md-6">
            <label htmlFor="inputEmail4" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="inputEmail4"
              placeholder="Enter your first name"
              value={firstname}
              onChange={firstnamechange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputPassword4" className="form-label">
              last name
            </label>
            <input
              type="text"
              className="form-control"
              id="inputPassword4"
              placeholder="Enter your last name"
              value={lastname}
              onChange={lastnamechange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputAddress" className="form-label">
              Email
            </label>
            <input
              type="text"
              className="form-control"
              id="inputAddress"
              placeholder="Enter your email"
              value={email}
              onChange={emailchange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputAddress2" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="inputAddress2"
              placeholder="Apartment, studio, or floor"
              value={address}
              onChange={addresschange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputCity" className="form-label">
              City
            </label>
            <input
              type="text"
              className="form-control"
              id="inputCity"
              placeholder="Enter your city"
              value={city}
              onChange={citychange}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="inputState" className="form-label">
              State
            </label>
            <select
              id="inputState"
              className="form-select"
              value={states}
              onChange={(e) => {
                setstates(e.target.value);
              }}
            >
              <option defaultValue={"choose...."}>Choose your state</option>
              <option>Bihar</option>
              <option>Assam</option>
              <option>Uttar pradesh</option>
              <option>West Bangal</option>
              <option>Punjab</option>
              <option>Chndigarh</option>
              <option>Madhya pradesh</option>
              <option>Jammu&kasmir</option>
              <option>Arunachal pradesh</option>
              <option>Kerala</option>
              <option>Sikkim</option>
            </select>
          </div>
          <div className="col-md-2">
            <label htmlFor="inputZip" className="form-label">
              Zip
            </label>
            <input
              type="text"
              className="form-control"
              id="inputZip"
              placeholder="zip code"
              value={zip}
              onChange={zipcodechange}
            />
          </div>
          <div className="col-md-2">
            <label htmlFor="inputZip" className="form-label">
              Mobile
            </label>
            <input
              type="number"
              className="form-control"
              id="inputZip"
              placeholder="Mobile no."
              value={mobile}
              onChange={mobilechange}
            />
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary" id="contactForm">
              Add contact
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
