import { React, useContext, useEffect, useState } from "react";
import NoteContext from "../../Context/NoteContext";

function NoteItem() {
  const Note = useContext(NoteContext);
  const { fetchNotes, notes, DeleteNotes } = Note;
  const [title, settitle] = useState("");
  const [Description, setDescription] = useState("");
  const [noteid, setid] = useState("");
  const [succesmsg,setmsg] = useState('') ;

  const UpdateMyNote = async (id,title,Description)=>{
	  var response =	await fetch(`/updateNotes/${id}`, {
  		method:"POST",
  		headers:{
  			"Content-Type":"application/json",
  			Authorization:"Bearer " + sessionStorage.getItem("token"),
  			
  		},
  		body: JSON.stringify({
  			title,
  			Description
  		})
  	}).then((res)=> res.json())
    .catch(err=> console.log(err)) ;

   
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
    fetchNotes();
  }, []);

  return (
    <>
        <div className="row">
          {
            
            notes.map((element)=>{
              return (
                <div
              className="card mx-4 my-3"
              key={element._id}
              style={{ width: "20rem" }}
            >
              <div className="card-body">
                <h5 className="card-title">{element.title}</h5>
                <p className="card-text">{element.Description}</p>
                <i
                  className="fa-solid fa fa-trash"
		            	style={{ fontSize: "30px"}}
                  onClick={() => {
                    var delteconfirmmsg = window.confirm(`Do you want to delete ${element.title} note?`);
                    if(delteconfirmmsg){
                      DeleteNotes(element._id);
                      let message = document.getElementById("message");
                      message.classList.add("alert-success");
                      message.style.display = "block";
                      message.innerText = "your notes has been deleted successfully.";
                      setTimeout(() => {
                        message.style.display = "none";
                        fetchNotes();
                     }, 3000);
                     }

                    
                  }}
                ></i>
                <i
                  className="fa fa-edit "
		              style={{fontSize:"30px",marginLeft:"2em"}}
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                  onClick={() => {
                    settitle(element.title);
                    setDescription(element.Description);
                    setid(element._id);
                  }}
                 
                ></i>
              </div>
            </div>
              )
            })
          }
        </div>

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
                Edit your Note
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
                  UpdateMyNote(noteid,title,Description);
                  fetchNotes() ;
                
                }}
              >
                <p id="success-alert" className="alert alert-success" style={{display:'none'}} >{succesmsg}</p>
                <div className="col-md-12">
                  <label htmlFor="inputEmail4" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputEmail4"
                    placeholder="Enter your first name"
                    value={title}
                    onChange={(e) => {
                      settitle(e.target.value);
                    }}
                  />
                </div>
                <div className="col-md-12">
                  <label htmlFor="floatingTextarea" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    placeholder="Your notes"
                    id="floatingTextarea"
                    rows="10"
                    name="Description"
                    value={Description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  ></textarea>
                </div>
                <button className="btn btn-primary" type="submit">
                  Edit Note
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NoteItem;
