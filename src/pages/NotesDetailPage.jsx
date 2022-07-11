import React, {useEffect, useState}  from 'react'
import { Link, useParams, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg';


const NotesDetailPage = (props) => {
    let noteID = useParams().id;
    let [note, setNote] = useState(null)


    useEffect(() => {
      getNote()
    }, [noteID])
 
    let getNote = async () => {
      let response = await fetch(`http://127.0.0.1:8000/notes/${noteID}`);
      let data = await response.json();
      setNote(data);
    }

    let updateNote = async() => {
      await fetch(`http://127.0.0.1:8000/notes/${noteID}`, {
        method: 'PUT',
        headers: {
          'Content-Type':'application/json'
        },
        body:JSON.stringify({...note, 'updated':new Date()})
      })
    }

  let handleSubmit = () =>{
    updateNote()
    props.history.push("/");
  }

  return (
    <div className='note'>
        <div className='note-header'>
            <h3>
                <Link to='/'>
                    <ArrowLeft onClick={handleSubmit}/>
                </Link>
            </h3>
        </div>
        <textarea value={note?.body} onChange={(e) => {setNote({...note, "body":e.target.value})}}>

        </textarea>
    </div>
  )
}

export default NotesDetailPage