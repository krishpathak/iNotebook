import React, { useContext, useEffect, useRef, useState } from 'react';
import NoteContext from './model/NoteContext';
import { useNavigate } from 'react-router-dom';

export default function Notes() {
  const navigate= useNavigate();
  const context = useContext(NoteContext);
  const { notes=[] } = context;

  const [note, setNote] = useState({ id: '', title: '', description: '', tag: '' });

  const ref = useRef(null);
  const refClose = useRef(null);
  const { deleteNotes, editNotes,getNotes } = context;

  useEffect(()=>{
    if(localStorage.getItem('token')){
      getNotes();
    }
    else{
      navigate('/login')
    }
  })
  const updatenote = (currentNote) => {
    setNote({ id: currentNote._id, title: currentNote.title, description: currentNote.description, tag: currentNote.tag });
    console.log("yeye");
    if(ref.current){
    ref.current.click();}
  };

  const handleonclick = (e) => {
    e.preventDefault();
    console.log(note)
    editNotes(note.id, note.title, note.description, note.tag);
    refClose.current.click();
  };

  const handleonchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
    console.log(note);
  };

  return (
    <>
      <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit notes</h5>
              <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title:</label>
                  <input type="text" className="form-control" id="etitle" name="title" value={note.title} onChange={handleonchange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="description" value={note.description} onChange={handleonchange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={handleonchange} />
                </div>
                <button type="submit" ref={refClose} className="btn btn-primary" onClick={handleonclick}>Update Note</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {Array.isArray(notes) && notes.length === 0 ? (
          'no notes found'
        ) : (
          Array.isArray(notes) && notes.map ((note, index) => (
            <div className="col-lg-4 my-3" key={index}>
              <div className="card" style={{ width: '18rem' }}>
                <div className="card-body">
                  <i className="fa-solid fa-trash" style={{ marginRight: '10px', marginLeft: '90%', cursor: 'pointer' }} onClick={() => deleteNotes(note._id)}></i>
                  <i className="fa-regular fa-pen-to-square" style={{ marginLeft: '90%', cursor: "pointer" }} onClick={() => updatenote(note)}></i>
                  <h5 className="card-title" style={{ marginTop: '-40px' }}>{note.title}</h5>
                  <p className="card-text">{note.description}</p>
                </div>
              </div>
            </div>
            ))
          )
        }
      </div>
    </>
  );
}
