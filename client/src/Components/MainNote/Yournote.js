import React from 'react'
import NoteItem from './NoteItem'

export default function Yournote(){
  return (
    <div>
      <div className='container'>
        <h3 className='my-3 mx-2'>Your Notes </h3>
        <NoteItem />
      </div>
    </div>
  )
}
