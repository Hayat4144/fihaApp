import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect,useContext } from 'react';
import NoteContext from '../Context/NoteContext';

export default function UserHomePage() {
    
   
    const ContactDetails = useContext(NoteContext)
    const {FetchContact} = ContactDetails ;
    useEffect(()=>{
      FetchContact() ;
    },[])

    
  return (
    <>
    
      <div className='row wrapper'>
        <div className='links'>
          <li><Link to="/Contactdetails">Contact Details</Link></li>
          <li><Link to="/notesdetails">Your Notes</Link></li>
          <li>details</li>
        </div>
      </div>
    </>
  )
}
