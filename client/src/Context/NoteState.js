import { React, useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  // initialise all state
  const [notes, setNotes] = useState([]);
  const [contact, setContact] = useState([]);

  // fetch notes from  database
  const fetchNotes = async () => {
	  const result = await fetch("/fetchNotes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
      });

    // set the notes
    setNotes(result.data);
  };

  // Delete Notes
  const DeleteNotes = async (id) => {
	  await fetch(`/deleteNotes/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .catch((err) => {
        console.log(err);
      });
  };

  // Fetch all Contact
  const FetchContact = async () => {
	  const response = await fetch("/FetchContact", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));

    if (response.status === "error") {
      document.getElementById("error").style.display = "block";
    } else {
      setContact(response.data);
    }
  };

  // delete particular contact with their id
  const DeleteContact = async (id) => {
	  await fetch(`/DeleteContact/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
      });
    FetchContact();
  };

  return (
    // export all the context and state
    <NoteContext.Provider
      value={{
        notes,
        fetchNotes,
        DeleteNotes,
        FetchContact,
        contact,
        DeleteContact,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
