import {React,useEffect} from 'react'
import CreateNote from './MainNote/CreateNote'
import { useNavigate } from "react-router-dom";
import NoteItem from './MainNote/NoteItem';
import {useSelector} from 'react-redux';



export default function Notes() {
    const navigate = useNavigate() ;
    const {IsLogdin}  = useSelector(state => state.Logdin) ;
	console.log(IsLogdin) ;

	useEffect(()=>{
	    if(IsLogdin != true){
		    alert('You are not authenticated. We are redirecting you to login page.') ;
		    navigate('/signin') ;
	    }
    },[])  

	
      
  return (
    <div className='container'>
        <CreateNote perform="Add Your Notes"/>
        <div className='row'>
        <NoteItem />
       
        </div>
       
    </div>
  )
}
