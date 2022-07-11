import React, {useEffect, useState}  from 'react'
import { Link, useParams, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg';


const NotesDetailPage = (props) => {
    let noteID = useParams().id;
    let history = useNavigate()
    let [note, setNote] = useState(null)
    console.log(history);
    let getNote = async() => {
      if (noteID === 'new') return 
      let response = await fetch(`http://127.0.0.1:8000/notes/${noteID}`);
      let data = await response.json();
      setNote(data);
    }

    useEffect(() => {
      
      getNote()
    }, [noteID])
 

    let updateNote = async() => {
      await fetch(`http://127.0.0.1:8000/notes/${noteID}`, {
        method: 'PUT',
        headers: {
          'Content-Type':'application/json'
        },
        body:JSON.stringify({...note, 'updated':new Date()})
      })
    }

    let createNote = async() => {
      await fetch(`http://127.0.0.1:8000/notes/`, {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body:JSON.stringify({...note, 'updated':new Date()})
      })
      history('/');
    }

    let deleteNote = async() => {
      await fetch(`http://127.0.0.1:8000/notes/${noteID}`, {
          method: 'DELETE',
          headers: {
            'Content-Type':'application/json'
          },
          body:JSON.stringify({...note, 'updated':new Date()})
        })
      history('/');
    }

  let handleSubmit = () =>{

    if (noteID !== 'new' && !note.body )
    {
      deleteNote()
    }
    else if (noteID !== 'new'){
      updateNote()
    }
    else if (noteID === 'new' && !note.body){
      createNote()
    }

    history('/');
  }


  

  return (
    <div className='note'>
        <div className='note-header'>
            <h3>
                <Link to='/'>
                    <ArrowLeft onClick={handleSubmit}/>
                </Link>
            </h3>
            {
              noteID !== 'new' ? (
                <button onClick={deleteNote}>Delete</button>
              ): (
                <button onClick={createNote}>Done</button>
              )
            }
            
        </div>
        <textarea value={note?.body} onChange={(e) => {setNote({...note, "body":e.target.value})}}>

        </textarea>
    </div>
  )
}

export default NotesDetailPage