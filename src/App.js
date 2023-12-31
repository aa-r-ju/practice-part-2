import React from "react"
import Note from "./Note"
import axios from "axios"

import { useState,useEffect } from 'react'


const App = (props) => {
  const [notes, setNotes] = useState([])

  const [newNote, setNewNote] = useState('') 

  useEffect(()=>{
    let myNotesPromise =  axios.get('http://localhost:3002/notes')
    myNotesPromise.then((result)=>{
setNotes(result.data)
    }).catch(error => {
      console.log('fail')
    })
  },[])
  const addNote = (event) => {
    event.preventDefault()
   let notePromise =  axios.post('http://localhost:3002/notes',{
      content: newNote,
      important: true
    })
    notePromise.then((output)=>{
      setNotes([...notes,output.data])
      setNewNote('')
  
    })
     }

     const toggleImportanceOf = (id) => {
      const url = `http://localhost:3002/notes/${id}`
      const note = notes.find(n => n.id === id)
      const changedNote = { ...note, important: !note.important }
    
      axios.put(url, changedNote).then(response => {
        setNotes(notes.map(n => n.id !== id ? n : response.data))
      }).catch(error => {
        console.log('fail')
      }) 
     }

  const handleNoteChange = (event) => {
    console.dir(event.target,"apple")
    setNewNote(event.target.value)
  }

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => 
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type="submit">save</button>
      </form>   
    </div>
  )
}

export default App 