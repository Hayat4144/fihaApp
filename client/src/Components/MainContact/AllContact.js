import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import NoteContext from "../../Context/NoteContext";
import { useContext } from "react";
import {useSelector} from "react-redux";

export default function AllContact() {
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [address, setaddress] = useState("");
  const [city, setcity] = useState("");
  const [zip, setzip] = useState("");
  const [mobile, setmobile] = useState("");
  const [state, setstates] = useState("");
  const [stid, setid] = useState("");
  const [succesmsg,setmsg] = useState('') ;

  const ContactDetails = useContext(NoteContext);
  const { FetchContact, contact, DeleteContact} =
    ContactDetails;

  const wrapper = {
    display: "flex",
    fontSize: "24px",
    marginTop:'2em',
    justifyContent:'space-between'
  };

  const navigate = useNavigate() ;
  const {IsLogdin} = useSelector(state => state.Logdin ) ;
   
  useEffect(()=>{

	  if (IsLogdin !== true ){
		  alert('You are not authenticated. We are redirecting you to login page.') ;
		  navigate('/signin');
	  }
    else{
      FetchContact() ;
    }
  },[])  


  const updateContact= async(id,firstname,lastname,email,zip,state,address,mobile,city)=>{
	  const response = await fetch(`/updateContact/${id}`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body:JSON.stringify({
      firstname,
      lastname,
      email,
      zip,state,address,mobile,city
      })
    }).then((res)=> res.json())
    .catch((err)=>{console.log(err)});
    if (response.status === 'ok'){
      var sucmsg = document.getElementById('success-alert') ;
      setmsg(response.data) ;
      sucmsg.style.display = 'block' ;
      
      setTimeout(() => {
        setmsg('');
        sucmsg.style.display = 'none' ;
      }, 3000);
      
    }
  }

 


  useEffect(() => {
   FetchContact();
		  
  }, []);

  return (
    <>
      <div className="container">
        <div
          className="alert my-4 "
          id="message"
          style={{ display: "none" }}
          role="alert"
        ></div>
        <div className="wrapper" style={wrapper}>
          <h3>Your Contact details</h3>
          <Link
            to="/contact"
            className="btn btn-primary"
            style={{float:'right'}}
          >
            Add Contact
          </Link>
        </div>

        <table className="table table-dark table-hover my-4">
          <thead>
            <tr>
              <th scope="col" className="">
                SNo.
              </th>
              <th scope="col">Name</th>
              <th scope="col">City</th>
              <th scope="col">state</th>
              <th scope="col">Email</th>
              <th scope="col">zip</th>
              <th scope="col">Address</th>
              <th scope="col">MobileNo.</th>
              <th scope="col">Delete/edit</th>
            </tr>
          </thead>
          <tbody>
		  <div id='error'  className="my-5 error" style={{position:'absolute', top:'50%', left:'15%',display:'none'}}>
			  <h4 id='error-msg' className="text-center my-3 error-msg alert alert-error bg-none">You have not add any contact details . Add contact then try again.</h4>
		  </div>
            {contact.map((element, index) => {
              return (
                <tr key={element._id}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    {element.firstname} {element.lastname}
                  </td>
                  <td>{element.city}</td>
                  <td>{element.state}</td>
                  <td>{element.email}</td>
                  <td>{element.zip}</td>
                  <td>{element.address}</td>
                  <td>{element.mobile}</td>

                  <td>
                    <i
                      className="fa fa-trash-o mx-5"
                      style={{ fontSize: "20px", color: "white" }}
                      onClick={() => {
                        const confirmdeletemsg = window.confirm(
                          `Do your want to delete ${element.firstname} contact?`
                        );
                        if (confirmdeletemsg) {
                          DeleteContact(element._id);
                          let message = document.getElementById("message");
                          message.classList.add("alert-success");
                          message.style.display = "block";
                          message.innerText =
                            "Your contact has been deleted successfully.";
                          setTimeout(() => {
                            message.style.display = "none";
                            FetchContact();
                          }, 5000);
                        }
                      }}
                    ></i>
                    <i
                      className="fa fa-edit "
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      onClick={() => {
                        setfirstname(element.firstname);
                        setlastname(element.lastname);
                        setaddress(element.address);
                        setcity(element.city);
                        setmobile(element.mobile);
                        setzip(element.zip);
                        setemail(element.email);
                        setstates(element.state);
                        setid(element._id);
                      }}
                      style={{ fontSize: "20px", color: "white" }}
                    ></i>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div
          className="modal fade "
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className=" modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">
                  Edit your Contact Details
                </h5>

                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form
                  className="row g-3"
                  onSubmit={(e) => {
                    e.preventDefault();
                    updateContact(stid,firstname,lastname,email,zip ,state,address,mobile,city) ;
                    FetchContact() ;
                  }}
                >
                <div className="alert alert-success" id="success-alert" style={{display:'none'}}>{succesmsg}</div>
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
                      onChange={(e) => setfirstname(e.target.value)}
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
                      onChange={(e) => setlastname(e.target.value)}
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
                      onChange={(e) => setemail(e.target.value)}
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
                      onChange={(e) => setaddress(e.target.value)}
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
                      onChange={(e) => setcity(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="inputState" className="form-label">
                      State
                    </label>
                    <select
                      id="inputState"
                      className="form-select"
                      value={state}
                      onChange={(e) => setstates(e.target.value)}
                    >
                      <option>Choose your state</option>
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
                  <div className="col-md-6">
                    <label htmlFor="inputZip" className="form-label">
                      Zip
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputZip"
                      placeholder="zip code"
                      value={zip}
                      onChange={(e) => setzip(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="inputZip" className="form-label">
                      Mobile
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="inputZip"
                      placeholder="Mobile no."
                      value={mobile}
                      onChange={(e) => setmobile(e.target.value)}
                    />
                  </div>

                  <div className="col-12">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      id="contactForm"
                    >
                      Edit your contact details
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
