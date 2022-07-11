import React, {useEffect, useState}  from 'react'
import ListItem from '../components/ListItem'


const NotesListPage = (props) => {

  let [notes, setNotes] = useState([])

  useEffect(() => {
    getNotes()
  }, [])

  let getNotes = async () => {
    let response  = await fetch('http://localhost:8000/notes')
    let data = await response.json()
    setNotes(data)
  }

  return (
    <div className='notes'>
      <div className='notes-header'>
          <h2 className='notes-title'> &#9782; Notes</h2>
          <p className='note-count'> {notes.length} </p>
      </div>
        <div className='notes-list'>
            {notes.map(note => (   
                <ListItem key={note.id} note={note}/>     
            ))}
        </div>
    </div>
  )
}

export default NotesListPage