import { React, useState,useContext } from "react";
import NoteContext from "../../Context/NoteContext";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom" ;
import {useEffect} from "react" ;


function CreateNote(props) {
  // initialise the state
  const [title, settitle] = useState("");
  const [Description, setDescription] = useState("");
  
  const Note = useContext(NoteContext) ;
  const {fetchNotes} = Note;

  // Change state
  const titleChange = (e) => {
    settitle(e.target.value);
  };

  // Change state
  const DescriptionChange = (e) => {
    setDescription(e.target.value);
  };
    
  const navigate = useNavigate();
	const {IsLogdin} = useSelector(state => state.Logdin ) ;
 
  // check is user is logdin or not 
  useEffect(()=>{
	  if (IsLogdin != true) {
		  alert('You are not authenticated . We are redirecting you to login page.');
		  navigate('/signin');
	  }
 },[])			

    useEffect(()=>{
      fetchNotes();
    },[])

  // submit the data
  const submitForm = async (e) => {
    e.preventDefault();
	  await fetch("/User_notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: JSON.stringify({
        title,
        Description,
      }),
    }).then(async (res) => {
      const result = await res.json();

      if (res.status === 200) {
        let message = document.getElementById("message");
        message.classList.add("alert-success");
        message.innerText = result.data;
        message.style.display = "block";
        setTimeout(() => {
          message.style.display = "none";
          // clear all fields after successfuly submittion.
          Array.from(e.target).forEach((e) => (e.value = ""));
          // calling all notes 
          fetchNotes();
        }, 5000);
      } else {
        let message = document.getElementById("message");
        message.classList.add("alert-danger");
        message.style.display = "block";
        message.innerText = result.data;
        setTimeout(() => {
          message.style.display = "none";
          settitle("");
          setDescription("");
        }, 5000);
      }
    });
  };

  return (
    <div>
      <div className="container">
        <div
          className="alert my-4 "
          id="message"
          style={{ display: "none" }}
          role="alert"
        ></div>
        <h1 className="my-4 ">{props.perform} </h1>
        <form onSubmit={submitForm}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Title of your notes"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="title"
              onChange={titleChange}
            />
          </div>
          <div className="">
            <textarea
              className="form-control"
              placeholder="Your notes"
              id="floatingTextarea"
              rows="10"
              name="Description"
              onChange={DescriptionChange}
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary my-3">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateNote;
